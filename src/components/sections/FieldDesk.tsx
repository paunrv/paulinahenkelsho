"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/i18n";
import { TimelineMobile } from "@/components/timeline/TimelineMobile";
import {
  DESK_WORD_IDS,
  FIELD_WORD_IDS,
  MANAGEMENT_WORD_IDS,
  useLifetime,
} from "@/components/timeline/LifetimeContext";
import { getTimelineEvents } from "@/lib/timeline";

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

function Editorial({ headingId }: { headingId?: string }) {
  const copy = useT().fieldDesk;

  return (
    <div className="field-desk-editorial">
      <Reveal className="field-desk-bridge">
        <p className="text-sm leading-[1.55] text-[rgb(var(--fd-muted))] md:text-[15px]">
          {copy.core}
        </p>
        <Statement
          id={headingId ?? "field-desk-heading-mobile"}
          text={copy.headline}
        />
        <p className="mt-6 text-lg leading-[1.65] text-[rgb(var(--fd-muted))] md:mt-10">
          {copy.support}
        </p>
      </Reveal>
    </div>
  );
}

function ManagementPanel() {
  const copy = useT().fieldDesk;
  const { managementLit, isPlaying } = useLifetime();

  return (
    <div className="field-desk-management">
      <Reveal delay={0.04}>
        <p className="field-desk-pole text-[rgb(var(--fd-management-accent))]">
          {copy.managementLabel}
        </p>
        <WordList
          words={copy.managementWords}
          ids={MANAGEMENT_WORD_IDS}
          lit={managementLit}
          playing={isPlaying}
        />
      </Reveal>
    </div>
  );
}

function FieldPanel() {
  const copy = useT().fieldDesk;
  const { fieldLit, isPlaying } = useLifetime();

  return (
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
  );
}

function DeskPanel() {
  const copy = useT().fieldDesk;
  const { deskLit, isPlaying } = useLifetime();

  return (
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
  );
}

export function FieldDesk() {
  const heading = useT().fieldDesk.headline;
  const { activeEventId, setActiveEventId } = useLifetime();
  const events = getTimelineEvents();

  return (
    <section
      id="field-desk"
      aria-label={heading}
      className="field-desk"
    >
      <div className="field-desk-mobile">
        <Editorial />
        <div className="field-desk-mobile-browse">
          <TimelineMobile
            events={events}
            activeEventId={activeEventId}
            onSelect={setActiveEventId}
          />
          <ManagementPanel />
          <DeskPanel />
          <FieldPanel />
        </div>
      </div>

      <div className="field-desk-desktop">
        <Editorial headingId="field-desk-heading" />
        <div className="field-desk-stage">
          <ManagementPanel />
          <FieldPanel />
          <DeskPanel />
        </div>
      </div>
    </section>
  );
}
