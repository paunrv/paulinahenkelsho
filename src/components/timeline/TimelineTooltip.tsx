import type { TimelineEventData } from "@/lib/timeline";

type TimelineTooltipProps = {
  event: TimelineEventData | null;
  x: number;
  y: number;
};

export function TimelineTooltip({ event, x, y }: TimelineTooltipProps) {
  if (!event) return null;

  return (
    <div
      className="timeline-tooltip"
      style={{ left: x, top: y }}
      aria-hidden
    />
  );
}
