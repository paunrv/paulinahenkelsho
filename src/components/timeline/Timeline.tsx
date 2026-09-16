"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineTooltip } from "./TimelineTooltip";
import "./timeline.css";

type TimelineProps = {
  events: readonly TimelineEventData[];
};

type TooltipOrigin = {
  x: number;
  y: number;
};

export function Timeline({ events }: TimelineProps) {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [tooltipOrigin, setTooltipOrigin] = useState<TooltipOrigin | null>(
    null
  );
  const boardRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef(new Map<string, HTMLElement>());

  const registerPoint = useCallback((id: string, node: HTMLElement | null) => {
    if (node) pointRefs.current.set(id, node);
    else pointRefs.current.delete(id);
  }, []);

  const nearestEventId = useCallback(
    (clientX: number) => {
      let nextId: string | null = null;
      let nextDistance = Infinity;

      for (const event of events) {
        const point = pointRefs.current.get(event.id);
        if (!point) continue;

        const rect = point.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(clientX - centerX);

        if (distance < nextDistance) {
          nextDistance = distance;
          nextId = event.id;
        }
      }

      return nextId;
    },
    [events]
  );

  const measureOrigin = useCallback((id: string | null) => {
    if (!id) return null;

    const board = boardRef.current;
    const point = pointRefs.current.get(id);
    if (!board || !point) return null;

    const boardRect = board.getBoundingClientRect();
    const pointRect = point.getBoundingClientRect();

    return {
      x: pointRect.left - boardRect.left + pointRect.width / 2,
      y: pointRect.top - boardRect.top,
    };
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const nextId = nearestEventId(event.clientX);
    const nextOrigin = measureOrigin(nextId);

    setActiveEventId((current) => (current === nextId ? current : nextId));
    setTooltipOrigin((current) => {
      if (!nextOrigin) return null;
      if (current && current.x === nextOrigin.x && current.y === nextOrigin.y) {
        return current;
      }
      return nextOrigin;
    });
  };

  const onPointerLeave = () => {
    setActiveEventId(null);
    setTooltipOrigin(null);
  };

  const activeEvent =
    events.find((item) => item.id === activeEventId) ?? null;

  return (
    <div
      className="timeline"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="timeline-scroll">
        <div
          ref={boardRef}
          className="timeline-board"
          style={{ "--timeline-count": events.length } as CSSProperties}
        >
          <div className="timeline-line" aria-hidden />
          <ol className="timeline-track">
            {events.map((item) => (
              <TimelineEvent
                key={item.id}
                event={item}
                isActive={activeEventId === item.id}
                onPointRef={registerPoint}
              />
            ))}
          </ol>
          <TimelineTooltip
            event={activeEvent}
            x={tooltipOrigin?.x ?? 0}
            y={tooltipOrigin?.y ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
