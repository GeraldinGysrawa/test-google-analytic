"use client";

import { useEffect, useMemo, useState } from "react";
import { useContent } from "@/components/providers/ContentProvider";
import type { PortfolioContent, ProjectItem } from "@/lib/types";

function emptyProject(): ProjectItem {
  return {
    id: `project-${Date.now()}`,
    role: "",
    title: "",
    stack: [],
    description: "",
  };
}

export function ContentEditor() {
  const { content, updateContent, resetContent, hydrated } = useContent();
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hydrated) setDraft(content);
  }, [hydrated, content]);

  const previewName = useMemo(() => draft.profile.name || "—", [draft.profile.name]);

  function syncFromLive() {
    setDraft(content);
    setMessage("Draft disinkronkan dari konten aktif.");
  }

  function handleSave() {
    updateContent(draft);
    setSavedAt(new Date().toLocaleTimeString("id-ID"));
    setMessage("Konten tersimpan di browser (localStorage). Landing page langsung memakai data ini.");
  }

  function handleReset() {
    if (!window.confirm("Reset konten ke default dari file content.json?")) {
      return;
    }
    resetContent();
    window.location.reload();
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("JSON diekspor. Ganti file src/data/content.json lalu commit untuk production.");
  }

  function updateProject(index: number, patch: Partial<ProjectItem>) {
    setDraft((prev) => {
      const items = [...prev.projects.items];
      items[index] = { ...items[index], ...patch };
      return { ...prev, projects: { ...prev.projects, items } };
    });
  }

  return (
    <div className="cms-panel">
      <div className="cms-panel__header">
        <div>
          <h2>Konten Portofolio</h2>
          <p>
            Edit teks landing page. Perubahan tersimpan lokal di browser ini — ekspor JSON
            untuk deploy permanen.
          </p>
        </div>
        <div className="cms-actions">
          <button type="button" className="btn btn--ghost" onClick={syncFromLive}>
            Muat ulang
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleExport}>
            Ekspor JSON
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            Reset default
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>

      {message ? <p className="cms-banner">{message}</p> : null}
      {savedAt ? <p className="cms-meta">Terakhir disimpan: {savedAt} · Preview: {previewName}</p> : null}

      <fieldset className="cms-fieldset">
        <legend>Profil</legend>
        <label>
          Nama
          <input
            value={draft.profile.name}
            onChange={(e) =>
              setDraft({
                ...draft,
                profile: { ...draft.profile, name: e.target.value },
              })
            }
          />
        </label>
        <label>
          Role
          <input
            value={draft.profile.role}
            onChange={(e) =>
              setDraft({
                ...draft,
                profile: { ...draft.profile, role: e.target.value },
              })
            }
          />
        </label>
        <label>
          Tagline
          <textarea
            rows={2}
            value={draft.profile.tagline}
            onChange={(e) =>
              setDraft({
                ...draft,
                profile: { ...draft.profile, tagline: e.target.value },
              })
            }
          />
        </label>
        <div className="cms-row">
          <label>
            Usia
            <input
              type="number"
              value={draft.profile.age}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  profile: {
                    ...draft.profile,
                    age: Number(e.target.value) || 0,
                  },
                })
              }
            />
          </label>
          <label>
            Domisili
            <input
              value={draft.profile.location}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  profile: { ...draft.profile, location: e.target.value },
                })
              }
            />
          </label>
          <label>
            Kampus
            <input
              value={draft.profile.school}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  profile: { ...draft.profile, school: e.target.value },
                })
              }
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="cms-fieldset">
        <legend>Tentang Saya</legend>
        <label>
          Eyebrow
          <input
            value={draft.about.eyebrow}
            onChange={(e) =>
              setDraft({
                ...draft,
                about: { ...draft.about, eyebrow: e.target.value },
              })
            }
          />
        </label>
        <label>
          Headline
          <input
            value={draft.about.headline}
            onChange={(e) =>
              setDraft({
                ...draft,
                about: { ...draft.about, headline: e.target.value },
              })
            }
          />
        </label>
        <label>
          Paragraf 1
          <textarea
            rows={4}
            value={draft.about.paragraphs[0] || ""}
            onChange={(e) => {
              const paragraphs = [...draft.about.paragraphs];
              paragraphs[0] = e.target.value;
              setDraft({ ...draft, about: { ...draft.about, paragraphs } });
            }}
          />
        </label>
        <label>
          Paragraf 2
          <textarea
            rows={4}
            value={draft.about.paragraphs[1] || ""}
            onChange={(e) => {
              const paragraphs = [...draft.about.paragraphs];
              paragraphs[1] = e.target.value;
              setDraft({ ...draft, about: { ...draft.about, paragraphs } });
            }}
          />
        </label>
      </fieldset>

      <fieldset className="cms-fieldset">
        <legend>Proyek</legend>
        <label>
          Headline section
          <input
            value={draft.projects.headline}
            onChange={(e) =>
              setDraft({
                ...draft,
                projects: { ...draft.projects, headline: e.target.value },
              })
            }
          />
        </label>

        {draft.projects.items.map((project, index) => (
          <div key={project.id} className="cms-project">
            <div className="cms-project__head">
              <strong>Proyek {index + 1}</strong>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() =>
                  setDraft({
                    ...draft,
                    projects: {
                      ...draft.projects,
                      items: draft.projects.items.filter((_, i) => i !== index),
                    },
                  })
                }
              >
                Hapus
              </button>
            </div>
            <label>
              Role
              <input
                value={project.role}
                onChange={(e) => updateProject(index, { role: e.target.value })}
              />
            </label>
            <label>
              Judul
              <input
                value={project.title}
                onChange={(e) => updateProject(index, { title: e.target.value })}
              />
            </label>
            <label>
              Deskripsi
              <textarea
                rows={3}
                value={project.description}
                onChange={(e) =>
                  updateProject(index, { description: e.target.value })
                }
              />
            </label>
            <label>
              Stack (pisahkan koma)
              <input
                value={project.stack.join(", ")}
                onChange={(e) =>
                  updateProject(index, {
                    stack: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <label>
              ID event tracking
              <input
                value={project.id}
                onChange={(e) => updateProject(index, { id: e.target.value })}
              />
            </label>
          </div>
        ))}

        <button
          type="button"
          className="btn btn--ghost"
          onClick={() =>
            setDraft({
              ...draft,
              projects: {
                ...draft.projects,
                items: [...draft.projects.items, emptyProject()],
              },
            })
          }
        >
          Tambah proyek
        </button>
      </fieldset>
    </div>
  );
}
