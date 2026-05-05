"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 border border-neutral-200 bg-neutral-950 px-8 py-12 text-white md:grid-cols-12 md:gap-0 md:px-0 md:py-0">
          <Reveal className="md:col-span-5 md:border-r md:border-white/10 md:p-12 lg:p-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/50">
              Contact
            </p>
            <h2 className="mt-4 font-display text-display-sm font-light text-white">
              Let&apos;s talk about the next hard problem.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/65">
              New collaborations, advisory conversations, or deep dives on
              systems-heavy products — send a short note with context and
              timeline.
            </p>
          </Reveal>
          <div className="flex flex-col justify-center md:col-span-7 md:p-12 lg:p-14">
            <Reveal delay={0.1}>
              <motion.a
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-3 text-lg font-medium text-white md:text-xl"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <span className="border-b border-white/40 pb-0.5 transition-colors group-hover:border-white">
                  hello@example.com
                </span>
                <span
                  className="text-white/40 transition-colors group-hover:text-white"
                  aria-hidden
                >
                  →
                </span>
              </motion.a>
              <p className="mt-8 text-xs uppercase tracking-[0.16em] text-white/40">
                Based in Europe · Remote-friendly
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
