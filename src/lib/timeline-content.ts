import type { TimelineEventData, TimelineEventId } from "@/lib/timeline";

export const TIMELINE_EMOJIS = {
  born: "🐣",
  "black-belt": "🥷",
  "humi-first-anniversary": "⛩️",
  "congreso-di-geek": "🎤",
  "startup-weekend-ensenada": "🏁",
  "first-job": "👩‍💻",
  "summer-camp-2016": "🌊",
  "summer-camp-2017": "🌊",
  "digital-design-engineering": "🎓",
  "tkd-olympic-bootcamp": "🥋",
  "field-operations-environmental-monitoring": "👷‍♀️",
  "trato-hecho-product-owner": "🚀",
  "ki-game-2021": "🏋️",
  "safety-project-management": "♻️",
  "taekwondo-games": "🥇",
  "field-operations-responsibility": "⚙️",
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
  "summer-camp-2016":
    "Cuatro semanas en el mar, con cincuenta inscritos.",
  "summer-camp-2017":
    "Seis semanas. Doscientos cincuenta estudiantes por semana.",
  "trato-hecho-product-owner":
    "El primer lugar donde producto, negocio y usuario tuvieron que encontrarse.",
  "digital-design-engineering": "Aprendí a pensar entre disciplinas.",
  "tkd-olympic-bootcamp":
    "Master classes con campeones olímpicos. Logística internacional, desarrollo y ejecución del programa.",
  "field-operations-environmental-monitoring":
    "Del escritorio al campo. Datos, sistemas y condiciones reales.",
  "safety-project-management":
    "Aprendí que un sistema también tiene que resistir.",
  "ki-game-2021": "Tres días de CrossFit y taekwondo.",
  "taekwondo-games":
    "Evento anual. Logística deportiva. 300 participantes.",
  "field-operations-responsibility":
    "Más responsabilidad. Menos margen para improvisar.",
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
    "summer-camp-2016": {
      title: "Summer Camp at Hotel Coral & Marina",
      organization: "Summer Camp at Hotel Coral & Marina",
      context: "Four-week program for preteens and teenagers",
      progression: "Activities in the sea · 50 enrolled participants",
    },
    "summer-camp-2017": {
      title: "Director and event lead",
      organization: "2nd Summer Camp at Hotel Coral & Marina",
      context: "Six-week program · ages 5–15",
      progression: "250 students per week",
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
    "summer-camp-2016": {
      title: "Campamento de verano en Hotel Coral & Marina",
      organization: "Campamento de verano en Hotel Coral & Marina",
      context: "Programa de cuatro semanas para preadolescentes y adolescentes",
      progression: "Actividades en el mar · 50 participantes inscritos",
    },
    "summer-camp-2017": {
      title: "Directora y líder del evento",
      organization: "2.º campamento de verano en Hotel Coral & Marina",
      context: "Programa de seis semanas · 5 a 15 años",
      progression: "250 estudiantes por semana",
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
