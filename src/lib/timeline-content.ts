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
    "technology-events": {
      title: "Technology Events & Community Programs",
      organization: "Technology Events & Community Programs",
      context:
        "Event production and logistics for youth, women, and children · Licensed for Google Startup Weekend and Hackathon",
    },
    "summer-camp": {
      title: "Project Manager",
      organization: "Project Manager — Summer Camp at Hotel Coral & Marina",
      context:
        "Six-week program for children ages 5 to 15 · Sea activities · Program development, safety, and staff management. Oversight of 100 children per week",
    },
    "tkd-olympic-bootcamp": {
      title: "International logistics · Program development · Execution",
      organization: "Project Manager — TKD Olympic Bootcamp",
      context: "Master classes with Olympic champions",
      progression:
        "Private and government funding · 600+ registered participants",
    },
    "ki-game-2021": {
      title: "Ki-Game",
      organization: "Ki-Game",
      context: "Three-day event · CrossFit and Taekwondo",
      progression: "50 participants",
    },
    "cisco-consulting": {
      title: "Safety & project management",
      organization: "Cisco",
      context: "Environmental consulting",
      progression: "Field operations",
    },
    "taekwondo-games": {
      title: "Taekwondo Games",
      organization: "Taekwondo Games",
      context: "Annual event · Sports logistics · 300 participants",
    },
    "sunday-funday-2025": {
      title: "Sunday Funday Master Class",
      organization: "Sunday Funday Master Class",
      context:
        "Master class with a UFC fighter · Six-hour event · 300 registered participants",
    },
  },
  es: {
    "technology-events": {
      title: "Eventos de Tecnología y Comunidad",
      organization: "Eventos de Tecnología y Comunidad",
      context:
        "Producción y logística de eventos para jóvenes, mujeres y niños · Con licencia de Google Startup Weekend y Hackathon",
    },
    "summer-camp": {
      title: "Project Manager",
      organization: "Project Manager — Summer Camp en Hotel Coral & Marina",
      context:
        "Programa de seis semanas para niños desde los 5 hasta los 15 años · Actividades en el mar · Desarrollo de programa, seguridad y gestión de personal. Control de 100 niños por semana",
    },
    "tkd-olympic-bootcamp": {
      title: "Logística internacional · Desarrollo y ejecución del programa",
      organization: "Project Manager — TKD Olympic Bootcamp",
      context: "Master classes con campeones olímpicos",
      progression:
        "Financiamiento privado y gubernamental · Más de 600 inscritos",
    },
    "ki-game-2021": {
      title: "Ki-Game",
      organization: "Ki-Game",
      context: "Evento de tres días · CrossFit y Taekwondo",
      progression: "50 participantes",
    },
    "cisco-consulting": {
      title: "Seguridad y gestión de proyectos",
      organization: "Cisco",
      context: "Consultoría ambiental",
      progression: "Operaciones de campo",
    },
    "taekwondo-games": {
      title: "Taekwondo Games",
      organization: "Taekwondo Games",
      context: "Evento anual · Logística deportiva · 300 participantes",
    },
    "sunday-funday-2025": {
      title: "Sunday Funday Master Class",
      organization: "Sunday Funday Master Class",
      context:
        "Master class con un peleador de UFC · Evento de seis horas · 300 inscritos",
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
  };
}
