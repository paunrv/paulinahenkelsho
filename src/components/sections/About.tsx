"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function About() {
  const t = useT();

  return (
    <section
      id="about"
      className="border-t border-neutral-200/60 py-section dark:border-neutral-800/60"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
              {t.about.title}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 font-display text-title-sm font-normal text-neutral-950 text-balance dark:text-neutral-50">
              {t.about.lead}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 text-lg leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {t.about.body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 text-lg leading-[1.65] text-neutral-700 dark:text-neutral-300">
              {t.about.closing}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12">
              <Link
                href="/cv"
                className="group inline-flex items-center gap-3 text-sm font-medium text-neutral-950 dark:text-neutral-50"
              >
                <span className="border-b border-neutral-300 pb-0.5 transition-colors group-hover:border-neutral-950 dark:border-neutral-700 dark:group-hover:border-neutral-50">
                  {t.about.cvLink}
                </span>
                <span className="text-neutral-400 transition-transform group-hover:translate-x-1 dark:text-neutral-600" aria-hidden>
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
