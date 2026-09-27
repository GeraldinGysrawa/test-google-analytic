import { NextResponse } from "next/server";
import { fetchAnalyticsSummary } from "@/lib/ga-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Number(searchParams.get("days") || 7);
  const rangeDays = Number.isFinite(days) ? Math.min(Math.max(days, 1), 90) : 7;

  const summary = await fetchAnalyticsSummary(rangeDays);
  return NextResponse.json(summary);
}
