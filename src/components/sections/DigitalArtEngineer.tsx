"use client";

import { useState } from "react";
import { FieldDesk } from "@/components/sections/FieldDesk";
import { Timeline } from "@/components/timeline/Timeline";
import { getTimelineEvents } from "@/lib/timeline";

export function DigitalArtEngineer() {
  const events = getTimelineEvents();
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const activeEvent =
    events.find((item) => item.id === activeEventId) ?? null;

  return (
    <div
      className="lifetime-feature"
      onPointerLeave={() => setActiveEventId(null)}
    >
      <div id="digital-art-engineer" className="lifetime-track">
        <div className="mx-auto max-w-6xl px-gutter">
          <Timeline
            events={events}
            activeEventId={activeEventId}
            onActiveEventIdChange={setActiveEventId}
          />
        </div>
      </div>
      <FieldDesk
        activeField={activeEvent?.field}
        activeDesk={activeEvent?.desk}
        engaged={Boolean(activeEvent)}
      />
    </div>
  );
}
