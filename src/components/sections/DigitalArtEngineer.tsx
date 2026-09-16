import { getTimelineEvents } from "@/lib/timeline";
import { Timeline } from "@/components/timeline/Timeline";

export function DigitalArtEngineer() {
  const events = getTimelineEvents();

  return (
    <div id="digital-art-engineer" className="lifetime-track">
      <div className="mx-auto max-w-6xl px-gutter">
        <Timeline events={events} />
      </div>
    </div>
  );
}
