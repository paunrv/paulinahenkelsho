"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";
import { getTimelineEmoji, getTimelineScript } from "@/lib/timeline-content";

type TimelineEventDisplayProps = {
  event: TimelineEventData | null;
  events: readonly TimelineEventData[];
};

type Piece = {
  event: TimelineEventData;
  script: string;
  emoji: string;
  left: number;
};

function buildYearWeights(
  events: readonly TimelineEventData[],
  min: number,
  max: number
) {
  const weights: number[] = [];
  for (let year = min; year <= max; year += 1) {
    let covering = 0;
    for (const item of events) {
      const span = getEventSpan(item.year);
      if (!span) continue;
      if (year >= span.start && year <= span.end) covering += 1;
    }
    weights.push(1 + covering);
  }
  return weights;
}

function yearToPercent(
  year: number,
  min: number,
  weights: number[],
  total: number
) {
  let acc = 0;
  for (let y = min; y < year; y += 1) {
    acc += weights[y - min] ?? 1;
  }
  return (acc / total) * 100;
}

function eventLeftPercent(
  events: readonly TimelineEventData[],
  event: TimelineEventData
) {
  let min = Infinity;
  let max = -Infinity;
  for (const item of events) {
    const span = getEventSpan(item.year);
    if (!span) continue;
    min = Math.min(min, span.start);
    max = Math.max(max, span.end);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return 0;
  const weights = buildYearWeights(events, min, max);
  const total = Math.max(
    1,
    weights.reduce((sum, value) => sum + value, 0)
  );
  const span = getEventSpan(event.year);
  if (!span) return 0;
  const start = yearToPercent(span.start, min, weights, total);
  if (span.end <= span.start) return start;
  const end = yearToPercent(span.end, min, weights, total);
  return (start + end) / 2;
}

export function TimelineEventDisplay({
  event,
  events,
}: TimelineEventDisplayProps) {
  const [piece, setPiece] = useState<Piece | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("out");
  const shownId = useRef<string | null>(null);

  useEffect(() => {
    const hide = () => {
      setPhase("out");
      const timer = window.setTimeout(() => {
        shownId.current = null;
        setPiece(null);
      }, 240);
      return () => window.clearTimeout(timer);
    };

    if (!event) return hide();

    const script = getTimelineScript(event.id);
    const emoji = getTimelineEmoji(event.id);
    if (!script || !emoji) return hide();

    const next: Piece = {
      event,
      script,
      emoji,
      left: eventLeftPercent(events, event),
    };

    if (shownId.current === event.id) {
      setPiece(next);
      setPhase("in");
      return;
    }

    const reveal = () => {
      shownId.current = event.id;
      setPiece(next);
      requestAnimationFrame(() => setPhase("in"));
    };

    if (shownId.current) {
      setPhase("out");
      const swap = window.setTimeout(reveal, 180);
      return () => window.clearTimeout(swap);
    }

    reveal();
  }, [event, events]);

  return (
    <div
      className="timeline-event-display"
      aria-live="polite"
      aria-atomic="true"
    >
      {piece ? (
        <PieceView piece={piece} active={phase === "in"} />
      ) : null}
    </div>
  );
}

function PieceView({ piece, active }: { piece: Piece; active: boolean }) {
  const { event, script, emoji, left } = piece;
  const isJob = event.type === "job";
  const organization = event.organization ?? (isJob ? event.title : undefined);
  const context = event.context ?? event.subtitle;
  const role =
    event.organization && event.title !== event.organization
      ? event.title
      : undefined;

  return (
    <div
      className={
        active ? "timeline-event-piece is-in" : "timeline-event-piece"
      }
      style={{ "--active-left": String(left) } as CSSProperties}
    >
      <div className="timeline-event-piece-emoji" aria-hidden>
        {emoji}
      </div>
      <div className="timeline-event-piece-copy">
        {event.year ? (
          <time className="sr-only" dateTime={event.year}>
            {event.year}
          </time>
        ) : null}
        {isJob ? (
          <>
            {organization ? (
              <p className="timeline-event-piece-title">{organization}</p>
            ) : null}
            {context ? (
              <p className="timeline-event-piece-context">{context}</p>
            ) : null}
            {role ? <p className="timeline-event-piece-role">{role}</p> : null}
            {event.progression ? (
              <p className="timeline-event-piece-progression">
                {event.progression}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p className="timeline-event-piece-title">{event.title}</p>
            {event.subtitle ? (
              <p className="timeline-event-piece-context">{event.subtitle}</p>
            ) : null}
          </>
        )}
        <p className="timeline-event-piece-script">{script}</p>
      </div>
    </div>
  );
}
