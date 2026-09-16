import type { CSSProperties } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
  isActive?: boolean;
  left: number;
  width: number;
  onPointRef?: (id: string, node: HTMLElement | null) => void;
  onActivate?: (id: string) => void;
};

export function TimelineEvent({
  event,
  isActive = false,
  left,
  width,
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
      style={
        {
          left: `${left}%`,
          width: isRange ? `${width}%` : undefined,
        } as CSSProperties
      }
    >
      <div className="timeline-event-year">
        {event.year ? (
          <time dateTime={event.year}>{event.year}</time>
        ) : null}
      </div>
      <div className="timeline-event-mark" aria-hidden>
        {isRange ? (
          <div
            className="timeline-event-span"
            data-timeline-hit="span"
            ref={(node) => onPointRef?.(event.id, node)}
          >
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
