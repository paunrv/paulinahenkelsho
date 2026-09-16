import type { TimelineEventData } from "@/lib/timeline";

type TimelineEventProps = {
  event: TimelineEventData;
};

export function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <li>
      <time dateTime={String(event.year)}>{event.year}</time>
    </li>
  );
}
