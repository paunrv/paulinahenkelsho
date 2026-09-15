"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";

function Statement({ text, id }: { text: string; id: string }) {
  const lines = text.split(/(?<=\.)\s+/);

  return (
    <h2
      id={id}
      className="mt-8 max-w-xl font-display text-title-md font-light text-[rgb(var(--fd-ink))] text-balance md:mt-10 md:text-title-lg"
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
      className="field-desk overflow-x-clip"
    >
      <div className="field-desk-grid">
        <div className="field-desk-editorial">
          <Reveal>
            <p className="max-w-md text-sm leading-[1.6] text-[rgb(var(--fd-muted))] md:text-base">
              {copy.core}
            </p>
            <Statement id="field-desk-heading" text={copy.headline} />
            <p className="mt-8 max-w-md text-lg leading-[1.65] text-[rgb(var(--fd-muted))] md:mt-10">
              {copy.support}
            </p>
          </Reveal>
        </div>

        <div className="field-desk-field">
          <Reveal delay={0.06}>
            <p className="font-display text-title-sm font-light tracking-[-0.02em] text-[rgb(var(--fd-ink))] md:text-title-md">
              {copy.fieldLabel}
            </p>
            <WordList words={copy.fieldWords} />
          </Reveal>
        </div>

        <div className="field-desk-desk">
          <Reveal delay={0.1}>
            <p className="font-display text-title-sm font-light tracking-[-0.02em] text-[rgb(var(--fd-ink))] md:text-title-md">
              {copy.deskLabel}
            </p>
            <WordList words={copy.deskWords} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
