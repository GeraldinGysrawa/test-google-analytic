"use client";

import { useEffect, useState } from "react";
import { TrackedButton } from "@/components/analytics/Tracked";
import {
  clearClickEvents,
  loadClickEvents,
  trackClick,
} from "@/lib/analytics";
import type { ClickEvent } from "@/lib/types";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export function AnalyticsPanel() {
  const [events, setEvents] = useState<ClickEvent[]>([]);

  useEffect(() => {
    setEvents(loadClickEvents());

    const onClick = () => setEvents(loadClickEvents());
    const onClear = () => setEvents([]);

    window.addEventListener("portfolio:click", onClick);
    window.addEventListener("portfolio:click-clear", onClear);
    return () => {
      window.removeEventListener("portfolio:click", onClick);
      window.removeEventListener("portfolio:click-clear", onClear);
    };
  }, []);

  const counts = events.reduce<Record<string, number>>((acc, event) => {
    const key = `${event.name} · ${event.label}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="cms-panel">
      <div className="cms-panel__header">
        <div>
          <h2>Analytics & Klik</h2>
          <p>
            Setiap klik penting dikirim ke Google Analytics 4 dan dicatat lokal
            agar bisa dilihat langsung di dashboard ini.
          </p>
        </div>
        <div className="cms-actions">
          <TrackedButton
            type="button"
            className="btn btn--primary"
            eventName="dashboard_test_click"
            eventLabel="uji_event"
          >
            Uji kirim event
          </TrackedButton>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              clearClickEvents();
              setEvents([]);
            }}
          >
            Bersihkan log
          </button>
        </div>
      </div>

      <div className="analytics-status">
        <div>
          <span className="analytics-status__label">GA4 Measurement ID</span>
          <strong className={GA_ID ? "ok" : "warn"}>
            {GA_ID || "Belum disetel (NEXT_PUBLIC_GA_MEASUREMENT_ID)"}
          </strong>
        </div>
        <div>
          <span className="analytics-status__label">Total klik tersimpan</span>
          <strong>{events.length}</strong>
        </div>
        <div>
          <span className="analytics-status__label">Realtime GA4</span>
          <a
            href="https://analytics.google.com/analytics/web/#/realtime"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackClick("dashboard_link", "ga4_realtime")}
          >
            Buka Google Analytics Realtime
          </a>
        </div>
      </div>

      <div className="analytics-hint">
        <h3>Cara melihat per-klik di GA4</h3>
        <ol>
          <li>Buka Reports → Realtime di Google Analytics.</li>
          <li>Klik CTA / navigasi / proyek di landing page.</li>
          <li>
            Event muncul sebagai <code>cta_click</code>, <code>nav_click</code>,{" "}
            <code>project_click</code>, dll.
          </li>
          <li>
            Di Event count, buka detail event lalu lihat parameter{" "}
            <code>event_label</code>.
          </li>
        </ol>
      </div>

      <div className="analytics-summary">
        <h3>Ringkasan label (lokal)</h3>
        {Object.keys(counts).length === 0 ? (
          <p className="cms-meta">Belum ada klik. Coba tombol uji atau buka landing page.</p>
        ) : (
          <ul>
            {Object.entries(counts).map(([key, count]) => (
              <li key={key}>
                <span>{key}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="analytics-table-wrap">
        <h3>Log klik terbaru</h3>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Event</th>
              <th>Label</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={4}>Tidak ada data.</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>
                    {new Date(event.timestamp).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <code>{event.name}</code>
                  </td>
                  <td>{event.label}</td>
                  <td>{event.path}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
