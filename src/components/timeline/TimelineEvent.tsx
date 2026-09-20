import type { CSSProperties } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
  isActive?: boolean;
  left: number;
  width: number;
  worldSeam?: number;
  onPointRef?: (id: string, node: HTMLElement | null) => void;
  onActivate?: (id: string) => void;
};

function rangeWorlds(left: number, width: number, worldSeam: number) {
  const span = Math.max(width, 0.0001);
  const start = left;
  const end = left + width;
  const field = Math.max(0, Math.min(end, worldSeam) - start);
  const deskStart = Math.max(start, worldSeam);
  const desk = Math.max(0, end - deskStart);

  return {
    fieldWidth: (field / span) * 100,
    deskLeft: ((deskStart - start) / span) * 100,
    deskWidth: (desk / span) * 100,
    seamLeft: ((worldSeam - start) / span) * 100,
    crosses: start < worldSeam && end > worldSeam,
  };
}

export function TimelineRangeFill({
  left,
  width,
  worldSeam,
}: {
  left: number;
  width: number;
  worldSeam: number;
}) {
  const worlds = rangeWorlds(left, width, worldSeam);

  return (
    <span className="timeline-event-range-fill">
      {worlds.fieldWidth > 0 ? (
        <span
          className="timeline-event-range-seg is-field"
          style={{ width: `${worlds.fieldWidth}%` }}
        />
      ) : null}
      {worlds.crosses ? (
        <span
          className="timeline-event-range-seg is-seam"
          style={{ left: `${worlds.seamLeft}%` }}
        />
      ) : null}
      {worlds.deskWidth > 0 ? (
        <span
          className="timeline-event-range-seg is-desk"
          style={{
            left: `${worlds.deskLeft}%`,
            width: `${worlds.deskWidth}%`,
          }}
        />
      ) : null}
    </span>
  );
}

export function TimelineEvent({
  event,
  isActive = false,
  left,
  width,
  worldSeam = 50,
  onPointRef,
  onActivate,
}: TimelineEventProps) {
  const span = getEventSpan(event.year);
  const isRange = Boolean(span && span.end > span.start);
  const className = [
    "timeline-event",
    isActive ? "is-active" : "",
    isRange ? "is-span" : "is-point",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={className}
      data-event-id={event.id}
      tabIndex={-1}
      aria-current={isActive ? "true" : undefined}
      onFocus={() => onActivate?.(event.id)}
      onClick={() => onActivate?.(event.id)}
      style={
        {
          left: `${left}%`,
          width: isRange ? `${width}%` : undefined,
        } as CSSProperties
      }
    >
      {isRange && span ? (
        <div className="timeline-event-years">
          <div className="timeline-event-year is-start">
            <time dateTime={String(span.start)}>{span.start}</time>
          </div>
          <div className="timeline-event-year is-end">
            <time dateTime={String(span.end)}>{span.end}</time>
          </div>
        </div>
      ) : (
        <div className="timeline-event-year">
          {event.year ? (
            <time dateTime={event.year}>{event.year}</time>
          ) : null}
        </div>
      )}
      <div className="timeline-event-mark" aria-hidden>
        {isRange ? (
          <div
            className="timeline-event-span"
            data-timeline-hit="span"
            ref={(node) => onPointRef?.(event.id, node)}
          >
            <span className="timeline-event-range">
              <TimelineRangeFill
                left={left}
                width={width}
                worldSeam={worldSeam}
              />
              <span className="timeline-event-range-arrow">→</span>
            </span>
            <span className="timeline-event-tick" />
            <span className="timeline-event-tick" />
          </div>
        ) : (
          <span
            className="timeline-event-dot"
            data-timeline-hit="dot"
            ref={(node) => onPointRef?.(event.id, node)}
          />
        )}
      </div>
      <div className="sr-only">
        {event.year ? <span>{event.year}. </span> : null}
        {event.organization ? <span>{event.organization}. </span> : null}
        {event.context ? <span>{event.context}. </span> : null}
        <span>{event.title}. </span>
        {event.subtitle ? <span>{event.subtitle}. </span> : null}
        {event.progression ? <span>{event.progression}.</span> : null}
      </div>
    </li>
  );
}
