"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import type { PerspectiveMeta } from "@/lib/perspectives";

export function Perspectives({
  perspectives,
}: {
  perspectives: PerspectiveMeta[];
}) {
  const t = useT();
  const p = t.perspectives;

  return (
    <section
      id="perspectives"
      aria-label="Perspectives"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {p.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-title-sm font-light text-ink text-balance md:text-title-md">
              {p.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-[1.65] text-muted">{p.intro}</p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          {perspectives.length > 0 ? (
            <ul className="mt-12 max-w-2xl border-t border-line md:mt-14">
              {perspectives.map((perspective) => (
                <li key={perspective.slug} className="border-b border-line">
                  <Link
                    href={`/perspectives/${perspective.slug}`}
                    className="group block py-5 md:py-6"
                  >
                    <p className="mt-0 text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                      {perspective.title}
                    </p>
                    {perspective.subtitle ? (
                      <p className="mt-1 text-sm text-muted">
                        {perspective.subtitle}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 text-sm text-subtle md:mt-14">{p.status}</p>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Link
              href="/perspectives"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                {p.allPerspectives}
              </span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
