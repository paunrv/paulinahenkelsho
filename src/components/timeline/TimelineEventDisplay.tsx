"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/i18n/i18n";
import {
  HUMI_EVENT_IDS,
  HUMI_IDS,
  getEventPlacement,
  getTimelineDomain,
  type TimelineEventData,
} from "@/lib/timeline";
import { applyTimelineCopy, getTimelineEmoji } from "@/lib/timeline-content";

type TimelineEventDisplayProps = {
  activeEventId: string | null;
  events: readonly TimelineEventData[];
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

  if (HUMI_IDS.has(activeEventId)) {
    return HUMI_EVENT_IDS.map((id) =>
      events.find((item) => item.id === id)
    ).filter((item): item is TimelineEventData => Boolean(item));
  }

  const event = events.find((item) => item.id === activeEventId);
  return event ? [event] : [];
}

export function TimelineEventDisplay({
  activeEventId,
  events,
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
      className="timeline-event-display"
      aria-live="polite"
      aria-atomic="true"
    >
      {pieces.map((piece) => (
        <PieceView
          key={piece.event.id}
          piece={piece}
          active={phase === "in"}
        />
      ))}
    </div>
  );
}

function PieceView({ piece, active }: { piece: Piece; active: boolean }) {
  const { event, emoji, left } = piece;
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
            <p className="timeline-event-piece-title">
              {event.id === "humi-16-years" ? "HUMI 16vo" : event.title}
            </p>
            {event.id !== "humi-16-years" && event.subtitle ? (
              <p className="timeline-event-piece-context">{event.subtitle}</p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
