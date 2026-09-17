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
  url: string;
  urlLabel: string;
  labels: {
    problem: string;
    approach: string;
    outcome: string;
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
  url,
  urlLabel,
  labels,
}: CaseStudyProps) {
  if (!problem) {
    return (
      <div className="border-t border-line py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-outfit text-[1.75rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:text-4xl">
            {name}
          </h3>
          <p className="font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-subtle">
            {status || context}
          </p>
        </div>
      </div>
    );
  }

  const blocks: CaseSection[] = [
    { label: labels.problem, body: problem },
    { label: labels.approach, body: approach },
    { label: labels.outcome, body: outcome },
  ];

  return (
    <div className="border-t border-line pt-12 md:pt-16">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
          <div className="min-w-0">
            <h3 className="font-outfit text-[1.75rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:text-4xl lg:text-[2.75rem]">
              {name}
            </h3>
            {subtitle ? (
              <p className="mt-3 max-w-md font-sans text-sm leading-[1.55] text-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
          {(status || context) && (
            <p className="shrink-0 font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-subtle">
              {status || context}
            </p>
          )}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-x-12 md:gap-y-10">
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={i * 0.05}>
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                {block.label}
              </p>
              <p className="mt-3 max-w-prose whitespace-pre-line font-sans text-[0.9375rem] leading-[1.7] text-muted">
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
              className="font-sans text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition hover:decoration-seam focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {urlLabel}
              <span className="ml-1" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
