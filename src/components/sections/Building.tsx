"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  CaseStudy,
  type CaseAccent,
} from "@/components/sections/CaseStudy";
import { useT } from "@/i18n/i18n";

function caseVisual(name: string): { emoji: string; accent: CaseAccent } {
  if (name.startsWith("HUMI")) return { emoji: "⛩️", accent: "seam" };
  if (name === "Proof") return { emoji: "🍷", accent: "electric" };
  return { emoji: "🌬️", accent: "lime" };
}

export function Building() {
  const t = useT();
  const w = t.building;

  return (
    <section id="building" className="border-t border-line py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {w.eyebrow}
          </p>
          <h2 className="mt-6 max-w-3xl font-outfit text-title-md font-bold tracking-[-0.035em] text-ink">
            {w.title}
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {w.cases.map((c) => {
            const visual = caseVisual(c.name);
            return (
              <CaseStudy
                key={c.name}
                name={c.name}
                emoji={visual.emoji}
                accent={visual.accent}
                subtitle={c.subtitle}
                status={c.status}
                context={c.context}
                problem={c.problem}
                approach={c.approach}
                outcome={c.outcome}
                url={c.url}
                urlLabel={c.urlLabel}
                labels={w.labels}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
