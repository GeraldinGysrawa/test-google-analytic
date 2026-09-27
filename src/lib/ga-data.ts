import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { AnalyticsSummary, ChartDatum } from "@/lib/types";

const EVENT_PREFIXES = [
  "nav_click__",
  "cta_click__",
  "project_click__",
  "footer_click__",
  "dashboard_tab__",
  "dashboard_nav__",
  "dashboard_test_click__",
  "dashboard_link__",
];

function getCredentials() {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    return null;
  }

  return { propertyId, clientEmail, privateKey };
}

function formatLabel(raw: string) {
  return raw.replace(/__/g, " · ");
}

function rowsToChart(
  rows:
    | Array<{
        dimensionValues?: Array<{ value?: string | null }> | null;
        metricValues?: Array<{ value?: string | null }> | null;
      }>
    | null
    | undefined,
): ChartDatum[] {
  if (!rows) return [];

  return rows
    .map((row) => {
      const key = row.dimensionValues?.[0]?.value || "unknown";
      const value = Number(row.metricValues?.[0]?.value || 0);
      return { key, label: formatLabel(key), value };
    })
    .filter(
      (item) =>
        item.value > 0 &&
        EVENT_PREFIXES.some((prefix) => item.key.startsWith(prefix)),
    )
    .sort((a, b) => b.value - a.value);
}

export async function fetchAnalyticsSummary(
  rangeDays = 7,
): Promise<AnalyticsSummary> {
  const credentials = getCredentials();

  if (!credentials) {
    return {
      configured: false,
      rangeDays,
      totalEvents: 0,
      byEvent: [],
      byLabel: [],
      error:
        "Diagram belum terhubung ke laporan GA4. Isi GA_PROPERTY_ID, GA_CLIENT_EMAIL, dan GA_PRIVATE_KEY.",
    };
  }

  try {
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.clientEmail,
        private_key: credentials.privateKey,
      },
    });

    const [response] = await client.runReport({
      property: `properties/${credentials.propertyId}`,
      dateRanges: [{ startDate: `${rangeDays}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 50,
    });

    const byLabel = rowsToChart(response.rows);
    const totalEvents = byLabel.reduce((sum, item) => sum + item.value, 0);

    // Kelompokkan per jenis event (nav_click, cta_click, ...)
    const byEventMap = new Map<string, number>();
    for (const item of byLabel) {
      const type = item.key.split("__")[0] || item.key;
      byEventMap.set(type, (byEventMap.get(type) || 0) + item.value);
    }
    const byEvent: ChartDatum[] = [...byEventMap.entries()]
      .map(([key, value]) => ({ key, label: key, value }))
      .sort((a, b) => b.value - a.value);

    return {
      configured: true,
      rangeDays,
      totalEvents,
      byEvent,
      byLabel,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal mengambil data GA4.";

    return {
      configured: true,
      rangeDays,
      totalEvents: 0,
      byEvent: [],
      byLabel: [],
      error: message,
    };
  }
}
