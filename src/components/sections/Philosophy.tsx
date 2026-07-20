"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function Philosophy() {
  const t = useT();
  const p = t.philosophy;

  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-display text-title-md font-light text-ink text-balance md:text-title-lg">
              {p.statement}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-2 md:mt-14">
              {p.lines.map((line, i) => (
                <p
                  key={i}
                  className="text-lg text-subtle md:text-xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 space-y-3 md:mt-20">
              <p className="text-base leading-[1.6] text-muted md:text-lg">
                {p.closing1}
              </p>
              <p className="text-base font-medium leading-[1.6] text-ink md:text-lg">
                {p.closing2}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
