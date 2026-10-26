import type { TimelineEventData, TimelineEventId } from "@/lib/timeline";

export const TIMELINE_EMOJIS = {
  born: "🐣",
  "black-belt": "🥷",
  "humi-first-anniversary": "⛩️",
  "technology-events": "🎤",
  "first-job": "👩‍💻",
  "summer-camp": "🌊",
  "digital-design-engineering": "🎓",
  "tkd-olympic-bootcamp": "🥋",
  "field-operations-environmental-monitoring": "👷‍♀️",
  "trato-hecho-product-owner": "🚀",
  "ki-game-2021": "🏋️",
  "cisco-consulting": "♻️",
  "taekwondo-games": "🥇",
  "sunday-funday-2025": "☀️",
  "humi-16-years": "⛩️",
} as const satisfies Record<TimelineEventId, string>;

export function getTimelineEmoji(id: string): string | undefined {
  return TIMELINE_EMOJIS[id as TimelineEventId];
}

export const TIMELINE_SCRIPTS = {
  born: "Todo empezó antes de que existiera una pantalla.",
  "black-belt": "Aprendí que repetir también es una forma de diseñar.",
  "humi-first-anniversary": "Mi primer servicio, sin tener un plan.",
  "technology-events":
    "Producción y logística de eventos para jóvenes, mujeres y niños.",
  "first-job":
    "El primer lugar donde la idea tuvo que sobrevivir al mundo real.",
  "summer-camp":
    "Programas de cuatro a seis semanas. Actividades en el mar. Coordinación del programa.",
  "trato-hecho-product-owner":
    "El primer lugar donde producto, negocio y usuario tuvieron que encontrarse.",
  "digital-design-engineering": "Aprendí a pensar entre disciplinas.",
  "tkd-olympic-bootcamp":
    "Master classes con campeones olímpicos. Logística internacional, desarrollo y ejecución del programa. Financiamiento privado y gubernamental.",
  "field-operations-environmental-monitoring":
    "Del escritorio al campo. Datos, sistemas y condiciones reales.",
  "cisco-consulting":
    "Consultoría ambiental. Seguridad y gestión de proyectos. Operaciones de campo.",
  "ki-game-2021": "Tres días de CrossFit y taekwondo.",
  "taekwondo-games":
    "Evento anual. Logística deportiva. 300 participantes.",
  "sunday-funday-2025": "Una master class con un peleador de UFC.",
  "humi-16-years":
    "Producto, servicios, tecnología y contacto humano.",
} as const satisfies Record<TimelineEventId, string>;

export type TimelineScriptId = keyof typeof TIMELINE_SCRIPTS;

export function getTimelineScript(id: string): string | undefined {
  return TIMELINE_SCRIPTS[id as TimelineScriptId];
}

type TimelineLang = "en" | "es";

type ManagementEventCopy = {
  title: string;
  organization?: string;
  context?: string;
  subtitle?: string;
  progression?: string;
};

const MANAGEMENT_EVENT_COPY = {
  en: {
    born: { title: "Born" },
    "black-belt": { title: "Jr. Black Belt" },
    "humi-first-anniversary": {
      title: "Founder",
      organization: "HUMI Taekwondo",
      context: "Founded the academy and community.",
    },
    "technology-events": {
      title: "Event production",
      organization: "Technology & Community",
      context:
        "Logistics for youth, women, and children · Licensed for Google Startup Weekend and Hackathon",
    },
    "first-job": {
      title: "Sales",
      organization: "La Ruta VCC+",
      context: "Tourism startup",
      progression: "Professional internship",
    },
    "summer-camp": {
      title: "Project Manager",
      organization: "Hotel Coral & Marina Summer Camp",
      context:
        "Six-week program for children ages 5 to 15 · Marine activities · Program development, coordination, safety, and staff",
      progression: "100 children per week",
    },
    "digital-design-engineering": {
      title: "Digital Design Engineer Degree",
      subtitle: "CETYS Universidad",
    },
    "tkd-olympic-bootcamp": {
      title: "Project Manager",
      organization: "TKD Olympic Bootcamp",
      context:
        "Master classes with Olympic champions · International logistics · Program development and execution",
      progression: "Private and government funding · 600+ registered participants",
    },
    "field-operations-environmental-monitoring": {
      title: "Field Operations & Environmental Monitoring",
      organization: "Cisco",
      context: "Environmental consulting",
    },
    "trato-hecho-product-owner": {
      title: "Product Owner",
      organization: "Trato Hecho",
      context: "Real-estate startup for investors",
    },
    "ki-game-2021": {
      title: "Ki-Game",
      context:
        "Event coordination · Three-day event · CrossFit and Taekwondo · 50 participants",
    },
    "cisco-consulting": {
      title: "Safety & Project Management",
      organization: "Cisco",
      context: "Environmental consulting",
    },
    "taekwondo-games": {
      title: "Taekwondo Games",
      context:
        "Event coordination · Annual event · Sports logistics · 300 participants",
    },
    "sunday-funday-2025": {
      title: "Sunday Funday Master Class",
      context:
        "Event coordination and project management · With a UFC fighter · Six-hour event · 300 participants",
    },
    "humi-16-years": {
      title: "HUMI",
      subtitle: "16th anniversary",
      context: "HUMI io is its operations product.",
    },
  },
  es: {
    born: { title: "Nacimiento" },
    "black-belt": { title: "Cinta negra jr." },
    "humi-first-anniversary": {
      title: "Fundadora",
      organization: "HUMI Taekwondo",
      context: "Fundación de la academia y la comunidad.",
    },
    "technology-events": {
      title: "Producción de eventos",
      organization: "Tecnología y comunidad",
      context:
        "Logística para jóvenes, mujeres y niños · Con licencia de Google Startup Weekend y Hackathon",
    },
    "first-job": {
      title: "Ventas",
      organization: "La Ruta VCC+",
      context: "Startup de turismo",
      progression: "Prácticas profesionales",
    },
    "summer-camp": {
      title: "Project Manager",
      organization: "Summer Camp en Hotel Coral & Marina",
      context:
        "Programa de seis semanas para niños de 5 a 15 años · Actividades en el mar · Desarrollo y coordinación del programa, seguridad y gestión de personal",
      progression: "100 niños por semana",
    },
    "digital-design-engineering": {
      title: "Título de Ingeniería en Diseño Digital",
      subtitle: "CETYS Universidad",
    },
    "tkd-olympic-bootcamp": {
      title: "Project Manager",
      organization: "TKD Olympic Bootcamp",
      context:
        "Master classes con campeones olímpicos · Logística internacional · Desarrollo y ejecución del programa",
      progression:
        "Financiamiento privado y gubernamental · Más de 600 inscritos",
    },
    "field-operations-environmental-monitoring": {
      title: "Operaciones de campo y monitoreo ambiental",
      organization: "Cisco",
      context: "Consultoría ambiental",
    },
    "trato-hecho-product-owner": {
      title: "Product Owner",
      organization: "Trato Hecho",
      context: "Startup inmobiliaria para inversionistas",
    },
    "ki-game-2021": {
      title: "Ki-Game",
      context:
        "Coordinación del evento · Evento de tres días · CrossFit y Taekwondo · 50 participantes",
    },
    "cisco-consulting": {
      title: "Seguridad y gestión de proyectos",
      organization: "Cisco",
      context: "Consultoría ambiental",
    },
    "taekwondo-games": {
      title: "Taekwondo Games",
      context:
        "Coordinación del evento · Evento anual · Logística deportiva · 300 participantes",
    },
    "sunday-funday-2025": {
      title: "Sunday Funday Master Class",
      context:
        "Coordinación del evento y gestión del proyecto · Con un peleador de UFC · Evento de seis horas · 300 participantes",
    },
    "humi-16-years": {
      title: "HUMI",
      subtitle: "16.º aniversario",
      context:
        "HUMI io es su producto de operación.",
    },
  },
} as const satisfies Record<
  TimelineLang,
  Partial<Record<TimelineEventId, ManagementEventCopy>>
>;

export function applyTimelineCopy(
  event: TimelineEventData,
  lang: TimelineLang
): TimelineEventData {
  const copy = MANAGEMENT_EVENT_COPY[lang][
    event.id as keyof (typeof MANAGEMENT_EVENT_COPY)["en"]
  ];
  if (!copy) return event;
  return {
    ...event,
    title: copy.title,
    organization: "organization" in copy ? copy.organization : undefined,
    context: "context" in copy ? copy.context : undefined,
    progression: "progression" in copy ? copy.progression : undefined,
    subtitle: "subtitle" in copy ? copy.subtitle : undefined,
  };
}
