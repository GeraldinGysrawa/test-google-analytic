import defaultContent from "@/data/content.json";
import type { PortfolioContent } from "@/lib/types";

export const CONTENT_STORAGE_KEY = "portfolio-cms-content";

export function getDefaultContent(): PortfolioContent {
  return defaultContent as PortfolioContent;
}

export function loadClientContent(): PortfolioContent {
  if (typeof window === "undefined") {
    return getDefaultContent();
  }

  try {
    const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return getDefaultContent();
    return { ...getDefaultContent(), ...JSON.parse(raw) } as PortfolioContent;
  } catch {
    return getDefaultContent();
  }
}

export function saveClientContent(content: PortfolioContent) {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}

export function resetClientContent() {
  window.localStorage.removeItem(CONTENT_STORAGE_KEY);
}
