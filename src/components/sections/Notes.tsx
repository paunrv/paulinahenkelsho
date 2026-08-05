"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import { formatCategoryLabel } from "@/lib/note-categories";
import type { NoteMeta } from "@/lib/notes";

export function Notes({ notes }: { notes: NoteMeta[] }) {
  const t = useT();
  const n = t.notes;

  return (
    <section
      id="notes"
      aria-label="Notes"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {n.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-title-sm font-light text-ink text-balance md:text-title-md">
              {n.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-[1.65] text-muted">
              {n.intro}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          {notes.length > 0 ? (
            <ul className="mt-12 max-w-2xl border-t border-line md:mt-14">
              {notes.map((note) => (
                <li key={note.slug} className="border-b border-line">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group block py-5 md:py-6"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                      {formatCategoryLabel(note.category)}
                    </p>
                    <p className="mt-3 text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                      {note.title}
                    </p>
                    {note.subtitle ? (
                      <p className="mt-1 text-sm text-muted">{note.subtitle}</p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 text-sm text-subtle md:mt-14">{n.status}</p>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                {n.allNotes}
              </span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
