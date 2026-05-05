"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/80 bg-neutral-50/80 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-gutter md:h-16">
        <Link
          href="#hero"
          className="font-display text-sm font-medium tracking-tight text-neutral-950 md:text-base"
        >
          Studio
        </Link>
        <nav className="flex gap-6 text-xs font-medium tracking-wide text-neutral-600 md:gap-8 md:text-[13px]">
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
