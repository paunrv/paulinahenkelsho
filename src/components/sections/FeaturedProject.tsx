"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function FeaturedProject() {
  const t = useT();

  return (
    <section
      id="siveca"
      className="relative border-t border-neutral-900/20 bg-neutral-950 py-section text-white"
      aria-labelledby="siveca-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,#fff_0%,transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
            {t.featured.eyebrow}
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {t.featured.platform}
              </p>
              <h2
                id="siveca-heading"
                className="mt-6 font-display text-display-sm font-light text-white text-balance md:text-display"
              >
                {t.featured.title1}
                <br />
                {t.featured.title2}
              </h2>
              <p className="mt-8 max-w-2xl text-lg font-light leading-[1.55] text-white/72 md:text-xl">
                {t.featured.subtitle}
              </p>
            </div>
            <div className="md:col-span-4 md:pt-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {t.featured.projectName}
              </p>
              <p className="mt-4 text-xs leading-[1.6] text-white/45">
                {t.featured.projectKicker}
              </p>
              <p className="mt-5 text-base leading-[1.65] text-white/70">
                {t.featured.projectBody}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/10 md:mt-20 md:grid-cols-3">
          <Reveal>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {t.featured.cards.problem}
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                {t.featured.problemBody}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {t.featured.cards.system}
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                {t.featured.systemBody}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {t.featured.cards.outcome}
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                {t.featured.outcomeBody}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

