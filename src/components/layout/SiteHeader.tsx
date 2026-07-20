"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useT, useI18n, type Lang } from "@/i18n/i18n";
import { ThemeToggle } from "./ThemeToggle";

const LANGS: Lang[] = ["en", "es"];

export function SiteHeader() {
  const t = useT();
  const { lang, setLang, dict } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "#work", label: t.nav.work },
    { href: "#about", label: t.nav.about },
    { href: "#process", label: t.nav.process ?? "Process" },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-page/80 backdrop-blur-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-gutter md:h-16">
          <Link
            href="#hero"
            className="text-[13px] font-medium tracking-[-0.02em] text-ink md:text-sm"
          >
            Paulina Henkel
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            <nav
              className="flex gap-7 text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
              aria-label="Primary"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 border-l border-line pl-5">
              {LANGS.map((l, idx) => (
                <span key={l} className="flex items-center gap-1 text-[12px] font-medium tracking-[0.08em] text-subtle">
                  <button
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={l === lang}
                    className={`transition-colors ${l === lang ? "text-ink" : "hover:text-ink"}`}
                  >
                    {dict.language[l]}
                  </button>
                  {idx === 0 && <span className="text-line">/</span>}
                </span>
              ))}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center text-muted"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="flex w-4 flex-col gap-[5px]">
                <span
                  className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-page pt-14 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-1 flex-col justify-center gap-8 px-gutter">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-light text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line px-gutter py-6">
              <div className="flex gap-3 text-sm font-medium text-subtle">
                {LANGS.map((l, idx) => (
                  <span key={l} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLang(l)}
                      className={l === lang ? "text-ink" : ""}
                    >
                      {dict.language[l]}
                    </button>
                    {idx === 0 && <span className="text-line">/</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
