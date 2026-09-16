import type { TimelineEventData } from "@/lib/timeline";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineTooltip } from "./TimelineTooltip";

type TimelineProps = {
  events: readonly TimelineEventData[];
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div>
      <ol>
        {events.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </ol>
      <TimelineTooltip event={null} />
    </div>
  );
}
