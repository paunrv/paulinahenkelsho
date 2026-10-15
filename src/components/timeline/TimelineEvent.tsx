import type { CSSProperties } from "react";
import { useI18n } from "@/i18n/i18n";
import type { TimelineEventData } from "@/lib/timeline";
import { getEventSpan } from "@/lib/timeline";
import { applyTimelineCopy } from "@/lib/timeline-content";

type TimelineEventProps = {
  event: TimelineEventData;
  isActive?: boolean;
  left: number;
  width: number;
  worldSeam?: number;
  onPointRef?: (id: string, node: HTMLElement | null) => void;
  onActivate?: (id: string) => void;
  onPick?: (clientX: number) => void;
};

function rangeWorlds(left: number, width: number, worldSeam: number) {
  const span = Math.max(width, 0.0001);
  const start = left;
  const end = left + width;
  const field = Math.max(0, Math.min(end, worldSeam) - start);
  const deskStart = Math.max(start, worldSeam);
  const desk = Math.max(0, end - deskStart);

  return {
    fieldWidth: (field / span) * 100,
    deskLeft: ((deskStart - start) / span) * 100,
    deskWidth: (desk / span) * 100,
    seamLeft: ((worldSeam - start) / span) * 100,
    crosses: start < worldSeam && end > worldSeam,
  };
}

type RangeTone = "management" | "field" | "desk" | "blend" | "world";

export function TimelineRangeFill({
  left,
  width,
  worldSeam,
  tone = "world",
}: {
  left: number;
  width: number;
  worldSeam: number;
  tone?: RangeTone;
}) {
  const worlds = rangeWorlds(left, width, worldSeam);
  const paint =
    tone === "blend" && worlds.crosses
      ? "world"
      : tone === "world" && !worlds.crosses
        ? worlds.deskWidth > 0
          ? "desk"
          : "field"
        : tone;

  if (paint === "world") {
    return (
      <span
        className="timeline-event-range-fill is-world"
        style={{ "--seam": `${worlds.seamLeft}%` } as CSSProperties}
      />
    );
  }

  return <span className={`timeline-event-range-fill is-${paint}`} />;
}

function rangeTone(event: TimelineEventData): RangeTone {
  const field = Boolean(event.field?.length);
  const desk = Boolean(event.desk?.length);
  const management = Boolean(event.management?.length);
  if (management && !field && !desk) return "management";
  if (field && desk) return "blend";
  if (field) return "field";
  if (desk) return "desk";
  return "world";
}

function endpointTone(
  event: TimelineEventData,
  edge: number,
  worldSeam: number,
  which: "start" | "end",
  crosses: boolean
) {
  const field = Boolean(event.field?.length);
  const desk = Boolean(event.desk?.length);
  const management = Boolean(event.management?.length);
  if (management && !field && !desk) return "management";
  if (field && !desk) return "field";
  if (desk && !field) return "desk";
  if (field && desk && !crosses) return which === "start" ? "field" : "desk";
  if (which === "start") return edge < worldSeam ? "field" : "desk";
  return edge > worldSeam ? "desk" : "field";
}

export function TimelineEvent({
  event,
  isActive = false,
  left,
  width,
  worldSeam = 50,
  onPointRef,
  onActivate,
  onPick,
}: TimelineEventProps) {
  const { lang } = useI18n();
  const copy = applyTimelineCopy(event, lang);
  const span = getEventSpan(event.year);
  const isRange = Boolean(span && span.end > span.start);
  const crosses = left < worldSeam && left + width > worldSeam;
  const tone = rangeTone(event);
  const startTone = endpointTone(event, left, worldSeam, "start", crosses);
  const endTone = endpointTone(event, left + width, worldSeam, "end", crosses);
  const className = [
    "timeline-event",
    isActive ? "is-active" : "",
    isRange ? "is-span" : "is-point",
    event.field?.length ? "is-field" : "",
    event.desk?.length ? "is-desk" : "",
    event.management?.length ? "is-management" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={className}
      data-event-id={event.id}
      tabIndex={-1}
      aria-current={isActive ? "true" : undefined}
      onFocus={() => onActivate?.(event.id)}
      onClick={(domEvent) => onPick?.(domEvent.clientX)}
      style={
        {
          left: `${left}%`,
          width: isRange ? `${width}%` : undefined,
        } as CSSProperties
      }
    >
      {isRange && span ? (
        <div className="timeline-event-years">
          <div className="timeline-event-year is-start">
            <time dateTime={String(span.start)}>{span.start}</time>
          </div>
          <div className="timeline-event-year is-end">
            <time dateTime={String(span.end)}>{span.end}</time>
          </div>
        </div>
      ) : (
        <div className="timeline-event-year">
          {event.year ? (
            <time dateTime={event.year}>{event.year}</time>
          ) : null}
        </div>
      )}
      <div className="timeline-event-mark" aria-hidden>
        {isRange ? (
          <div
            className="timeline-event-span"
            data-timeline-hit="span"
            ref={(node) => onPointRef?.(event.id, node)}
          >
            <span className="timeline-event-range">
              <TimelineRangeFill
                left={left}
                width={width}
                worldSeam={worldSeam}
                tone={tone}
              />
            </span>
            <span className={`timeline-event-tick is-start is-${startTone}`} />
            <span className={`timeline-event-tick is-end is-${endTone}`} />
          </div>
        ) : (
          <span
            className="timeline-event-dot"
            data-timeline-hit="dot"
            ref={(node) => onPointRef?.(event.id, node)}
          />
        )}
      </div>
      <div className="sr-only">
        {copy.year ? <span>{copy.year}. </span> : null}
        {copy.organization ? <span>{copy.organization}. </span> : null}
        {copy.context ? <span>{copy.context}. </span> : null}
        <span>{copy.title}. </span>
        {copy.subtitle ? <span>{copy.subtitle}. </span> : null}
        {copy.progression ? <span>{copy.progression}.</span> : null}
      </div>
    </li>
  );
}
