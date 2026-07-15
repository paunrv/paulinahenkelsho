"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useT();

  return (
    <section id="hero" className="relative min-h-[100dvh] pt-14 md:pt-16">
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl flex-col justify-center px-gutter md:min-h-[calc(100dvh-4rem)]">
        <div className="max-w-3xl">
          <motion.p
            className="text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            {t.hero.role}
          </motion.p>

          <motion.h1
            className="mt-8 font-display text-display font-normal text-neutral-950 text-balance md:mt-10 md:text-display-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            Paulina Henkel
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-[1.55] text-neutral-500 md:mt-8 md:text-xl dark:text-neutral-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            {t.hero.headline}
          </motion.p>

          <motion.div
            className="mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 text-sm font-medium text-neutral-950 dark:text-neutral-50"
            >
              <span className="border-b border-neutral-300 pb-0.5 transition-colors group-hover:border-neutral-950 dark:border-neutral-700 dark:group-hover:border-neutral-50">
                {t.hero.cta}
              </span>
              <span className="text-neutral-400 transition-transform group-hover:translate-x-1 dark:text-neutral-600" aria-hidden>
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
