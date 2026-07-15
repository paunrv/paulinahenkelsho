"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { useT } from "@/i18n/i18n";

export function SelectedWork() {
  const t = useT();
  const w = t.selectedWork;

  return (
    <section id="work" className="border-t border-neutral-200/60 py-section dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            {w.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-title-md font-normal text-neutral-950 dark:text-neutral-50">
            {w.title}
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {w.cases.map((c) => (
            <CaseStudy
              key={c.name}
              name={c.name}
              context={c.context}
              problem={c.problem}
              approach={c.approach}
              outcome={c.outcome}
              lessons={c.lessons}
              url={c.url}
              urlLabel={c.urlLabel}
              labels={w.labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
