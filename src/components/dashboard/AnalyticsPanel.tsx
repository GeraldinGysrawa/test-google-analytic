"use client";

import { useCallback, useEffect, useState } from "react";
import { BarChart } from "@/components/dashboard/BarChart";
import { trackClick } from "@/lib/analytics";
import type { AnalyticsSummary } from "@/lib/types";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

const EMPTY: AnalyticsSummary = {
  configured: false,
  rangeDays: 7,
  totalEvents: 0,
  byEvent: [],
  byLabel: [],
};

export function AnalyticsPanel() {
  const [summary, setSummary] = useState<AnalyticsSummary>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  const load = useCallback(async (rangeDays: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${rangeDays}`, {
        cache: "no-store",
      });
      const data = (await res.json()) as AnalyticsSummary;
      setSummary(data);
    } catch {
      setSummary({
        ...EMPTY,
        rangeDays,
        error: "Gagal memuat data analytics.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // bersihkan sisa log lokal lama biar tidak membingungkan
    try {
      window.localStorage.removeItem("portfolio-click-events");
    } catch {
      // ignore
    }
    void load(days);
  }, [days, load]);

  return (
    <div className="cms-panel">
      <div className="cms-panel__header">
        <div>
          <h2>Analytics</h2>
          <p>
            Diagram batang dari Google Analytics 4 — klik per jenis event dan
            per target.
          </p>
        </div>
        <div className="cms-actions">
          <select
            className="analytics-range"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            aria-label="Rentang hari"
          >
            <option value={1}>1 hari</option>
            <option value={7}>7 hari</option>
            <option value={28}>28 hari</option>
          </select>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              trackClick("dashboard_nav", "refresh_analytics");
              void load(days);
            }}
          >
            Refresh
          </button>
          <a
            className="btn btn--primary"
            href="https://analytics.google.com/analytics/web/#/realtime"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackClick("dashboard_link", "ga4_realtime")}
          >
            Buka GA4
          </a>
        </div>
      </div>

      <div className="analytics-status analytics-status--two">
        <div>
          <span className="analytics-status__label">Measurement ID</span>
          <strong className={GA_ID ? "ok" : "warn"}>
            {GA_ID || "Belum disetel"}
          </strong>
        </div>
        <div>
          <span className="analytics-status__label">
            Total klik ({summary.rangeDays} hari)
          </span>
          <strong>{loading ? "…" : summary.totalEvents}</strong>
        </div>
      </div>

      {summary.error ? (
        <div className="cms-banner cms-banner--warn">
          <p>{summary.error}</p>
          {!summary.configured ? (
            <ol>
              <li>
                GA4 → Admin → Property settings → salin <strong>Property ID</strong>{" "}
                (angka).
              </li>
              <li>
                Google Cloud → buat Service Account → aktifkan{" "}
                <em>Google Analytics Data API</em> → unduh JSON key.
              </li>
              <li>Tambahkan email service account sebagai Viewer di property GA4.</li>
              <li>
                Set env <code>GA_PROPERTY_ID</code>, <code>GA_CLIENT_EMAIL</code>,{" "}
                <code>GA_PRIVATE_KEY</code> (lokal + Vercel) lalu redeploy.
              </li>
            </ol>
          ) : null}
        </div>
      ) : null}

      <div className="analytics-charts">
        <BarChart
          title="Per jenis event"
          data={summary.byEvent}
          emptyText={
            loading
              ? "Memuat…"
              : "Belum ada data. Klik tombol di landing page, tunggu beberapa menit, lalu refresh."
          }
        />
        <BarChart
          title="Per target klik"
          data={summary.byLabel}
          emptyText={
            loading
              ? "Memuat…"
              : "Belum ada data per target klik di rentang ini."
          }
        />
      </div>
    </div>
  );
}
