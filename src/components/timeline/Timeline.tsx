"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { TimelineEventData } from "@/lib/timeline";
import {
  HUMI_IDS,
  getEventPlacement,
  getEventSpan,
  getTimelineDomain,
  yearToPercent,
} from "@/lib/timeline";
import { useT } from "@/i18n/i18n";
import { TimelineEvent, TimelineRangeFill } from "./TimelineEvent";
import "./timeline.css";

type TimelineProps = {
  events: readonly TimelineEventData[];
  activeEventId: string | null;
  onActiveEventIdChange: (id: string | null) => void;
  children?: ReactNode;
};

function distanceToHit(clientX: number, node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const center = Math.abs(clientX - centerX);
  if (node.dataset.timelineHit === "span") {
    const inside = clientX >= rect.left && clientX <= rect.right;
    return {
      distance: inside
        ? 0
        : Math.min(Math.abs(clientX - rect.left), Math.abs(clientX - rect.right)),
      size: rect.width,
      center,
    };
  }

  const radius = Math.max(rect.width / 2, 14);
  return {
    distance: Math.max(0, Math.abs(clientX - centerX) - radius),
    size: rect.width,
    center,
  };
}

export function Timeline({
  events,
  activeEventId,
  onActiveEventIdChange,
  children,
}: TimelineProps) {
  const t = useT();
  const [showTapHint, setShowTapHint] = useState(true);
  const pointRefs = useRef(new Map<string, HTMLElement>());

  const domain = useMemo(() => getTimelineDomain(events), [events]);

  const registerPoint = useCallback((id: string, node: HTMLElement | null) => {
    if (node) pointRefs.current.set(id, node);
    else pointRefs.current.delete(id);
  }, []);

  const nearestEventId = useCallback(
    (clientX: number) => {
      let nextId: string | null = null;
      let nextDistance = Infinity;
      let nextCenter = Infinity;
      let nextSize = Infinity;

      for (const event of events) {
        const point = pointRefs.current.get(event.id);
        if (!point) continue;

        const { distance, size, center } = distanceToHit(clientX, point);
        if (
          distance < nextDistance ||
          (distance === nextDistance && center < nextCenter) ||
          (distance === nextDistance &&
            center === nextCenter &&
            size < nextSize)
        ) {
          nextDistance = distance;
          nextCenter = center;
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
    if (window.matchMedia("(max-width: 767px)").matches) return;
    onActiveEventIdChange(nearestEventId(event.clientX));
  };

  const onActivate = useCallback(
    (id: string) => {
      setShowTapHint(false);
      onActiveEventIdChange(id);
    },
    [onActiveEventIdChange]
  );

  const onPick = useCallback(
    (clientX: number) => {
      const id = nearestEventId(clientX);
      if (id) onActivate(id);
    },
    [nearestEventId, onActivate]
  );

  const worldSeam = yearToPercent(
    2017,
    domain.min,
    domain.weights,
    domain.total
  );

  const humiBorn = events.find((item) => item.id === "humi-first-anniversary");
  const humiNow = events.find((item) => item.id === "humi-16-years");
  const humiStartYear = getEventSpan(humiBorn?.year ?? null)?.start;
  const humiEndYear = getEventSpan(humiNow?.year ?? null)?.end;
  const humiLeft =
    humiStartYear != null
      ? yearToPercent(humiStartYear, domain.min, domain.weights, domain.total)
      : null;
  const humiRight =
    humiEndYear != null
      ? yearToPercent(humiEndYear, domain.min, domain.weights, domain.total)
      : null;
  const humiEra =
    humiLeft != null && humiRight != null
      ? { left: humiLeft, width: Math.max(0, humiRight - humiLeft) }
      : null;
  const revealingBorn = activeEventId == null || activeEventId === "born";
  const humiActive =
    activeEventId != null && HUMI_IDS.has(activeEventId);

  return (
    <div
      className={
        activeEventId && activeEventId !== "born"
          ? "timeline is-reading"
          : "timeline"
      }
      onPointerMove={onPointerMove}
    >
      <div className="timeline-scroll timeline-horizontal">
        <div className="timeline-board">
          <div className="timeline-line" aria-hidden />
          {humiEra ? (
            <div
              className={
                humiActive ? "timeline-humi-era is-active" : "timeline-humi-era"
              }
              aria-hidden
            >
              <div
                className="timeline-humi-era-bar"
                style={{
                  left: `${humiEra.left}%`,
                  width: `${humiEra.width}%`,
                }}
              >
                <TimelineRangeFill
                  left={humiEra.left}
                  width={humiEra.width}
                  worldSeam={worldSeam}
                />
              </div>
            </div>
          ) : null}
          <ol className="timeline-track">
            {events.map((item) => {
              const placement = getEventPlacement(item, events, domain);

              return (
                <TimelineEvent
                  key={item.id}
                  event={item}
                  isActive={
                    item.id === "born"
                      ? revealingBorn
                      : activeEventId === item.id
                  }
                  left={placement.left}
                  width={placement.width}
                  worldSeam={worldSeam}
                  onPointRef={registerPoint}
                  onActivate={onActivate}
                  onPick={onPick}
                />
              );
            })}
          </ol>
          <p
            className={
              showTapHint
                ? "timeline-tap-hint"
                : "timeline-tap-hint is-hidden"
            }
            aria-hidden={!showTapHint}
          >
            {t.timeline.tapHint}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
