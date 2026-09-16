import type { TimelineEventData } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
};

export function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <li className="timeline-event">
      <div className="timeline-event-year">
        {event.year ? <time dateTime={event.year}>{event.year}</time> : null}
      </div>
      <div className="timeline-event-mark" aria-hidden>
        <span className="timeline-event-dot" />
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
