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
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-20 xl:gap-x-24">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {f.eyebrow}
            </p>
            <h2 className="mt-6 font-outfit text-title-md font-bold text-ink">
              {f.title}
            </h2>
            <p className="mt-8 max-w-[22rem] text-base leading-[1.65] text-muted md:mt-10">
              {f.lede}
            </p>
          </Reveal>

          <ul className="border-t border-line lg:col-span-7 lg:mt-1">
            {f.topics.map((topic, i) => (
              <li key={topic} className="border-b border-line">
                <Reveal delay={i * 0.04}>
                  <div className="grid grid-cols-[2.35rem_minmax(0,1fr)] items-baseline gap-x-3 py-4 md:grid-cols-[2.75rem_minmax(0,1fr)] md:gap-x-5 md:py-[1.15rem]">
                    <span
                      aria-hidden
                      className="font-sans text-[11px] font-medium tabular-nums tracking-[0.08em] text-subtle"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-outfit text-[1.2rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink md:text-[1.45rem] md:leading-[1.15]">
                      {topic}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
