"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useT } from "@/i18n/i18n";

export function SiteHeader() {
  const t = useT();
  const nav = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#approach", label: t.nav.approach },
    { href: "#experience", label: t.nav.experience },
    { href: "#humi", label: t.nav.humi },
    { href: "#contact", label: t.nav.contact },
    { href: "/cv", label: t.nav.cv },
  ];

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/90 bg-white/90 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-gutter md:h-16">
        <Link
          href="#hero"
          className="text-[13px] font-medium tracking-[-0.02em] text-neutral-950 md:text-sm"
        >
          Paulina Henkelsho
        </Link>
        <nav
          className="flex gap-5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 md:gap-7 md:text-[12px]"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
