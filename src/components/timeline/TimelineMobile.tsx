"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { useI18n, useT } from "@/i18n/i18n";
import { getEventSpan, type TimelineEventData } from "@/lib/timeline";
import { applyTimelineCopy } from "@/lib/timeline-content";
import { TimelineEventDisplay } from "./TimelineEventDisplay";

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

function markerTone(event: TimelineEventData) {
  const field = Boolean(event.field?.length);
  const desk = Boolean(event.desk?.length);
  const management = Boolean(event.management?.length);
  if (management && !field && !desk) return "management";
  if (field && desk) return "blend";
  if (field) return "field";
  if (desk) return "desk";
  return "life";
}

export function TimelineMobile({
  events,
  activeEventId,
  onSelect,
}: TimelineMobileProps) {
  const t = useT();
  const { lang } = useI18n();
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shouldScroll = useRef(false);

  const currentId =
    activeEventId && events.some((event) => event.id === activeEventId)
      ? activeEventId
      : "born";
  const index = Math.max(
    0,
    events.findIndex((event) => event.id === currentId)
  );
  const current = events[index];

  useEffect(() => {
    if (!shouldScroll.current) return;
    shouldScroll.current = false;
    const node = itemRefs.current.get(currentId);
    if (!node) return;
    const header = document.querySelector("header");
    const nav = node
      .closest(".timeline-mobile")
      ?.querySelector(".timeline-mobile-nav");
    const offset =
      (header?.getBoundingClientRect().height ?? 0) +
      (nav?.getBoundingClientRect().height ?? 0) +
      12;
    const top = node.getBoundingClientRect().top;
    if (top >= offset && top < window.innerHeight * 0.45) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.scrollTo({
      top: Math.max(0, top + window.scrollY - offset),
      behavior,
    });
  }, [currentId]);

  function select(nextIndex: number, moveFocus = false) {
    const next = events[nextIndex];
    if (!next || nextIndex === index) return;
    shouldScroll.current = true;
    onSelect(next.id);
    if (moveFocus) buttonRefs.current[nextIndex]?.focus();
  }

  function onRowKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    rowIndex: number
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(rowIndex + 1, true);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(rowIndex - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(events.length - 1, true);
    }
  }

  return (
    <div className="timeline-mobile">
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
        <p className="timeline-mobile-now">
          <span className="timeline-mobile-year">{current?.year}</span>
          <span className="timeline-mobile-count">
            <span className="sr-only">
              {t.timeline.milestone} {index + 1} {t.timeline.of} {events.length}
            </span>
            <span aria-hidden>
              {index + 1} / {events.length}
            </span>
          </span>
        </p>
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

      <ol className="timeline-mobile-list" aria-label={t.timeline.chronology}>
        {events.map((event, rowIndex) => {
          const copy = applyTimelineCopy(event, lang);
          const label = listLabel(copy);
          const hasDetail = Boolean(copy.context || copy.progression);
          const isCurrent = event.id === currentId;
          const span = getEventSpan(event.year);
          const isRange = Boolean(span && span.end > span.start);
          const tone = markerTone(event);

          return (
            <li
              key={event.id}
              ref={(node) => {
                if (node) itemRefs.current.set(event.id, node);
                else itemRefs.current.delete(event.id);
              }}
              className={
                isCurrent
                  ? "timeline-mobile-item is-current"
                  : "timeline-mobile-item"
              }
            >
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[rowIndex] = node;
                }}
                className="timeline-mobile-row"
                aria-current={isCurrent ? "true" : undefined}
                aria-expanded={hasDetail ? isCurrent : undefined}
                onClick={() => select(rowIndex)}
                onKeyDown={(domEvent) => onRowKeyDown(domEvent, rowIndex)}
              >
                <span className="timeline-mobile-row-year">{event.year}</span>
                <span
                  className={[
                    "timeline-mobile-marker",
                    `is-${tone}`,
                    isRange ? "is-span" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden
                />
                <span className="timeline-mobile-label">{label}</span>
              </button>
              {isCurrent && hasDetail ? (
                <div className="timeline-mobile-detail">
                  <TimelineEventDisplay
                    activeEventId={currentId}
                    events={events}
                    variant="stacked"
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
