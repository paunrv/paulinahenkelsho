"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getTimelineScript } from "@/lib/timeline-content";
import { getTimelineArtwork } from "./TimelineArtwork";

type TimelineTooltipProps = {
  event: TimelineEventData | null;
  x: number;
  y: number;
};

export function TimelineTooltip({ event, x, y }: TimelineTooltipProps) {
  const [active, setActive] = useState<TimelineEventData | null>(null);
  const [visible, setVisible] = useState(false);
  const origin = useRef({ x, y });

  if (event) {
    origin.current = { x, y };
  }

  useEffect(() => {
    if (!event) {
      setVisible(false);
      return;
    }

    setActive(event);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [event]);

  if (!active) return null;

  const script = getTimelineScript(active.id);
  const Artwork = getTimelineArtwork(active.id);
  if (!script || !Artwork) return null;

  const isJob = active.type === "job";
  const organization = active.organization ?? (isJob ? active.title : undefined);
  const context = active.context ?? active.subtitle;
  const role =
    active.organization && active.title !== active.organization
      ? active.title
      : undefined;

  return (
    <div
      className={visible ? "timeline-tooltip is-visible" : "timeline-tooltip"}
      style={{ left: origin.current.x, top: origin.current.y }}
      aria-hidden
    >
      <div className="timeline-tooltip-art">
        <Artwork />
      </div>
      {isJob ? (
        <div className="timeline-tooltip-meta">
          {organization ? (
            <p className="timeline-tooltip-org">{organization}</p>
          ) : null}
          {context ? (
            <p className="timeline-tooltip-context">{context}</p>
          ) : null}
          {role ? <p className="timeline-tooltip-role">{role}</p> : null}
          {active.progression ? (
            <p className="timeline-tooltip-progression">{active.progression}</p>
          ) : null}
        </div>
      ) : (
        <div className="timeline-tooltip-meta">
          <p className="timeline-tooltip-org">{active.title}</p>
          {active.subtitle ? (
            <p className="timeline-tooltip-context">{active.subtitle}</p>
          ) : null}
        </div>
      )}
      <p className="timeline-tooltip-script">{script}</p>
    </div>
  );
}
