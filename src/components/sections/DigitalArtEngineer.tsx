import { getTimelineEvents } from "@/lib/timeline";
import { Timeline } from "@/components/timeline/Timeline";

export function DigitalArtEngineer() {
  const events = getTimelineEvents();

  return (
    <section
      id="digital-art-engineer"
      aria-labelledby="digital-art-engineer-heading"
      className="border-t border-line py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <h2
          id="digital-art-engineer-heading"
          className="font-outfit text-sm font-bold tracking-[0.2em] text-ink"
        >
          DIGITAL ART ENGINEER
        </h2>
        <Timeline events={events} />
      </div>
    </section>
  );
}
