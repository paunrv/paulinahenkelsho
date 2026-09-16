"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getTimelineScript } from "@/lib/timeline-content";
import { getTimelineArtwork } from "./TimelineArtwork";

type TimelineEventDisplayProps = {
  event: TimelineEventData | null;
};

type Piece = {
  event: TimelineEventData;
  script: string;
  Artwork: () => JSX.Element;
};

export function TimelineEventDisplay({ event }: TimelineEventDisplayProps) {
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
    const Artwork = getTimelineArtwork(event.id);
    if (!script || !Artwork) return hide();

    const next: Piece = { event, script, Artwork };

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
  }, [event]);

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
  const { event, script, Artwork } = piece;
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
    >
      <div className="timeline-event-piece-art" aria-hidden>
        <Artwork />
      </div>
      <div className="timeline-event-piece-copy">
        {event.year ? (
          <p className="timeline-event-piece-year">
            <time dateTime={event.year}>{event.year}</time>
          </p>
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
