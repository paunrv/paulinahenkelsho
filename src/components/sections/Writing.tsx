"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function Writing() {
  const t = useT();
  const w = t.writing;

  return (
    <section
      id="writing"
      aria-label="Writing"
      className="border-t border-neutral-200/60 py-section dark:border-neutral-800/60"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
              {w.eyebrow}
            </p>
            <p className="mt-8 font-display text-title-sm font-normal text-neutral-950 text-balance dark:text-neutral-50">
              {w.title}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-neutral-400 dark:text-neutral-600">
              {w.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
