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

export const MANAGEMENT_DISCIPLINES = [
  "leadership",
  "people",
  "event-coordination",
  "project-management",
] as const;

export type FieldDiscipline = (typeof FIELD_DISCIPLINES)[number];
export type DeskDiscipline = (typeof DESK_DISCIPLINES)[number];
export type ManagementDiscipline = (typeof MANAGEMENT_DISCIPLINES)[number];

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
  management?: readonly ManagementDiscipline[];
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
    title: "Founder",
    organization: "HUMI Taekwondo",
    context: "Founded the academy and community.",
    type: "job",
    desk: ["product", "design", "technology"],
    field: ["clients"],
  },
  {
    id: "technology-events",
    year: "2012–2016",
    title: "Event production",
    organization: "Technology & Community",
    context:
      "Logistics for youth, women, and children · Licensed for Google Startup Weekend and Hackathon",
    type: "job",
    management: [
      "leadership",
      "people",
      "event-coordination",
      "project-management",
    ],
  },
  {
    id: "first-job",
    year: "2015–2018",
    title: "Sales",
    organization: "La Ruta VCC+",
    context: "Tourism startup",
    progression: "Professional internship → Sales",
    type: "job",
    field: ["operations", "logistics", "clients"],
    desk: ["product"],
  },
  {
    id: "summer-camp",
    year: "2015–2017",
    title: "Project Manager",
    organization: "Hotel Coral & Marina Summer Camp",
    context:
      "Six-week program for children ages 5 to 15 · Marine activities · Program development, coordination, safety, and staff",
    progression: "100 children per week",
    type: "job",
    management: [
      "leadership",
      "people",
      "event-coordination",
      "project-management",
    ],
  },
  {
    id: "digital-design-engineering",
    year: "2017",
    title: "Digital Design Engineer Degree",
    subtitle: "CETYS Universidad",
    desk: ["design", "technology", "product"],
  },
  {
    id: "tkd-olympic-bootcamp",
    year: "2017–2020",
    title: "Project Manager",
    organization: "TKD Olympic Bootcamp",
    context:
      "Master classes with Olympic champions · International logistics · Program development and execution",
    progression: "Private and government funding · 600+ registered participants",
    type: "job",
    management: ["event-coordination", "project-management"],
  },
  {
    id: "field-operations-environmental-monitoring",
    year: "2018–2019",
    title: "Field Operations & Environmental Monitoring",
    organization: "Cisco",
    context: "Environmental consulting",
    type: "job",
    field: ["operations", "monitoring", "logistics", "clients"],
    desk: ["systems", "research", "technology"],
  },
  {
    id: "trato-hecho-product-owner",
    year: "2020–2021",
    title: "Product Owner",
    organization: "Trato Hecho",
    context: "Real-estate startup for investors",
    progression: "SEO consulting → Front-end development → Product Owner",
    type: "job",
    desk: ["product", "design", "technology", "systems"],
    field: ["clients"],
  },
  {
    id: "ki-game-2021",
    year: "2021",
    title: "Ki-Game",
    context:
      "Event coordination · Three-day event · CrossFit and Taekwondo · 50 participants",
    type: "job",
    management: ["people", "event-coordination"],
  },
  {
    id: "cisco-consulting",
    year: "2021–2025",
    title: "Safety & Project Management",
    organization: "Cisco",
    context: "Environmental consulting",
    type: "job",
    field: ["safety", "operations", "monitoring", "logistics", "clients"],
    desk: ["systems", "research", "product"],
  },
  {
    id: "taekwondo-games",
    year: "2022–2024",
    title: "Taekwondo Games",
    context:
      "Event coordination · Annual event · Sports logistics · 300 participants",
    type: "job",
    management: ["people", "event-coordination"],
  },
  {
    id: "sunday-funday-2025",
    year: "2025",
    title: "Sunday Funday Master Class",
    context:
      "Event coordination and project management · Master class with a UFC fighter · Six-hour event · 300 participants",
    type: "job",
    management: ["event-coordination", "project-management"],
  },
  {
    id: "humi-16-years",
    year: "2026",
    title: "HUMI",
    subtitle: "16th anniversary",
    context:
      "Sixteen years of the academy. HUMI io is its operations product.",
    desk: ["product", "design", "technology"],
    field: ["clients"],
  },
] as const satisfies readonly TimelineEventData[];

export const HUMI_EVENT_IDS = [
  "humi-first-anniversary",
  "humi-16-years",
] as const;

export const HUMI_IDS = new Set<string>(HUMI_EVENT_IDS);

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

export type TimelineDomain = {
  min: number;
  weights: number[];
  total: number;
};

export type TimelinePlacement = {
  left: number;
  width: number;
  anchor: number;
};

export function getTimelineDomain(
  events: readonly TimelineEventData[]
): TimelineDomain {
  let min = Infinity;
  let max = -Infinity;
  for (const event of events) {
    const span = getEventSpan(event.year);
    if (!span) continue;
    min = Math.min(min, span.start);
    max = Math.max(max, span.end);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, weights: [1], total: 1 };
  }
  const weights: number[] = [];
  for (let year = min; year <= max; year += 1) {
    let covering = 0;
    for (const event of events) {
      const span = getEventSpan(event.year);
      if (!span) continue;
      if (year >= span.start && year <= span.end) covering += 1;
    }
    weights.push(1 + covering);
  }
  const total = weights.reduce((sum, value) => sum + value, 0);
  return { min, weights, total: Math.max(1, total) };
}

export function yearToPercent(
  year: number,
  min: number,
  weights: number[],
  total: number
) {
  let acc = 0;
  for (let y = min; y < year; y += 1) {
    acc += weights[y - min] ?? 1;
  }
  return (acc / total) * 100;
}

function pointNudge(
  event: TimelineEventData,
  events: readonly TimelineEventData[],
  domain: TimelineDomain
) {
  const span = getEventSpan(event.year);
  if (!span || span.end > span.start) return 0;
  const year = span.start;
  const points = events.filter((item) => {
    const itemSpan = getEventSpan(item.year);
    return Boolean(itemSpan && itemSpan.start === year && itemSpan.end === year);
  });
  if (points.length < 2) return 0;

  const yearWidth =
    ((domain.weights[year - domain.min] ?? 1) / domain.total) * 100;
  const anchor = points.find((item) => !item.management?.length);
  if (anchor?.id === event.id) return 0;

  const extras = anchor
    ? points.filter((item) => item.id !== anchor.id)
    : points;
  const index = Math.max(
    0,
    extras.findIndex((item) => item.id === event.id)
  );
  const slots = anchor ? extras.length + 1 : extras.length;
  if (!anchor) return (yearWidth * (index + 0.5)) / slots;
  return (yearWidth * (index + 1)) / slots;
}

export function getEventPlacement(
  event: TimelineEventData,
  events: readonly TimelineEventData[],
  domain: TimelineDomain
): TimelinePlacement {
  const span = getEventSpan(event.year);
  const start = span?.start ?? domain.min;
  const end = span?.end ?? start;
  const startLeft = yearToPercent(start, domain.min, domain.weights, domain.total);
  const endLeft = yearToPercent(end, domain.min, domain.weights, domain.total);
  const nudge = pointNudge(event, events, domain);
  const left = startLeft + nudge;
  const width = Math.max(0, endLeft - startLeft);
  const anchor = width > 0 ? startLeft + width / 2 : left;
  return { left, width, anchor };
}

