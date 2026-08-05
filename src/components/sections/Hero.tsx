"use client";

import Link from "next/link";
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
            className="text-[13px] font-medium uppercase tracking-[0.2em] text-subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            {t.hero.role}
          </motion.p>

          <motion.h1
            className="mt-8 font-display text-display font-light text-ink text-balance md:mt-10 md:text-display-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            Paulina Henkel
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl font-display text-title-sm font-light text-ink text-balance md:mt-8 md:text-title-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease }}
          >
            {t.hero.headline}
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-[1.55] text-muted md:mt-8 md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease }}
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
          >
            <a
              href="#building"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                {t.hero.ctaWork}
              </span>
              <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <Link
              href="/notes"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                {t.hero.ctaNotes}
              </span>
              <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
