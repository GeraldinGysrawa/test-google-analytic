"use client";

import Image from "next/image";
import { TrackedAnchor } from "@/components/analytics/Tracked";
import { useContent } from "@/components/providers/ContentProvider";

export function Hero() {
  const { content } = useContent();
  const { profile } = content;

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <Image
          src={profile.photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__veil" />
      </div>

      <div className="hero__content">
        <p className="hero__role animate-rise">{profile.role}</p>
        <h1 className="hero__name animate-rise animate-rise--delay-1">
          {profile.name}
        </h1>
        <p className="hero__tagline animate-rise animate-rise--delay-2">
          {profile.tagline}
        </p>
        <div className="hero__actions animate-rise animate-rise--delay-3">
          <TrackedAnchor
            href="#proyek"
            className="btn btn--primary"
            eventName="cta_click"
            eventLabel="lihat_proyek"
          >
            Lihat proyek
          </TrackedAnchor>
          <TrackedAnchor
            href="#tentang"
            className="btn btn--ghost"
            eventName="cta_click"
            eventLabel="kenalan"
          >
            Kenalan dulu
          </TrackedAnchor>
        </div>
      </div>
    </section>
  );
}
