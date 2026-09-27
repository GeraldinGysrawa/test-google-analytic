import { sendGAEvent } from "@next/third-parties/google";

/** Kirim event klik ke GA4. Nama digabung biar muncul jelas di diagram batang. */
export function trackClick(name: string, label: string) {
  const eventName = `${name}__${label}`.replace(/[^a-zA-Z0-9_]/g, "_");

  sendGAEvent("event", eventName, {
    event_category: "engagement",
    event_label: label,
    click_type: name,
  });
}

export function isGaConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}
