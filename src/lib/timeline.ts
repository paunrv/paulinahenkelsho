export type TimelineEventType = "job";

export type TimelineEventData = {
  id: string;
  year: string | null;
  title: string;
  subtitle?: string;
  type?: TimelineEventType;
};

/**
 * Ordered Digital Art Engineer events.
 * Components identify records by `id`, never by year.
 * Artwork, scripts, and EN/ES copy can attach later via `id`.
 */
export const TIMELINE_EVENTS = [
  {
    id: "born",
    year: "1991",
    title: "Nací",
  },
  {
    id: "black-belt",
    year: "2000",
    title: "Cinta Negra",
  },
  {
    id: "humi-first-anniversary",
    year: "2010",
    title: "HUMI, 1er Aniversario",
  },
  {
    id: "first-job",
    year: null,
    title: "La Ruta VCC+",
    subtitle: "Startup",
    type: "job",
  },
  {
    id: "digital-design-engineering",
    year: "2017",
    title: "Ing. en Diseño Digital",
  },
  {
    id: "field-operations-environmental-monitoring",
    year: "2018–2020",
    title: "FIELD OPERATIONS & ENVIRONMENTAL MONITORING",
  },
  {
    id: "safety-project-management",
    year: "2021–2024",
    title: "SAFETY & PROJECT MANAGEMENT",
  },
  {
    id: "field-operations-responsibility",
    year: "2025",
    title: "FIELD OPERATIONS RESPONSIBILITY",
  },
  {
    id: "humi-16-years",
    year: "2026",
    title: "HUMI, 16 años",
  },
] as const satisfies readonly TimelineEventData[];

export type TimelineEventId = (typeof TIMELINE_EVENTS)[number]["id"];

export function getTimelineEvents(): readonly TimelineEventData[] {
  return TIMELINE_EVENTS;
}
