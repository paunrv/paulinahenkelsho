"use client";

import {
  useCallback,
  useRef,
  useState,
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

function distanceToHit(clientX: number, node: HTMLElement): number {
  const rect = node.getBoundingClientRect();
  if (node.dataset.timelineHit === "span") {
    if (clientX >= rect.left && clientX <= rect.right) return 0;
    return Math.min(
      Math.abs(clientX - rect.left),
      Math.abs(clientX - rect.right)
    );
  }

  const centerX = rect.left + rect.width / 2;
  return Math.abs(clientX - centerX);
}

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

        const distance = distanceToHit(clientX, point);
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
      y: pointRect.top - boardRect.top + pointRect.height / 2,
    };
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const nextId = nearestEventId(event.clientX);
    const nextOrigin = measureOrigin(nextId);

    setActiveEventId((current) => (current === nextId ? current : nextId));
    setTooltipOrigin((current) => {
      if (!nextOrigin) return current;
      if (current && current.x === nextOrigin.x && current.y === nextOrigin.y) {
        return current;
      }
      return nextOrigin;
    });
  };

  const onPointerLeave = () => {
    setActiveEventId(null);
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
        <div ref={boardRef} className="timeline-board">
          <div className="timeline-line" aria-hidden />
          <ol className="timeline-track">
            {events.map((item, index) => (
              <TimelineEvent
                key={item.id}
                event={item}
                isActive={activeEventId === item.id}
                isFirst={index === 0}
                isLast={index === events.length - 1}
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
