export type TimelineEventType = "job";

export const FIELD_DISCIPLINES = [
  "operations",
  "safety",
  "monitoring",
  "logistics",
  "clients",
] as const;

export const DESK_DISCIPLINES = [
  "product",
  "systems",
  "research",
  "design",
  "technology",
] as const;

export type FieldDiscipline = (typeof FIELD_DISCIPLINES)[number];
export type DeskDiscipline = (typeof DESK_DISCIPLINES)[number];

export type TimelineEventData = {
  id: string;
  year: string | null;
  title: string;
  subtitle?: string;
  organization?: string;
  context?: string;
  progression?: string;
  type?: TimelineEventType;
  field?: readonly FieldDiscipline[];
  desk?: readonly DeskDiscipline[];
};

export type TimelineYearSpan = {
  start: number;
  end: number;
};

/**
 * Ordered lifetime events.
 * Components identify records by `id`, never by year, title, or index.
 * Artwork, scripts, and field/desk disciplines attach via `id`.
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
    desk: ["product", "design", "technology"],
    field: ["clients"],
  },
  {
    id: "first-job",
    year: "2015–2018",
    title: "La Ruta VCC+",
    subtitle: "Startup turismo",
    progression: "Prácticas profesionales → Ventas",
    type: "job",
    field: ["operations", "logistics", "clients"],
    desk: ["product"],
  },
  {
    id: "digital-design-engineering",
    year: "2017",
    title: "Digital Art Engineer",
    desk: ["design", "technology", "product"],
  },
  {
    id: "field-operations-environmental-monitoring",
    year: "2018–2019",
    title: "Field operations & environmental monitoring",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
    field: ["operations", "monitoring", "logistics", "clients"],
    desk: ["systems", "research", "technology"],
  },
  {
    id: "trato-hecho-product-owner",
    year: "2020–2021",
    title: "Trato Hecho",
    subtitle: "Startup inmobiliario",
    progression: "Front end + SEO → Product owner",
    type: "job",
    desk: ["product", "design", "technology", "systems"],
    field: ["clients"],
  },
  {
    id: "safety-project-management",
    year: "2021–2024",
    title: "Safety & project management",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
    field: ["safety", "operations", "clients"],
    desk: ["systems", "research", "product"],
  },
  {
    id: "field-operations-responsibility",
    year: "2025",
    title: "Field operations",
    organization: "Cisco",
    context: "Consultoría ambiental",
    type: "job",
    field: ["operations", "monitoring", "logistics", "clients"],
    desk: ["systems", "research"],
  },
  {
    id: "humi-16-years",
    year: "2026",
    title: "HUMI",
    subtitle: "16vo aniversario",
    desk: ["product", "design", "technology"],
    field: ["clients"],
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
