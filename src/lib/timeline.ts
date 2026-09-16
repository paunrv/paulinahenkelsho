export type TimelineEventId = string;

export type TimelineEventData = {
  id: TimelineEventId;
  year: number;
};

/**
 * Structural event records only. Labels and narrative copy are resolved
 * later by `id`, never with year conditionals in timeline components.
 */
export const TIMELINE_EVENTS: readonly TimelineEventData[] = [];

export function getTimelineEvents(): readonly TimelineEventData[] {
  return TIMELINE_EVENTS;
}
