import type { JSX, ReactNode } from "react";
import type { TimelineEventId } from "@/lib/timeline";

function Mark({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" aria-hidden>
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

function BornArt() {
  return (
    <Mark>
      <path d="M4 16c3-7 5 7 10 0s7 7 10 0" />
    </Mark>
  );
}

function BlackBeltArt() {
  return (
    <Mark>
      <path d="M3 14h8" />
      <rect x="12" y="12" width="4" height="4" />
      <path d="M17 14h8" />
    </Mark>
  );
}

function HumiFirstArt() {
  return (
    <Mark>
      <circle cx="14" cy="8" r="2.1" />
      <path d="M10 13v9M18 13v9M10 18h8" />
    </Mark>
  );
}

function FirstJobArt() {
  return (
    <Mark>
      <path d="M4 20h9V8h11" />
    </Mark>
  );
}

function DigitalDesignArt() {
  return (
    <Mark>
      <circle cx="10" cy="10" r="2.1" />
      <circle cx="18" cy="18" r="2.1" />
      <path d="M12 12l4 4" />
    </Mark>
  );
}

function FieldMonitoringArt() {
  return (
    <Mark>
      <path d="M4 20h20" />
      <path d="M5 20l4-7 4 3 4-9 4 5 3-3" />
    </Mark>
  );
}

function SafetyArt() {
  return (
    <Mark>
      <path d="M8 8h12v12H8z" />
      <path d="M8 14h12M14 8v12" />
    </Mark>
  );
}

function FieldResponsibilityArt() {
  return (
    <Mark>
      <path d="M4 20c6 0 6-12 12-12h8" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </Mark>
  );
}

function HumiSixteenArt() {
  return (
    <Mark>
      <path d="M6 21h16" />
      <circle cx="11" cy="11" r="1.8" />
      <circle cx="17" cy="11" r="1.8" />
      <path d="M11 13v5M17 13v5" />
    </Mark>
  );
}

export const TIMELINE_ARTWORK = {
  born: BornArt,
  "black-belt": BlackBeltArt,
  "humi-first-anniversary": HumiFirstArt,
  "first-job": FirstJobArt,
  "digital-design-engineering": DigitalDesignArt,
  "field-operations-environmental-monitoring": FieldMonitoringArt,
  "safety-project-management": SafetyArt,
  "field-operations-responsibility": FieldResponsibilityArt,
  "humi-16-years": HumiSixteenArt,
} as const satisfies Record<TimelineEventId, () => JSX.Element>;

export function getTimelineArtwork(id: string) {
  return TIMELINE_ARTWORK[id as TimelineEventId];
}
