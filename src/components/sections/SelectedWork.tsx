"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { useT } from "@/i18n/i18n";

export function SelectedWork() {
  const t = useT();
  const w = t.selectedWork;

  return (
    <section id="work" className="border-t border-line py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {w.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-title-md font-light text-ink">
            {w.title}
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {w.cases.map((c) => (
            <CaseStudy
              key={c.name}
              name={c.name}
              subtitle={c.subtitle}
              status={c.status}
              context={c.context}
              problem={c.problem}
              approach={c.approach}
              outcome={c.outcome}
              lessons={c.lessons}
              sections={c.sections}
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
