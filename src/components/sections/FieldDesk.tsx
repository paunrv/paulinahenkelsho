"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import {
  DESK_WORD_IDS,
  FIELD_WORD_IDS,
  useLifetime,
} from "@/components/timeline/LifetimeContext";

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

function WordList({
  words,
  ids,
  lit,
  playing,
}: {
  words: readonly string[];
  ids: readonly string[];
  lit: ReadonlySet<string>;
  playing: boolean;
}) {
  return (
    <p className="field-desk-words mt-5 text-sm leading-[1.9] md:mt-6 md:text-[15px]">
      {words.map((word, i) => {
        const id = ids[i];
        const state = playing ? (id && lit.has(id) ? "is-lit" : "is-dim") : "";
        return (
          <span key={word}>
            {i > 0 ? <span aria-hidden> · </span> : null}
            <span className={["field-desk-word", state].filter(Boolean).join(" ")}>
              {word}
            </span>
          </span>
        );
      })}
    </p>
  );
}

export function FieldDesk() {
  const t = useT();
  const copy = t.fieldDesk;
  const { fieldLit, deskLit, isPlaying } = useLifetime();

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
            <WordList
              words={copy.fieldWords}
              ids={FIELD_WORD_IDS}
              lit={fieldLit}
              playing={isPlaying}
            />
          </Reveal>
        </div>

        <div className="field-desk-desk">
          <Reveal delay={0.1}>
            <p className="field-desk-pole text-[rgb(var(--fd-desk-accent))]">
              {copy.deskLabel}
            </p>
            <WordList
              words={copy.deskWords}
              ids={DESK_WORD_IDS}
              lit={deskLit}
              playing={isPlaying}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
