import type { TimelineEventData } from "@/lib/timeline";

type TimelineTooltipProps = {
  event?: TimelineEventData | null;
};

export function TimelineTooltip({ event = null }: TimelineTooltipProps) {
  if (!event) return null;

  return (
    <div hidden>
      <p>{event.year}</p>
    </div>
  );
}
