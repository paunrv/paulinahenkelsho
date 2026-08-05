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
            <h2 className="font-display text-title-md font-light text-ink text-balance md:text-title-lg">
              {p.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 space-y-6 md:mt-14">
              {p.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-[1.65] text-muted md:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-14 text-base leading-[1.6] text-ink md:mt-16 md:text-lg">
              {p.lead}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <ul className="mt-10 space-y-3 md:mt-12">
              {p.principles.map((principle) => (
                <li
                  key={principle}
                  className="font-display text-2xl font-light text-ink md:text-3xl"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
