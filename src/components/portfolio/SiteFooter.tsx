"use client";

import { TrackedAnchor } from "@/components/analytics/Tracked";
import { useContent } from "@/components/providers/ContentProvider";

export function SiteFooter() {
  const { content } = useContent();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          © {new Date().getFullYear()} {content.profile.name}
        </p>
        <TrackedAnchor
          href="/dashboard"
          eventName="footer_click"
          eventLabel="dashboard"
        >
          Buka dashboard CMS
        </TrackedAnchor>
      </div>
    </footer>
  );
}
