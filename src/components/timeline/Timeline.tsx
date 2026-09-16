import type { CSSProperties } from "react";
import type { TimelineEventData } from "@/lib/timeline";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineTooltip } from "./TimelineTooltip";
import "./timeline.css";

type TimelineProps = {
  events: readonly TimelineEventData[];
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="timeline">
      <div className="timeline-scroll">
        <div
          className="timeline-board"
          style={{ "--timeline-count": events.length } as CSSProperties}
        >
          <div className="timeline-line" aria-hidden />
          <ol className="timeline-track">
            {events.map((event) => (
              <TimelineEvent key={event.id} event={event} />
            ))}
          </ol>
        </div>
      </div>
      <TimelineTooltip event={null} />
    </div>
  );
}
