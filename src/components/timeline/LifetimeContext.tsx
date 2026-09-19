"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DESK_DISCIPLINES,
  FIELD_DISCIPLINES,
  HUMI_IDS,
  getTimelineEvents,
} from "@/lib/timeline";

type LifetimeContextValue = {
  activeEventId: string | null;
  setActiveEventId: (id: string | null) => void;
  fieldLit: ReadonlySet<string>;
  deskLit: ReadonlySet<string>;
  isPlaying: boolean;
};

const LifetimeContext = createContext<LifetimeContextValue | null>(null);

function collectLit(activeEventId: string | null) {
  const fieldLit = new Set<string>();
  const deskLit = new Set<string>();
  if (!activeEventId || activeEventId === "born") {
    return { fieldLit, deskLit, isPlaying: false };
  }

  const events = getTimelineEvents();
  const ids = HUMI_IDS.has(activeEventId)
    ? [...HUMI_IDS]
    : [activeEventId];

  for (const id of ids) {
    const event = events.find((item) => item.id === id);
    event?.field?.forEach((item) => fieldLit.add(item));
    event?.desk?.forEach((item) => deskLit.add(item));
  }

  return {
    fieldLit,
    deskLit,
    isPlaying: fieldLit.size > 0 || deskLit.size > 0,
  };
}

export function LifetimeProvider({ children }: { children: ReactNode }) {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const value = useMemo(() => {
    const lit = collectLit(activeEventId);
    return { activeEventId, setActiveEventId, ...lit };
  }, [activeEventId]);

  return (
    <LifetimeContext.Provider value={value}>{children}</LifetimeContext.Provider>
  );
}

export function useLifetime() {
  const ctx = useContext(LifetimeContext);
  if (!ctx) {
    throw new Error("useLifetime must be used within LifetimeProvider");
  }
  return ctx;
}

export const FIELD_WORD_IDS = FIELD_DISCIPLINES;
export const DESK_WORD_IDS = DESK_DISCIPLINES;
