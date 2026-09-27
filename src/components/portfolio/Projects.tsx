"use client";

import { TrackedButton } from "@/components/analytics/Tracked";
import { useContent } from "@/components/providers/ContentProvider";

export function Projects() {
  const { content } = useContent();
  const { projects } = content;

  return (
    <section className="section projects" id="proyek">
      <div className="section__inner">
        <p className="section__eyebrow">{projects.eyebrow}</p>
        <h2 className="section__title">{projects.headline}</h2>
        <ul className="projects__list">
          {projects.items.map((project, index) => (
            <li key={project.id} className="projects__item">
              <div className="projects__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="projects__body">
                <p className="projects__role">{project.role}</p>
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>
                <ul className="projects__stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <TrackedButton
                  type="button"
                  className="projects__track"
                  eventName="project_click"
                  eventLabel={project.id}
                >
                  Catat minat proyek
                </TrackedButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
