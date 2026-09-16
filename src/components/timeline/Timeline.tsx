"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineTooltip } from "./TimelineTooltip";
import "./timeline.css";

type TimelineProps = {
  events: readonly TimelineEventData[];
  activeEventId: string | null;
  onActiveEventIdChange: (id: string | null) => void;
};

type TooltipOrigin = {
  x: number;
  y: number;
};

function distanceToHit(clientX: number, node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  if (node.dataset.timelineHit === "span") {
    if (clientX >= rect.left && clientX <= rect.right) {
      return { distance: 0, size: rect.width };
    }
    return {
      distance: Math.min(
        Math.abs(clientX - rect.left),
        Math.abs(clientX - rect.right)
      ),
      size: rect.width,
    };
  }

  const centerX = rect.left + rect.width / 2;
  return { distance: Math.abs(clientX - centerX), size: rect.width };
}

function buildYearWeights(
  events: readonly TimelineEventData[],
  min: number,
  max: number
) {
  const weights: number[] = [];
  for (let year = min; year <= max; year += 1) {
    let covering = 0;
    for (const event of events) {
      const span = getEventSpan(event.year);
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

export function Timeline({
  events,
  activeEventId,
  onActiveEventIdChange,
}: TimelineProps) {
  const [tooltipOrigin, setTooltipOrigin] = useState<TooltipOrigin | null>(
    null
  );
  const boardRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef(new Map<string, HTMLElement>());

  const domain = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const event of events) {
      const span = getEventSpan(event.year);
      if (!span) continue;
      min = Math.min(min, span.start);
      max = Math.max(max, span.end);
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return { min: 0, weights: [1], total: 1 };
    }
    const weights = buildYearWeights(events, min, max);
    const total = weights.reduce((sum, value) => sum + value, 0);
    return { min, weights, total: Math.max(1, total) };
  }, [events]);

  const registerPoint = useCallback((id: string, node: HTMLElement | null) => {
    if (node) pointRefs.current.set(id, node);
    else pointRefs.current.delete(id);
  }, []);

  const nearestEventId = useCallback(
    (clientX: number) => {
      let nextId: string | null = null;
      let nextDistance = Infinity;
      let nextSize = Infinity;

      for (const event of events) {
        const point = pointRefs.current.get(event.id);
        if (!point) continue;

        const { distance, size } = distanceToHit(clientX, point);
        if (
          distance < nextDistance ||
          (distance === nextDistance && size < nextSize)
        ) {
          nextDistance = distance;
          nextSize = size;
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

    onActiveEventIdChange(nextId);
    setTooltipOrigin((current) => {
      if (!nextOrigin) return current;
      if (current && current.x === nextOrigin.x && current.y === nextOrigin.y) {
        return current;
      }
      return nextOrigin;
    });
  };

  const activeEvent =
    events.find((item) => item.id === activeEventId) ?? null;

  return (
    <div className="timeline" onPointerMove={onPointerMove}>
      <div className="timeline-scroll">
        <div ref={boardRef} className="timeline-board">
          <div className="timeline-line" aria-hidden />
          <ol className="timeline-track">
            {events.map((item) => {
              const span = getEventSpan(item.year);
              const start = span?.start ?? domain.min;
              const end = span?.end ?? start;
              const left = yearToPercent(
                start,
                domain.min,
                domain.weights,
                domain.total
              );
              const right = yearToPercent(
                end,
                domain.min,
                domain.weights,
                domain.total
              );

              return (
                <TimelineEvent
                  key={item.id}
                  event={item}
                  isActive={activeEventId === item.id}
                  left={left}
                  width={Math.max(0, right - left)}
                  onPointRef={registerPoint}
                />
              );
            })}
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
