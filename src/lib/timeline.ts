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

/**
 * Ordered Digital Art Engineer events.
 * Components identify records by `id`, never by year, title, or index.
 * Artwork and scripts attach via `id`.
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
    subtitle: "Startup Turismo",
    progression: "Prácticas Profesionales → Ventas",
    type: "job",
  },
  {
    id: "digital-design-engineering",
    year: "2017",
    title: "Ing. en Diseño Digital",
  },
  {
    id: "field-operations-environmental-monitoring",
    year: "2018–2019",
    title: "Field Operations & Environmental Monitoring",
    organization: "Cisco",
    context: "Consultoría Ambiental",
    type: "job",
  },
  {
    id: "trato-hecho-product-owner",
    year: "2020–2021",
    title: "Trato Hecho",
    subtitle: "Startup Inmobiliario",
    progression: "Front End + SEO → Product Owner",
    type: "job",
  },
  {
    id: "safety-project-management",
    year: "2021–2024",
    title: "Safety & Project Management",
    organization: "Cisco",
    context: "Consultoría Ambiental",
    type: "job",
  },
  {
    id: "field-operations-responsibility",
    year: "2025",
    title: "Field Operations",
    organization: "Cisco",
    context: "Consultoría Ambiental",
    type: "job",
  },
  {
    id: "humi-16-years",
    year: "2026",
    title: "HUMI, 16vo aniversario",
  },
] as const satisfies readonly TimelineEventData[];

export type TimelineEventId = (typeof TIMELINE_EVENTS)[number]["id"];

export function getTimelineEvents(): readonly TimelineEventData[] {
  return TIMELINE_EVENTS;
}
