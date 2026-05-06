"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

export function Contact() {
  const t = useT();

  return (
    <section
      id="contact"
      className="border-t border-neutral-900/20 bg-neutral-950 py-section text-white"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-title-md font-light text-white text-balance md:text-title-lg">
              {t.contact.title}
            </h2>
          </Reveal>
          <div className="md:col-span-5">
            <Reveal delay={0.08} className="flex flex-col md:items-end md:text-right">
              <p className="max-w-md text-sm leading-[1.65] text-white/55 md:max-w-sm">
                {t.contact.body}
              </p>
              <motion.a
                href="mailto:hello@helpmepau.com"
                className="mt-8 inline-flex items-center gap-2 text-base font-medium text-white md:mt-10"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                <span className="border-b border-white/35 pb-0.5 transition-colors hover:border-white">
                  hello@helpmepau.com
                </span>
                <span className="text-white/35" aria-hidden>
                  →
                </span>
              </motion.a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
