import type { TimelineEventData } from "@/lib/timeline";
import { getTimelineScript } from "@/lib/timeline-content";
import { getTimelineArtwork } from "./TimelineArtwork";

type TimelineTooltipProps = {
  event: TimelineEventData | null;
  x: number;
  y: number;
};

export function TimelineTooltip({ event, x, y }: TimelineTooltipProps) {
  if (!event) return null;

  const script = getTimelineScript(event.id);
  const Artwork = getTimelineArtwork(event.id);
  if (!script || !Artwork) return null;

  return (
    <div
      className="timeline-tooltip"
      style={{ left: x, top: y }}
      aria-hidden
    >
      <div className="timeline-tooltip-art">
        <Artwork />
      </div>
      <p className="timeline-tooltip-script">{script}</p>
    </div>
  );
}
