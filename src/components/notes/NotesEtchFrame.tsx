import type { ReactNode } from "react";
import { NotesIndexNav } from "@/components/notes/NotesIndexNav";
import "./notes-index-etch.css";

export function NotesEtchFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id="hero" className={`notes-index-page ${className}`.trim()}>
      <div className="notes-index-body">
        <NotesIndexNav />
        {children}
        <footer className="notes-index-bezel">
          <p className="notes-index-contact">
            <a
              href="https://www.linkedin.com/in/paulina-nrv/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a href="https://github.com/paunrv" target="_blank" rel="noopener">
              GitHub
            </a>
            <a href="mailto:phsho007@gmail.com">Email</a>
          </p>
        </footer>
        <span className="notes-index-knob notes-index-knob-l" aria-hidden />
        <span className="notes-index-knob notes-index-knob-r" aria-hidden />
      </div>
    </div>
  );
}
