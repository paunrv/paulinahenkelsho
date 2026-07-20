"use client";

import { Reveal } from "@/components/motion/Reveal";

type CaseStudyProps = {
  name: string;
  subtitle?: string;
  status?: string;
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  lessons: string;
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
  url,
  urlLabel,
  labels,
}: CaseStudyProps) {
  const isPlaceholder = !problem;

  if (isPlaceholder) {
    return (
      <div className="border-t border-neutral-200/60 py-12 dark:border-neutral-800/60">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-2xl font-normal text-neutral-950 md:text-3xl dark:text-neutral-50">
            {name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-300 dark:text-neutral-700">
            {status || context}
          </p>
        </div>
      </div>
    );
  }

  const blocks = [
    { label: labels.problem, body: problem },
    { label: labels.approach, body: approach },
    { label: labels.outcome, body: outcome },
    { label: labels.lessons, body: lessons },
  ];

  return (
    <div className="border-t border-neutral-200/60 pt-12 dark:border-neutral-800/60 md:pt-16">
      <Reveal>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-normal text-neutral-950 md:text-3xl dark:text-neutral-50">
              {name}
            </h3>
            {subtitle ? (
              <p className="mt-2 text-sm leading-[1.5] text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </p>
            ) : null}
          </div>
          {(status || context) && (
            <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
              {status || context}
            </p>
          )}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={i * 0.05}>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
                {block.label}
              </p>
              <p className="mt-3 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400">
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
              className="text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-950 dark:text-neutral-50 dark:decoration-neutral-700 dark:hover:decoration-neutral-50"
            >
              {urlLabel}
              <span className="ml-1 text-neutral-400 dark:text-neutral-600" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
