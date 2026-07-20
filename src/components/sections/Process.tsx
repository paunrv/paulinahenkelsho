"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function Process() {
  const t = useT();
  const p = t.process;

  return (
    <section
      id="process"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {p.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-title-md font-light text-ink">
            {p.title}
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20">
          {p.steps.map((step, i) => (
            <Reveal key={step.name} delay={i * 0.04}>
              <div className="flex gap-6 border-t border-line py-7 md:gap-10 md:py-9">
                <span className="w-8 shrink-0 text-sm tabular-nums text-lavender">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                  <h3 className="w-36 shrink-0 font-display text-xl font-light text-ink md:text-2xl">
                    {step.name}
                  </h3>
                  <p className="text-sm leading-[1.65] text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
