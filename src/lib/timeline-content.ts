import type { TimelineEventId } from "@/lib/timeline";

export const TIMELINE_EMOJIS = {
  born: "🐣",
  "black-belt": "🥷",
  "humi-first-anniversary": "⛩️",
  "first-job": "👩‍💻",
  "digital-design-engineering": "🎓",
  "field-operations-environmental-monitoring": "👷‍♀️",
  "trato-hecho-product-owner": "🚀",
  "safety-project-management": "♻️",
  "field-operations-responsibility": "⚙️",
  "humi-16-years": "⛩️",
} as const satisfies Record<TimelineEventId, string>;

export function getTimelineEmoji(id: string): string | undefined {
  return TIMELINE_EMOJIS[id as TimelineEventId];
}

export const TIMELINE_SCRIPTS = {
  born: "Todo empezó antes de que existiera una pantalla.",
  "black-belt": "Aprendí que repetir también es una forma de diseñar.",
  "humi-first-anniversary": "Mi primer servicio, sin tener un plan.",
  "first-job":
    "El primer lugar donde la idea tuvo que sobrevivir al mundo real.",
  "trato-hecho-product-owner":
    "El primer lugar donde producto, negocio y usuario tuvieron que encontrarse.",
  "digital-design-engineering": "Aprendí a pensar entre disciplinas.",
  "field-operations-environmental-monitoring":
    "Del escritorio al campo. Datos, sistemas y condiciones reales.",
  "safety-project-management":
    "Aprendí que un sistema también tiene que resistir.",
  "field-operations-responsibility":
    "Más responsabilidad. Menos margen para improvisar.",
  "humi-16-years":
    "Producto, servicios, tecnología y contacto humano.",
} as const satisfies Record<TimelineEventId, string>;

export type TimelineScriptId = keyof typeof TIMELINE_SCRIPTS;

export function getTimelineScript(id: string): string | undefined {
  return TIMELINE_SCRIPTS[id as TimelineScriptId];
}
