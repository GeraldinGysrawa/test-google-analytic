"use client";

import { useContent } from "@/components/providers/ContentProvider";

export function About() {
  const { content } = useContent();
  const { about, profile } = content;

  return (
    <section className="section about" id="tentang">
      <div className="section__inner">
        <p className="section__eyebrow">{about.eyebrow}</p>
        <h2 className="section__title">{about.headline}</h2>
        <div className="about__grid">
          <div className="about__copy">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <aside className="about__meta" aria-label="Ringkasan profil">
            <dl>
              <div>
                <dt>Usia</dt>
                <dd>{profile.age} tahun</dd>
              </div>
              <div>
                <dt>Domisili</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Kampus</dt>
                <dd>{profile.school}</dd>
              </div>
              <div>
                <dt>Fokus</dt>
                <dd>Pengembangan web</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
