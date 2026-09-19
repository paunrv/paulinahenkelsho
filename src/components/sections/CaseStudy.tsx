"use client";

import { Reveal } from "@/components/motion/Reveal";

type CaseSection = {
  label: string;
  body: string;
};

export type CaseAccent = "seam" | "electric" | "lime";

type CaseStudyProps = {
  name: string;
  emoji?: string;
  accent?: CaseAccent;
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

const ACCENT: Record<
  CaseAccent,
  { rule: string; text: string; underline: string }
> = {
  seam: {
    rule: "border-t-[3px] border-[rgb(var(--ph-seam))]",
    text: "text-[rgb(var(--ph-seam))]",
    underline: "decoration-[rgb(var(--ph-seam))]",
  },
  electric: {
    rule: "border-t-[3px] border-[rgb(var(--ph-electric))]",
    text: "text-[rgb(var(--ph-desk))] dark:text-[rgb(var(--ph-electric))]",
    underline: "decoration-[rgb(var(--ph-desk))] dark:decoration-[rgb(var(--ph-electric))]",
  },
  lime: {
    rule: "border-t-[3px] border-[rgb(var(--ph-lime))]",
    text: "text-[rgb(var(--ph-field))] dark:text-[rgb(var(--ph-lime))]",
    underline: "decoration-[rgb(var(--ph-field))] dark:decoration-[rgb(var(--ph-lime))]",
  },
};

export function CaseStudy({
  name,
  emoji = "",
  accent = "seam",
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
  const tone = ACCENT[accent];

  if (!problem) {
    return (
      <div className={`${tone.rule} py-8 md:py-10`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3
            className={`flex items-baseline gap-3 font-outfit text-[1.75rem] font-extrabold leading-[0.95] tracking-[-0.04em] md:text-4xl ${tone.text}`}
          >
            {emoji ? (
              <span className="text-[1.65rem] leading-none md:text-[2.15rem]" aria-hidden>
                {emoji}
              </span>
            ) : null}
            <span>{name}</span>
          </h3>
          <p
            className={`font-sans text-[11px] font-normal uppercase tracking-[0.16em] ${tone.text}`}
          >
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
    <div className={`${tone.rule} pt-8 pb-3 md:pt-12 md:pb-4`}>
      <Reveal>
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
          <div className="min-w-0">
            <h3
              className={`flex items-baseline gap-3 font-outfit text-[1.75rem] font-extrabold leading-[0.95] tracking-[-0.04em] md:text-4xl lg:text-[2.75rem] ${tone.text}`}
            >
              {emoji ? (
                <span
                  className="text-[1.75rem] leading-none md:text-[2.35rem] lg:text-[2.6rem]"
                  aria-hidden
                >
                  {emoji}
                </span>
              ) : null}
              <span>{name}</span>
            </h3>
            {subtitle ? (
              <p className="mt-1.5 max-w-md font-sans text-sm leading-[1.55] text-muted md:mt-2">
                {subtitle}
              </p>
            ) : null}
          </div>
          {(status || context) && (
            <p
              className={`shrink-0 font-sans text-[11px] font-normal uppercase tracking-[0.16em] ${tone.text}`}
            >
              {status || context}
            </p>
          )}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:mt-11 md:grid-cols-3 md:gap-x-12 md:gap-y-8">
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={i * 0.05}>
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                {block.label}
              </p>
              <p className="mt-2.5 max-w-prose whitespace-pre-line font-sans text-[0.9375rem] leading-[1.7] text-muted">
                {block.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {url && (
        <Reveal delay={0.25}>
          <div className="mt-7 md:mt-8">
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className={`inline-flex items-center gap-2 font-sans text-sm font-medium underline underline-offset-4 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${tone.text} ${tone.underline}`}
            >
              {urlLabel}
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
