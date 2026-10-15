import type { TimelineEventData, TimelineEventId } from "@/lib/timeline";

export const TIMELINE_EMOJIS = {
  born: "🐣",
  "black-belt": "🥷",
  "humi-first-anniversary": "⛩️",
  "congreso-di-geek": "🎤",
  "startup-weekend-ensenada": "🏁",
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
  "congreso-di-geek":
    "Dos días, doscientos participantes, y el comité del evento.",
  "startup-weekend-ensenada":
    "Tres años en el comité de producción y logística.",
  "first-job":
    "El primer lugar donde la idea tuvo que sobrevivir al mundo real.",
  "summer-camp":
    "Programa de cuatro semanas para preadolescentes y adolescentes. Actividades en el mar. 50 participantes inscritos.",
  "trato-hecho-product-owner":
    "El primer lugar donde producto, negocio y usuario tuvieron que encontrarse.",
  "digital-design-engineering": "Aprendí a pensar entre disciplinas.",
  "tkd-olympic-bootcamp":
    "Master classes con campeones olímpicos. Logística internacional, desarrollo y ejecución del programa.",
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
    "congreso-di-geek": {
      title: "Director of the event committee",
      organization: "Congreso Di-Geek",
      context: "Two-day event",
      progression: "200 participants",
    },
    "startup-weekend-ensenada": {
      title: "Production and logistics committee.",
      organization: "Startup Weekend Ensenada by Google",
    },
    "summer-camp": {
      title: "Project Manager",
      organization: "Project Manager — Summer Camp at Hotel Coral & Marina",
      context:
        "Four-week program for preteens and teenagers · Activities in the sea · 50 enrolled participants",
    },
    "tkd-olympic-bootcamp": {
      title: "International logistics · Program development · Execution",
      organization: "TKD Olympic Bootcamp",
      context: "Master classes with Olympic champions",
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
      context: "Master class with a UFC fighter",
    },
  },
  es: {
    "congreso-di-geek": {
      title: "Directora del comité del evento",
      organization: "Congreso Di-Geek",
      context: "Evento de dos días",
      progression: "200 participantes",
    },
    "startup-weekend-ensenada": {
      title: "Comité de producción y logística.",
      organization: "Startup Weekend Ensenada by Google",
    },
    "summer-camp": {
      title: "Gerente de proyecto",
      organization:
        "Gerente de proyecto — Campamento de verano en Hotel Coral & Marina",
      context:
        "Programa de cuatro semanas para preadolescentes y adolescentes · Actividades en el mar · 50 participantes inscritos",
    },
    "tkd-olympic-bootcamp": {
      title: "Logística internacional · Desarrollo y ejecución del programa",
      organization: "TKD Olympic Bootcamp",
      context: "Master classes con campeones olímpicos",
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
      context: "Master class con un peleador de UFC",
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
