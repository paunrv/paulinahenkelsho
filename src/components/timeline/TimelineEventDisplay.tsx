"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/i18n/i18n";
import {
  getEventPlacement,
  getTimelineDomain,
  type TimelineEventData,
} from "@/lib/timeline";
import { applyTimelineCopy, getTimelineEmoji } from "@/lib/timeline-content";

type TimelineEventDisplayProps = {
  activeEventId: string | null;
  events: readonly TimelineEventData[];
  variant?: "rail" | "stacked";
};

type Piece = {
  event: TimelineEventData;
  emoji: string;
  left: number;
};

function eventsToShow(
  activeEventId: string | null,
  events: readonly TimelineEventData[]
) {
  if (!activeEventId || activeEventId === "born") {
    const born = events.find((item) => item.id === "born");
    return born ? [born] : [];
  }

  const event = events.find((item) => item.id === activeEventId);
  return event ? [event] : [];
}

export function TimelineEventDisplay({
  activeEventId,
  events,
  variant = "rail",
}: TimelineEventDisplayProps) {
  const shown = useMemo(
    () => eventsToShow(activeEventId, events),
    [activeEventId, events]
  );
  const [phase, setPhase] = useState<"in" | "out">("in");
  const signature = shown.map((item) => item.id).join("|");
  const previousSignature = useRef(signature);

  useEffect(() => {
    if (previousSignature.current === signature) return;
    previousSignature.current = signature;
    setPhase("out");
    const frame = requestAnimationFrame(() => {
      setPhase("in");
    });
    return () => cancelAnimationFrame(frame);
  }, [signature]);

  const { lang } = useI18n();
  const domain = useMemo(() => getTimelineDomain(events), [events]);
  const pieces: Piece[] = shown.flatMap((event) => {
    const emoji = getTimelineEmoji(event.id);
    if (!emoji) return [];
    return [
      {
        event: applyTimelineCopy(event, lang),
        emoji,
        left: getEventPlacement(event, events, domain).anchor,
      },
    ];
  });

  return (
    <div
      className={
        variant === "stacked"
          ? "timeline-event-display is-stacked"
          : "timeline-event-display"
      }
      aria-live="polite"
      aria-atomic="true"
    >
      {pieces.map((piece) => (
        <PieceView
          key={piece.event.id}
          piece={piece}
          active={phase === "in"}
          variant={variant}
        />
      ))}
    </div>
  );
}

function phraseBreaks(text: string) {
  const parts = text.split(" · ");
  if (parts.length < 2) return text;
  return parts.map((part, index) => (
    <span key={`${part}-${index}`} className="timeline-event-piece-phrase">
      {part}
      {index < parts.length - 1 ? (
        <span className="timeline-event-piece-sep">{"\u00a0·\u00a0"}</span>
      ) : null}
    </span>
  ));
}

function PieceView({
  piece,
  active,
  variant,
}: {
  piece: Piece;
  active: boolean;
  variant: "rail" | "stacked";
}) {
  const { event, emoji, left } = piece;
  const hasSupport = Boolean(event.context || event.progression);
  if (variant === "stacked" && !hasSupport) return null;

  const organization =
    event.organization && event.organization !== event.title
      ? event.organization
      : undefined;
  const pieceClass = ["timeline-event-piece", active ? "is-in" : ""]
    .filter(Boolean)
    .join(" ");
  const showIdentity = variant === "rail";

  return (
    <div
      className={pieceClass}
      style={{ "--active-left": String(left) } as CSSProperties}
    >
      <div className="timeline-event-piece-emoji" aria-hidden>
        {emoji}
      </div>
      <div className="timeline-event-piece-copy">
        {showIdentity && event.year ? (
          <time className="sr-only" dateTime={event.year}>
            {event.year}
          </time>
        ) : null}
        {showIdentity ? (
          <p className="timeline-event-piece-title">{event.title}</p>
        ) : null}
        {showIdentity && organization ? (
          <p className="timeline-event-piece-role">{organization}</p>
        ) : null}
        {showIdentity && event.subtitle ? (
          <p className="timeline-event-piece-role">{event.subtitle}</p>
        ) : null}
        {event.context ? (
          <p className="timeline-event-piece-context">
            {phraseBreaks(event.context)}
          </p>
        ) : null}
        {event.progression ? (
          <p className="timeline-event-piece-progression">
            {phraseBreaks(event.progression)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
