"use client";

import { Reveal } from "@/components/motion/Reveal";

type CaseSection = {
  label: string;
  body: string;
};

type CaseStudyProps = {
  name: string;
  subtitle?: string;
  status?: string;
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  lessons: string;
  sections?: readonly CaseSection[];
  url: string;
  urlLabel: string;
  labels: {
    problem: string;
    approach: string;
    outcome: string;
    lessons: string;
  };
};

export function CaseStudy({
  name,
  subtitle = "",
  status = "",
  context,
  problem,
  approach,
  outcome,
  lessons,
  sections = [],
  url,
  urlLabel,
  labels,
}: CaseStudyProps) {
  const isRich = sections.length > 0;
  const isPlaceholder = !isRich && !problem;

  if (isPlaceholder) {
    return (
      <div className="border-t border-line py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-2xl font-light text-ink md:text-3xl">
            {name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-subtle">
            {status || context}
          </p>
        </div>
      </div>
    );
  }

  const blocks: CaseSection[] = isRich
    ? [...sections]
    : [
        { label: labels.problem, body: problem },
        { label: labels.approach, body: approach },
        { label: labels.outcome, body: outcome },
        { label: labels.lessons, body: lessons },
      ];

  return (
    <div className="border-t border-line pt-12 md:pt-16">
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-light text-ink md:text-3xl">
              {name}
            </h3>
            {subtitle ? (
              <p className="mt-2 text-sm leading-[1.5] text-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
          {(status || context) && (
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-lavender/40 bg-lavender-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-lavender">
              {status || context}
            </span>
          )}
        </div>
      </Reveal>

      <div
        className={
          isRich
            ? "mt-10 space-y-8 md:mt-14 md:space-y-10"
            : "mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-10"
        }
      >
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={i * 0.05}>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                {block.label}
              </p>
              <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-[1.75] text-muted">
                {block.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {url && (
        <Reveal delay={0.25}>
          <div className="mt-8 md:mt-10">
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
            >
              {urlLabel}
              <span className="ml-1 text-lavender" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
