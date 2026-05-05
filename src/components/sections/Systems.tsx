"use client";

import { Reveal } from "@/components/motion/Reveal";

const systems = [
  "Behavioral data systems (wellness)",
  "Trust-driven platforms (real estate)",
  "Experience-driven products (wine)",
];

export function Systems() {
  return (
    <section
      id="systems"
      className="border-t border-neutral-200/80 bg-white py-section"
      aria-labelledby="systems-heading"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <Reveal className="md:col-span-5">
            <h2
              id="systems-heading"
              className="font-display text-title-md font-light text-neutral-950 text-balance"
            >
              Systems I work on
            </h2>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              <p className="max-w-2xl text-base leading-[1.65] text-neutral-600">
                I work across systems where clarity is critical:
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4 border-t border-neutral-200 pt-8 md:mt-12 md:pt-10">
              {systems.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.04}>
                  <li className="text-sm leading-[1.65] text-neutral-800">
                    <span className="mr-3 inline-block text-neutral-400" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

