"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function About() {
  const t = useT();

  return (
    <section
      id="about"
      className="border-t border-neutral-200/80 bg-white py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <Reveal className="md:col-span-5">
            <h2 className="font-display text-title-md font-light text-neutral-950 text-balance">
              {t.about.title}
            </h2>
            <p className="mt-8 text-base leading-[1.65] text-neutral-600">
              {t.about.body}
            </p>
          </Reveal>
          <div className="md:col-span-7">
            <div className="grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-3 md:gap-6 md:pt-10 lg:gap-8">
              {t.about.pillars.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="flex flex-col border-neutral-200 md:border-0 md:pr-4">
                    <h3 className="font-display text-lg font-light text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.65] text-neutral-600">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
