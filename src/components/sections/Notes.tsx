"use client";

import Link from "next/link";
import { useT } from "@/i18n/i18n";
import "./notes-etch.css";

const FOOTER_LINKS = [
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
] as const;

export function Notes() {
  const t = useT();
  const n = t.notes;

  return (
    <section id="notes" aria-label="Notes" className="notes-etch-section">
      <div className="notes-etch">
        <div className="notes-etch-body">
          <div className="notes-etch-screen">
            <h2 className="notes-etch-word">{n.word}</h2>

            <div className="notes-etch-layout">
              <div className="notes-etch-copy">
                <p className="notes-etch-lead">{n.lead}</p>
                <p className="notes-etch-intro">{n.intro}</p>
              </div>

              <div className="notes-etch-draw" aria-hidden="true">
                <span className="notes-etch-draw-h" />
                <span className="notes-etch-draw-v" />
              </div>

              <Link
                href="/notes"
                className="notes-etch-cta"
              >
                {n.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <span className="notes-etch-knob notes-etch-knob-l" aria-hidden />
          <span className="notes-etch-knob notes-etch-knob-r" aria-hidden />
        </div>

        <footer id="contact" className="notes-end-footer">
          <p className="notes-end-footer-name">Paulina Henkel</p>
          <p className="notes-end-footer-links">
            {FOOTER_LINKS.map((link) => {
              const isMail = link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener"}
                >
                  {link.label}
                  <span aria-hidden>{isMail ? "→" : "↗"}</span>
                </a>
              );
            })}
          </p>
          <p className="notes-end-footer-meta">
            <span>© {new Date().getFullYear()} Paulina Henkel</span>
            <span>{t.footer.location}</span>
          </p>
        </footer>
      </div>
    </section>
  );
}
