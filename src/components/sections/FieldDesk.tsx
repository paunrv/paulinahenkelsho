"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import "@/components/timeline/timeline.css";

function Statement({ text, id }: { text: string; id: string }) {
  const lines = text.split(/(?<=\.)\s+/);

  return (
    <h2
      id={id}
      className="field-desk-statement mt-8 text-[rgb(var(--fd-ink))] md:mt-10"
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

function WordList({ words }: { words: readonly string[] }) {
  return (
    <p className="mt-5 text-sm leading-[1.9] text-[rgb(var(--fd-muted))] md:mt-6 md:text-[15px]">
      {words.map((word, i) => (
        <span key={word}>
          {i > 0 ? <span aria-hidden> · </span> : null}
          {word}
        </span>
      ))}
    </p>
  );
}

export function FieldDesk() {
  const t = useT();
  const copy = t.fieldDesk;

  return (
    <section
      id="field-desk"
      aria-labelledby="field-desk-heading"
      className="field-desk"
    >
      <div className="field-desk-grid">
        <div className="field-desk-editorial">
          <Reveal className="field-desk-bridge">
            <p className="text-sm leading-[1.55] text-[rgb(var(--fd-muted))] md:text-[15px]">
              {copy.core}
            </p>
            <Statement id="field-desk-heading" text={copy.headline} />
            <p className="mt-8 text-lg leading-[1.65] text-[rgb(var(--fd-muted))] md:mt-10">
              {copy.support}
            </p>
          </Reveal>
        </div>

        <div className="field-desk-field">
          <Reveal delay={0.06}>
            <p className="field-desk-pole text-[rgb(var(--fd-field-accent))]">
              {copy.fieldLabel}
            </p>
            <WordList words={copy.fieldWords} />
          </Reveal>
        </div>

        <div className="field-desk-desk">
          <Reveal delay={0.1}>
            <p className="field-desk-pole text-[rgb(var(--fd-desk-accent))]">
              {copy.deskLabel}
            </p>
            <WordList words={copy.deskWords} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
