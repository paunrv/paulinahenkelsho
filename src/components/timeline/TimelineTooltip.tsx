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

function naturalize(value: string): string {
  return value
    .split(/(→)/)
    .map((chunk) => {
      if (chunk === "→") return chunk;
      let firstWord = true;
      return chunk.replace(/[^\s+&]+|[+&]|\s+/g, (token) => {
        if (/^\s+$/.test(token) || token === "+" || token === "&") return token;
        if (/^[A-Z0-9]{2,}\+?$/.test(token)) {
          firstWord = false;
          return token;
        }
        const lower = token.toLocaleLowerCase("es");
        const next = firstWord
          ? lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1)
          : lower;
        firstWord = false;
        return next;
      });
    })
    .join("");
}

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
            <p className="timeline-tooltip-org">{naturalize(organization)}</p>
          ) : null}
          {context ? (
            <p className="timeline-tooltip-context">{naturalize(context)}</p>
          ) : null}
          {role ? (
            <p className="timeline-tooltip-role">{naturalize(role)}</p>
          ) : null}
          {active.progression ? (
            <p className="timeline-tooltip-progression">
              {naturalize(active.progression)}
            </p>
          ) : null}
        </div>
      ) : null}
      <p className="timeline-tooltip-script">{script}</p>
    </div>
  );
}
