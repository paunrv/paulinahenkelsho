"use client";

import { useState } from "react";
import { FieldDesk } from "@/components/sections/FieldDesk";
import { Timeline } from "@/components/timeline/Timeline";
import { TimelineEventDisplay } from "@/components/timeline/TimelineEventDisplay";
import { getTimelineEvents } from "@/lib/timeline";

export function DigitalArtEngineer() {
  const events = getTimelineEvents();
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const activeEvent =
    events.find((item) => item.id === activeEventId) ?? null;
  const engaged = Boolean(
    (activeEvent?.field?.length ?? 0) > 0 ||
      (activeEvent?.desk?.length ?? 0) > 0
  );

  return (
    <div
      className="lifetime-feature"
      onPointerLeave={() => setActiveEventId(null)}
    >
      <FieldDesk
        activeField={activeEvent?.field}
        activeDesk={activeEvent?.desk}
        engaged={engaged}
      />
      <div id="digital-art-engineer" className="lifetime-track">
        <Timeline
          events={events}
          activeEventId={activeEventId}
          onActiveEventIdChange={setActiveEventId}
        />
        <TimelineEventDisplay event={activeEvent} />
      </div>
    </div>
  );
}
