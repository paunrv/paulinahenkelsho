import type { CSSProperties } from "react";
import type { TimelineEventData } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
  isActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onPointRef?: (id: string, node: HTMLElement | null) => void;
};

export function getYearRange(
  year: string | null
): { start: string; end: string } | null {
  if (!year) return null;
  const match = /^(\d{4})–(\d{4})$/.exec(year);
  if (!match || match[1] === match[2]) return null;
  return { start: match[1], end: match[2] };
}

export function getSpanWeight(year: string | null): number {
  const range = getYearRange(year);
  if (!range) return 1;
  return Math.max(2, Number(range.end) - Number(range.start));
}

export function TimelineEvent({
  event,
  isActive = false,
  isFirst = false,
  isLast = false,
  onPointRef,
}: TimelineEventProps) {
  const range = getYearRange(event.year);
  const weight = getSpanWeight(event.year);
  const className = [
    "timeline-event",
    isActive ? "is-active" : "",
    range ? "is-span" : "",
    isFirst ? "is-first" : "",
    isLast ? "is-last" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={className}
      data-event-id={event.id}
      tabIndex={-1}
      aria-current={isActive ? "true" : undefined}
      style={
        {
          "--timeline-span-weight": weight,
        } as CSSProperties
      }
    >
      <div className="timeline-event-year">
        {range ? (
          <>
            <time dateTime={range.start}>{range.start}</time>
            <time dateTime={range.end}>{range.end}</time>
          </>
        ) : event.year ? (
          <time dateTime={event.year}>{event.year}</time>
        ) : null}
      </div>
      <div className="timeline-event-mark" aria-hidden>
        <span className="timeline-event-connector" />
        {range ? (
          <div
            className="timeline-event-span"
            data-timeline-hit="span"
            ref={(node) => onPointRef?.(event.id, node)}
          >
            <span className="timeline-event-tick" />
            <span className="timeline-event-rail" />
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
