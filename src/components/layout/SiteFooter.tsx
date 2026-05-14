"use client";

import { useT } from "@/i18n/i18n";

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-gutter text-xs text-neutral-500 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
        <p className="text-neutral-600">
          © {new Date().getFullYear()} Paulina Henkelsho
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {t.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 transition hover:text-neutral-950"
            >
              {link.label}
              <span className="ml-0.5 text-neutral-400" aria-hidden>
                ↗
              </span>
            </a>
          ))}
        </div>
        <p className="text-neutral-400 md:text-right">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
