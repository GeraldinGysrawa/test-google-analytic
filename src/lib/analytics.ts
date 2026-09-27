import { sendGAEvent } from "@next/third-parties/google";
import type { ClickEvent } from "@/lib/types";

export const CLICK_EVENTS_STORAGE_KEY = "portfolio-click-events";
export const MAX_STORED_CLICKS = 100;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackClick(name: string, label: string) {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  sendGAEvent("event", name, {
    event_category: "engagement",
    event_label: label,
    page_path: path,
  });

  if (typeof window !== "undefined") {
    const entry: ClickEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      label,
      path,
      timestamp: new Date().toISOString(),
    };

    try {
      const raw = window.localStorage.getItem(CLICK_EVENTS_STORAGE_KEY);
      const existing: ClickEvent[] = raw ? JSON.parse(raw) : [];
      const next = [entry, ...existing].slice(0, MAX_STORED_CLICKS);
      window.localStorage.setItem(CLICK_EVENTS_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("portfolio:click", { detail: entry }));
    } catch {
      // ignore storage errors
    }
  }
}

export function loadClickEvents(): ClickEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CLICK_EVENTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClickEvent[]) : [];
  } catch {
    return [];
  }
}

export function clearClickEvents() {
  window.localStorage.removeItem(CLICK_EVENTS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("portfolio:click-clear"));
}

export function isGaConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}
