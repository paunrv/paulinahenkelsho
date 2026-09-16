"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import {
  DESK_DISCIPLINES,
  FIELD_DISCIPLINES,
  type DeskDiscipline,
  type FieldDiscipline,
} from "@/lib/timeline";
import "@/components/timeline/timeline.css";

function Statement({ text, id }: { text: string; id: string }) {
  const lines = text.split(/(?<=\.)\s+/);

  return (
    <h2
      id={id}
      className="field-desk-statement mt-4 text-[rgb(var(--fd-ink))] md:mt-5"
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
  keys,
  active,
  engaged,
}: {
  words: readonly string[];
  keys: readonly string[];
  active?: readonly string[];
  engaged: boolean;
}) {
  return (
    <p className="field-desk-words">
      {words.map((word, i) => {
        const key = keys[i];
        const state = !engaged
          ? "is-rest"
          : key && active?.includes(key)
            ? "is-active"
            : "is-idle";

        return (
          <span key={word}>
            {i > 0 ? (
              <span className="field-desk-word-sep" aria-hidden>
                {" · "}
              </span>
            ) : null}
            <span className={`field-desk-word ${state}`}>{word}</span>
          </span>
        );
      })}
    </p>
  );
}

type FieldDeskProps = {
  activeField?: readonly FieldDiscipline[];
  activeDesk?: readonly DeskDiscipline[];
  engaged?: boolean;
};

export function FieldDesk({
  activeField,
  activeDesk,
  engaged = false,
}: FieldDeskProps) {
  const t = useT();
  const copy = t.fieldDesk;

  return (
    <section
      id="field-desk"
      aria-labelledby="field-desk-heading"
      className="field-desk"
    >
      <div className="field-desk-grid">
        <div className="field-desk-field">
          <Reveal delay={0.06}>
            <p className="field-desk-pole text-[rgb(var(--fd-field-accent))]">
              {copy.fieldLabel}
            </p>
            <WordList
              words={copy.fieldWords}
              keys={FIELD_DISCIPLINES}
              active={activeField}
              engaged={engaged}
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
              keys={DESK_DISCIPLINES}
              active={activeDesk}
              engaged={engaged}
            />
          </Reveal>
        </div>

        <div className="field-desk-editorial">
          <Reveal className="field-desk-bridge">
            <p className="text-sm leading-[1.55] text-[rgb(var(--fd-muted))] md:text-[15px]">
              {copy.core}
            </p>
            <Statement id="field-desk-heading" text={copy.headline} />
            <p className="mt-4 text-base leading-[1.55] text-[rgb(var(--fd-muted))] md:mt-5">
              {copy.support}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
