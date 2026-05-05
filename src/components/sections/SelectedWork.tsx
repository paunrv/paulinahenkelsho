"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const projects = [
  {
    slug: "siveca",
    title: "SiVeCa",
    tagline: "Simulation & verification for safety-critical workflows",
    role: "Lead product design",
    year: "2024",
    highlight: true,
    summary:
      "A platform that connects domain experts, data, and review — so teams can reason about risk with traceability, not guesswork.",
  },
  {
    slug: "atlas",
    title: "Atlas Ledger",
    tagline: "Operational truth for distributed teams",
    role: "Product design",
    year: "2023",
    highlight: false,
    summary:
      "Turned fragmented status updates into a single narrative of what changed, why it mattered, and who was accountable.",
  },
  {
    slug: "field",
    title: "Field Notes",
    tagline: "Capture insight where work happens",
    role: "Design systems",
    year: "2022",
    highlight: false,
    summary:
      "Mobile-first patterns for structured observation — designed to survive bad connectivity and noisy environments.",
  },
];

export function SelectedWork() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="work"
      className="border-b border-neutral-200/90 bg-white py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            Selected work
          </p>
          <h2 className="mt-4 font-display text-display-sm font-light text-neutral-950">
            Projects where structure carries the story.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20">
          <Reveal>
            <article className="grid gap-10 border border-neutral-200 bg-neutral-50/50 p-8 md:grid-cols-12 md:gap-0 md:p-0">
              <div className="flex flex-col justify-between md:col-span-5 md:border-r md:border-neutral-200 md:p-10 lg:p-12">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl font-light tracking-tight text-neutral-950 md:text-4xl">
                      {featured.title}
                    </h3>
                    <span className="shrink-0 text-xs tabular-nums text-neutral-400">
                      {featured.year}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-neutral-700">
                    {featured.tagline}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                    {featured.summary}
                  </p>
                </div>
                <p className="mt-10 text-xs uppercase tracking-[0.16em] text-neutral-500 md:mt-14">
                  {featured.role}
                </p>
              </div>
              <motion.div
                className="relative min-h-[220px] overflow-hidden bg-neutral-900 md:col-span-7 md:min-h-[320px] lg:min-h-[380px]"
                initial={{ opacity: 0.85 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#171717_0%,#404040_45%,#0a0a0a_100%)]" />
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_55%)]" />
                <div className="relative flex h-full flex-col justify-end p-8 text-white md:p-10 lg:p-12">
                  <p className="max-w-md text-sm leading-relaxed text-white/75">
                    Editorial layout, dense tables, and progressive disclosure —
                    balanced so experts move fast and newcomers stay oriented.
                  </p>
                  <span className="mt-6 inline-flex w-fit border border-white/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90">
                    Case study — soon
                  </span>
                </div>
              </motion.div>
            </article>
          </Reveal>

          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05}>
                <article className="group flex h-full flex-col border border-neutral-200 bg-white p-8 transition-colors hover:border-neutral-300 md:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-light tracking-tight text-neutral-950">
                      {project.title}
                    </h3>
                    <span className="text-xs tabular-nums text-neutral-400">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-neutral-700">
                    {project.tagline}
                  </p>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.summary}
                  </p>
                  <p className="mt-8 text-xs uppercase tracking-[0.16em] text-neutral-500">
                    {project.role}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
