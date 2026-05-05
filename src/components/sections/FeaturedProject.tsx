"use client";

import { Reveal } from "@/components/motion/Reveal";

export function FeaturedProject() {
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
            Featured project
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Environmental Intelligence Platform
              </p>
              <h2
                id="siveca-heading"
                className="mt-6 font-display text-display-sm font-light text-white text-balance md:text-display"
              >
                We don’t measure particles.
                <br />
                We translate invisible systems.
              </h2>
              <p className="mt-8 max-w-2xl text-lg font-light leading-[1.55] text-white/72 md:text-xl">
                From fragmented environmental data to decision-ready systems.
              </p>
            </div>
            <div className="md:col-span-4 md:pt-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                SiVeCa
              </p>
              <p className="mt-4 text-xs leading-[1.6] text-white/45">
                Built and tested in real-world environments.
              </p>
              <p className="mt-5 text-base leading-[1.65] text-white/70">
                A system for making irreversible decisions — where confidence
                comes from structure, not intuition.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/10 md:mt-20 md:grid-cols-3">
          <Reveal>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Problem
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                Environmental programs generate constant signals, but decisions
                lag behind. Data arrives without meaning, context lives in too
                many places, and accountability breaks when conditions shift.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                System
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                SiVeCa connects sensors, environmental variables, regulatory
                frameworks, and user decisions — turning raw readings into an
                interpretable chain from signal → implication → response.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-neutral-950 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Outcome
              </p>
              <p className="mt-6 text-sm leading-[1.65] text-white/70">
                A shift from monitoring to intelligence: clearer thresholds,
                faster alignment, and decisions that hold up under scrutiny —
                because the structure is explicit.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

