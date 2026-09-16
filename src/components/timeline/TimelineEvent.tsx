import type { TimelineEventData } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
};

export function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <li>
      {event.year ? <time dateTime={event.year}>{event.year}</time> : null}
    </li>
  );
}
