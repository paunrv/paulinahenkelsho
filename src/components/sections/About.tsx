"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function About() {
  const t = useT();

  return (
    <section
      id="about"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {t.about.title}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 font-display text-title-sm font-light text-ink text-balance">
              {t.about.lead}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 text-lg leading-[1.65] text-muted">
              {t.about.body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 text-lg leading-[1.65] text-ink/80">
              {t.about.closing}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12">
              <Link
                href="/cv"
                className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
              >
                <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                  {t.about.cvLink}
                </span>
                <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
