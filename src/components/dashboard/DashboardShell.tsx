"use client";

import Link from "next/link";
import { useState } from "react";
import { AnalyticsPanel } from "@/components/dashboard/AnalyticsPanel";
import { ContentEditor } from "@/components/dashboard/ContentEditor";
import { trackClick } from "@/lib/analytics";

type Tab = "analytics" | "content";

export function DashboardShell() {
  const [tab, setTab] = useState<Tab>("analytics");

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="section__eyebrow">CMS · tanpa login</p>
          <h1>Dashboard Portofolio</h1>
          <p className="dashboard__subtitle">
            Kelola konten dan lihat diagram batang klik dari Google Analytics 4.
          </p>
        </div>
        <Link
          href="/"
          className="btn btn--ghost"
          onClick={() => trackClick("dashboard_nav", "kembali_landing")}
        >
          ← Landing page
        </Link>
      </header>

      <div className="dashboard__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "analytics"}
          className={tab === "analytics" ? "is-active" : ""}
          onClick={() => {
            setTab("analytics");
            trackClick("dashboard_tab", "analytics");
          }}
        >
          Analytics
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "content"}
          className={tab === "content" ? "is-active" : ""}
          onClick={() => {
            setTab("content");
            trackClick("dashboard_tab", "content");
          }}
        >
          Konten
        </button>
      </div>

      {tab === "analytics" ? <AnalyticsPanel /> : <ContentEditor />}
    </div>
  );
}
