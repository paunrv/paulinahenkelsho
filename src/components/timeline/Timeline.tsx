"use client";

import {
  useCallback,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";
import { TimelineEvent } from "./TimelineEvent";
import "./timeline.css";

type TimelineProps = {
  events: readonly TimelineEventData[];
  activeEventId: string | null;
  onActiveEventIdChange: (id: string | null) => void;
  children?: ReactNode;
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
  const radius = Math.max(rect.width / 2, 14);
  return {
    distance: Math.max(0, Math.abs(clientX - centerX) - radius),
    size: rect.width,
  };
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
  children,
}: TimelineProps) {
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

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    onActiveEventIdChange(nearestEventId(event.clientX));
  };

  const worldSeam = yearToPercent(
    2017,
    domain.min,
    domain.weights,
    domain.total
  );

  return (
    <div
      className={activeEventId ? "timeline is-reading" : "timeline"}
      onPointerMove={onPointerMove}
    >
      <div className="timeline-scroll">
        <div className="timeline-board">
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
                  worldSeam={worldSeam}
                  onPointRef={registerPoint}
                  onActivate={onActiveEventIdChange}
                />
              );
            })}
          </ol>
          {children}
        </div>
      </div>
    </div>
  );
}
