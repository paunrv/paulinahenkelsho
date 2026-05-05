"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] border-b border-neutral-200/90 pt-24 md:pt-28"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-7rem)] max-w-6xl flex-col justify-end px-gutter pb-section md:min-h-[calc(100dvh-8rem)]">
        <div className="max-w-4xl">
          <motion.p
            className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Product design
          </motion.p>
          <motion.h1
            className="font-display text-display-lg font-light text-neutral-950"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Designing clarity in complex systems.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-base text-neutral-600 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            Interfaces, services, and narratives that make dense domains legible —
            without flattening what makes them important.
          </motion.p>
        </div>
        <motion.div
          className="mt-16 flex items-center gap-3 text-xs text-neutral-400 md:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <span className="h-px w-12 bg-neutral-300" aria-hidden />
          <span className="uppercase tracking-[0.18em]">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
