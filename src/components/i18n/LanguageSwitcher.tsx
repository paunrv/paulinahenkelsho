"use client";

import { useEffect } from "react";
import { detectInitialLang, useI18n, type Lang } from "@/i18n/i18n";

const LANGS: Lang[] = ["en", "es"];

export function LanguageSwitcher() {
  const { lang, setLang, dict } = useI18n();

  useEffect(() => {
    const preferred = detectInitialLang(lang);
    if (preferred !== lang) setLang(preferred);
  }, [lang, setLang]);

  return (
    <div className="fixed top-6 right-6 z-[9998] flex items-center gap-2 rounded-md border border-neutral-200/70 bg-white/75 px-3 py-2 text-sm tracking-tight text-neutral-950 shadow-sm backdrop-blur">
      <span className="sr-only">{dict.language.switchLabel}</span>
      {LANGS.map((l, idx) => {
        const active = l === lang;
        return (
          <span key={l} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={active}
              className={[
                "transition",
                active ? "opacity-100" : "opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              {dict.language[l]}
            </button>
            {idx === 0 ? <span className="opacity-60">/</span> : null}
          </span>
        );
      })}
    </div>
  );
}

