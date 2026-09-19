"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT, useI18n, type Lang } from "@/i18n/i18n";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const LANGS: Lang[] = ["en", "es"];

export function NotesIndexNav() {
  const t = useT();
  const pathname = usePathname();
  const { lang, setLang, dict } = useI18n();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/notes", label: t.nav.notes },
    { href: "/#philosophy", label: t.nav.about },
    { href: "/cv", label: t.nav.cv },
  ];

  return (
    <div className="notes-index-nav">
      <Link href="/" className="notes-index-brand">
        Paulina Henkel
      </Link>

      <nav className="notes-index-links" aria-label="Primary">
        {nav.map((item) => {
          const current =
            item.href === "/notes"
              ? pathname === "/notes" || pathname.startsWith("/notes/")
              : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={current ? "is-current" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="notes-index-tools">
        {LANGS.map((l, idx) => (
          <span key={l} className="notes-index-lang">
            {idx > 0 ? <span aria-hidden> / </span> : null}
            <button
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={l === lang}
              className={l === lang ? "is-current" : undefined}
            >
              {dict.language[l]}
            </button>
          </span>
        ))}
        <span className="notes-index-theme">
          <ThemeToggle />
        </span>
      </div>

      <button
        type="button"
        className="notes-index-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      {open ? (
        <div className="notes-index-drawer">
          {nav.map((item) => {
            const current =
              item.href === "/notes"
                ? pathname === "/notes" || pathname.startsWith("/notes/")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
