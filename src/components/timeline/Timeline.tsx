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

export function Timeline({ events }: TimelineProps) {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
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

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const nextId = nearestEventId(event.clientX);
    setActiveEventId((current) => (current === nextId ? current : nextId));
  };

  const onPointerLeave = () => {
    setActiveEventId(null);
  };

  return (
    <div
      className="timeline"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="timeline-scroll">
        <div
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
        </div>
      </div>
      <TimelineTooltip event={null} />
    </div>
  );
}
