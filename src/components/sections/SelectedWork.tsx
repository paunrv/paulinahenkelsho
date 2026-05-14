"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function SelectedWork() {
  const t = useT();
  const w = t.selectedWork;
  const s = w.siveca;

  return (
    <section id="work" aria-labelledby="work-section-heading">
      <div className="border-t border-neutral-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-gutter">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              {w.sectionEyebrow}
            </p>
            <h2
              id="work-section-heading"
              className="mt-6 max-w-3xl font-display text-title-md font-light text-neutral-950 text-balance"
            >
              {w.sectionTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.65] text-neutral-600">
              {w.sectionIntro}
            </p>
          </Reveal>
        </div>
      </div>

      <div
        id="siveca"
        className="relative border-t border-neutral-900/20 bg-neutral-950 py-section text-white"
        aria-labelledby="siveca-heading"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,#fff_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-gutter">
          <Reveal>
            <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.platform}
                </p>
                <h3
                  id="siveca-heading"
                  className="mt-6 font-display text-display-sm font-light text-white text-balance md:text-display"
                >
                  {s.title1}
                  <br />
                  {s.title2}
                </h3>
                <p className="mt-8 max-w-2xl text-lg font-light leading-[1.55] text-white/72 md:text-xl">
                  {s.subtitle}
                </p>
              </div>
              <div className="md:col-span-4 md:pt-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.projectName}
                </p>
                <p className="mt-4 text-xs leading-[1.6] text-white/45">
                  {s.projectKicker}
                </p>
                <p className="mt-5 text-base leading-[1.65] text-white/70">
                  {s.projectBody}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px bg-white/10 md:mt-20 md:grid-cols-3">
            <Reveal>
              <div className="bg-neutral-950 p-8 md:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.cards.problem}
                </p>
                <p className="mt-6 text-sm leading-[1.65] text-white/70">
                  {s.problemBody}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="bg-neutral-950 p-8 md:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.cards.system}
                </p>
                <p className="mt-6 text-sm leading-[1.65] text-white/70">
                  {s.systemBody}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-neutral-950 p-8 md:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.cards.outcome}
                </p>
                <p className="mt-6 text-sm leading-[1.65] text-white/70">
                  {s.outcomeBody}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 md:mt-14">
            <a
              href={s.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 transition hover:text-white/90"
            >
              {s.siteLabel}
              <span className="ml-1 text-white/35" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200/80 bg-white py-section">
        <div className="mx-auto max-w-6xl px-gutter">
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {w.engagements.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="flex flex-col border-t border-neutral-200 pt-8 md:border-0 md:pt-0">
                  <h3 className="font-display text-xl font-light text-neutral-950">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                    {g.meta}
                  </p>
                  <p className="mt-5 text-sm leading-[1.65] text-neutral-600">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
