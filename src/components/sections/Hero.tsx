"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/i18n/i18n";

export function Hero() {
  const t = useT();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] bg-white pt-24 md:pt-28"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-6xl flex-col justify-end px-gutter pb-16 md:min-h-[calc(100dvh-7rem)] md:pb-24">
        <div className="max-w-4xl">
          <motion.h1
            className="font-display text-display-lg font-light text-neutral-950 text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="mt-8 max-w-lg text-base leading-[1.65] text-neutral-600 md:mt-10 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.p
            className="mt-10 max-w-2xl font-display text-2xl font-light leading-[1.2] tracking-[-0.02em] text-neutral-900 md:mt-12 md:text-3xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.statement1}
            <br />
            {t.hero.statement2}
          </motion.p>
        </div>
        <motion.div
          className="mt-20 flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 md:mt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          <span className="h-px w-10 bg-neutral-300" aria-hidden />
          <span>{t.hero.scroll}</span>
          <span className="opacity-60" aria-hidden>
            —
          </span>
          <Link
            href="/cv"
            className="rounded-md border border-neutral-200/70 bg-white/80 px-3 py-1 text-[11px] text-neutral-950 backdrop-blur transition hover:bg-white"
          >
            {t.hero.cta.cv}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
