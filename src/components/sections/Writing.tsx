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
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {w.eyebrow}
            </p>
            <p className="mt-8 font-display text-title-sm font-light text-ink text-balance">
              {w.title}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-subtle">
              {w.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
