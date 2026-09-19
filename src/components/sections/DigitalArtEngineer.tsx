"use client";

import { Timeline } from "@/components/timeline/Timeline";
import { TimelineEventDisplay } from "@/components/timeline/TimelineEventDisplay";
import { useLifetime } from "@/components/timeline/LifetimeContext";
import { getTimelineEvents } from "@/lib/timeline";

export function DigitalArtEngineer() {
  const events = getTimelineEvents();
  const { activeEventId, setActiveEventId } = useLifetime();

  return (
    <section
      id="digital-art-engineer"
      aria-label="Digital Art Engineer"
      className="timeline-floor pb-10 md:pb-14"
      onPointerLeave={() => setActiveEventId(null)}
    >
      <h2 className="sr-only">Digital Art Engineer</h2>
      <Timeline
        events={events}
        activeEventId={activeEventId}
        onActiveEventIdChange={setActiveEventId}
      >
        <TimelineEventDisplay activeEventId={activeEventId} events={events} />
      </Timeline>
    </section>
  );
}
