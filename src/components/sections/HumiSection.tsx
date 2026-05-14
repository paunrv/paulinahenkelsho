"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function HumiSection() {
  const t = useT();
  const h = t.humi;

  return (
    <section
      id="humi"
      className="border-t border-neutral-200/80 bg-neutral-50 py-section"
      aria-labelledby="humi-heading"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <Reveal className="md:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              {h.eyebrow}
            </p>
            <h2
              id="humi-heading"
              className="mt-6 font-display text-title-md font-light text-neutral-950 text-balance"
            >
              {h.title}
            </h2>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500">
              {h.scale}
            </p>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              <p className="text-base font-medium leading-[1.65] text-neutral-800">
                {h.lead}
              </p>
            </Reveal>
            {h.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.04}>
                <p className="mt-6 text-base leading-[1.65] text-neutral-600">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-3 border-t border-neutral-200/90 pt-8">
                {h.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-[1.65] text-neutral-700"
                  >
                    <span className="mr-3 text-neutral-400" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-10 text-sm leading-[1.65] text-neutral-500">
                {h.eventsNote}
              </p>
              <a
                href={h.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-950"
              >
                {h.siteLabel}
                <span className="ml-1 text-neutral-400" aria-hidden>
                  ↗
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
