"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function Notes() {
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

          <Reveal delay={0.14}>
            <ul className="mt-12 space-y-0 border-t border-line md:mt-14">
              {n.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-5 text-base text-ink md:py-6 md:text-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-subtle">{n.status}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
