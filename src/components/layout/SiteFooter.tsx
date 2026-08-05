"use client";

import { useT } from "@/i18n/i18n";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paulina-nrv/",
  },
  {
    label: "GitHub",
    href: "https://github.com/paunrv",
  },
  {
    label: "Email",
    href: "mailto:phsho007@gmail.com",
  },
];

export function SiteFooter() {
  const t = useT();
  const f = t.footer;

  return (
    <footer id="contact" className="border-t border-line py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <p className="max-w-xl font-display text-title-sm font-light text-ink text-balance">
          {f.prompt}
        </p>
        <p className="mt-6 text-lg text-muted">{f.cta}</p>

        <div className="mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener"}
              className="group inline-flex items-center gap-2 text-base font-medium text-ink"
            >
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
                {link.label}
              </span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                {link.href.startsWith("mailto") ? "→" : "↗"}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-line pt-8 text-xs text-subtle">
          <p>
            © {new Date().getFullYear()} Paulina Henkel
          </p>
          <p>{f.location}</p>
        </div>
      </div>
    </footer>
  );
}
