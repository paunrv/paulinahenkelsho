"use client";

import type { KeyboardEvent } from "react";
import { useI18n, useT } from "@/i18n/i18n";
import type { TimelineEventData } from "@/lib/timeline";
import { applyTimelineCopy } from "@/lib/timeline-content";

type TimelineMobileProps = {
  events: readonly TimelineEventData[];
  activeEventId: string | null;
  onSelect: (id: string) => void;
};

function listLabel(event: TimelineEventData) {
  if (event.organization && event.organization !== event.title) {
    return `${event.title} — ${event.organization}`;
  }
  if (event.subtitle) return `${event.title} — ${event.subtitle}`;
  return event.title;
}

export function TimelineMobile({
  events,
  activeEventId,
  onSelect,
}: TimelineMobileProps) {
  const t = useT();
  const { lang } = useI18n();

  const currentId =
    activeEventId && events.some((event) => event.id === activeEventId)
      ? activeEventId
      : "born";
  const index = Math.max(
    0,
    events.findIndex((event) => event.id === currentId)
  );
  const current = events[index];
  const copy = current ? applyTimelineCopy(current, lang) : null;
  const label = copy ? listLabel(copy) : "";

  function select(nextIndex: number) {
    const next = events[nextIndex];
    if (!next || nextIndex === index) return;
    onSelect(next.id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(events.length - 1);
    }
  }

  return (
    <div
      className="timeline-mobile"
      role="group"
      aria-label={t.timeline.chronology}
      onKeyDown={onKeyDown}
    >
      <div className="timeline-mobile-nav">
        <button
          type="button"
          className="timeline-mobile-step"
          onClick={() => select(index - 1)}
          disabled={index <= 0}
          aria-label={t.timeline.previous}
        >
          <span aria-hidden>←</span>
          <span>{t.timeline.previousShort}</span>
        </button>
        <div className="timeline-mobile-now" aria-live="polite">
          <p className="timeline-mobile-year">{current?.year}</p>
          <p className="timeline-mobile-label">{label}</p>
          <p className="timeline-mobile-count">
            <span className="sr-only">
              {t.timeline.milestone} {index + 1} {t.timeline.of} {events.length}
            </span>
            <span aria-hidden>
              {index + 1} / {events.length}
            </span>
          </p>
        </div>
        <button
          type="button"
          className="timeline-mobile-step is-next"
          onClick={() => select(index + 1)}
          disabled={index >= events.length - 1}
          aria-label={t.timeline.next}
        >
          <span>{t.timeline.nextShort}</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
