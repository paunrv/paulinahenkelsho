export type TimelineEventType = "job";

export type TimelineEventData = {
  id: string;
  year: string | null;
  title: string;
  subtitle?: string;
  organization?: string;
  context?: string;
  progression?: string;
  type?: TimelineEventType;
};

export type TimelineYearSpan = {
  start: number;
  end: number;
};

/**
 * Ordered lifetime events.
 * Components identify records by `id`, never by year, title, or index.
 * Artwork and scripts attach via `id`.
 */
export const TIMELINE_EVENTS = [
  {
    id: "born",
    year: "1991",
    title: "Born",
  },
  {
    id: "black-belt",
    year: "2000",
    title: "Jr. Black Belt",
  },
  {
    id: "humi-first-anniversary",
    year: "2010",
    title: "HUMI Borns",
  },
  {
    id: "first-job",
    year: "2015–2018",
    title: "La Ruta VCC+",
    subtitle: "Startup turismo",
    progression: "Prácticas profesionales → Ventas",
    type: "job",
  },
  {
    id: "digital-design-engineering",
    year: "2017",
    title: "Digital Art Engineer",
  },
  {
    id: "field-operations-environmental-monitoring",
    year: "2018–2019",
    title: "Field operations & environmental monitoring",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
  },
  {
    id: "trato-hecho-product-owner",
    year: "2020–2021",
    title: "Trato Hecho",
    subtitle: "Startup inmobiliario",
    progression: "Front end + SEO → Product owner",
    type: "job",
  },
  {
    id: "safety-project-management",
    year: "2021–2024",
    title: "Safety & project management",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
  },
  {
    id: "field-operations-responsibility",
    year: "2025",
    title: "Field operations",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
  },
  {
    id: "humi-16-years",
    year: "2026",
    title: "HUMI",
    subtitle: "16yo",
  },
] as const satisfies readonly TimelineEventData[];

export type TimelineEventId = (typeof TIMELINE_EVENTS)[number]["id"];

export function getEventSpan(year: string | null): TimelineYearSpan | null {
  if (!year) return null;
  const range = /^(\d{4})–(\d{4})$/.exec(year);
  if (range) {
    return { start: Number(range[1]), end: Number(range[2]) };
  }
  const single = /^(\d{4})$/.exec(year);
  if (single) {
    const value = Number(single[1]);
    return { start: value, end: value };
  }
  return null;
}

export function getTimelineEvents(): readonly TimelineEventData[] {
  return TIMELINE_EVENTS;
}
