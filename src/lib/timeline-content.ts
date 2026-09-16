import type { TimelineEventId } from "@/lib/timeline";

export const TIMELINE_SCRIPTS = {
  born: "Todo empezó antes de que existiera una pantalla.",
  "black-belt": "Aprendí que repetir también es una forma de diseñar.",
  "humi-first-anniversary": "Mi primer producto en producción.",
  "first-job":
    "El primer lugar donde la idea tuvo que sobrevivir al mundo real.",
  "digital-design-engineering": "Aprendí a pensar entre disciplinas.",
  "field-operations-environmental-monitoring":
    "Del escritorio al campo. Datos, sistemas y condiciones reales.",
  "safety-project-management":
    "Aprendí que un sistema también tiene que resistir.",
  "field-operations-responsibility":
    "Más responsabilidad. Menos margen para improvisar.",
  "humi-16-years":
    "Lo que empezó como práctica terminó convertido en producto.",
} as const satisfies Record<TimelineEventId, string>;

export type TimelineScriptId = keyof typeof TIMELINE_SCRIPTS;

export function getTimelineScript(id: string): string | undefined {
  return TIMELINE_SCRIPTS[id as TimelineScriptId];
}
