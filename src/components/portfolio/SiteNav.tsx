"use client";

import { TrackedAnchor } from "@/components/analytics/Tracked";
import { useContent } from "@/components/providers/ContentProvider";

export function SiteNav() {
  const { content } = useContent();

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <TrackedAnchor
          href="#top"
          className="site-nav__brand"
          eventName="nav_click"
          eventLabel="brand_logo"
        >
          {content.profile.name.split(" ")[0]}
        </TrackedAnchor>
        <nav className="site-nav__links" aria-label="Navigasi utama">
          <TrackedAnchor
            href="#tentang"
            eventName="nav_click"
            eventLabel="tentang"
          >
            Tentang
          </TrackedAnchor>
          <TrackedAnchor
            href="#proyek"
            eventName="nav_click"
            eventLabel="proyek"
          >
            Proyek
          </TrackedAnchor>
          <TrackedAnchor
            href="/dashboard"
            eventName="nav_click"
            eventLabel="dashboard"
            className="site-nav__dashboard"
          >
            Dashboard
          </TrackedAnchor>
        </nav>
      </div>
    </header>
  );
}
