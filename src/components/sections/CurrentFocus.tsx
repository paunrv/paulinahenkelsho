"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function CurrentFocus() {
  const t = useT();
  const f = t.focus;

  return (
    <section
      id="focus"
      aria-label="Current focus"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {f.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-title-md font-light text-ink">
            {f.title}
          </h2>
        </Reveal>

        <div className="mt-14 max-w-2xl md:mt-16">
          {f.topics.map((topic, i) => (
            <Reveal key={topic} delay={i * 0.04}>
              <p className="border-t border-line py-6 font-display text-xl font-light text-ink md:py-7 md:text-2xl">
                {topic}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
