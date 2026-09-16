import type { TimelineEventData } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
  isActive?: boolean;
  onPointRef?: (id: string, node: HTMLElement | null) => void;
};

export function TimelineEvent({
  event,
  isActive = false,
  onPointRef,
}: TimelineEventProps) {
  return (
    <li
      className={isActive ? "timeline-event is-active" : "timeline-event"}
      data-event-id={event.id}
      tabIndex={-1}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="timeline-event-year">
        {event.year ? <time dateTime={event.year}>{event.year}</time> : null}
      </div>
      <div className="timeline-event-mark" aria-hidden>
        <span
          className="timeline-event-dot"
          ref={(node) => onPointRef?.(event.id, node)}
        />
      </div>
      <div className="timeline-event-copy">
        <p className="timeline-event-title">{event.title}</p>
        {event.subtitle ? (
          <p className="timeline-event-subtitle">{event.subtitle}</p>
        ) : null}
      </div>
    </li>
  );
}
