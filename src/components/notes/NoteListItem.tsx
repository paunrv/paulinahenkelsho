import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";
import { formatNoteDate } from "@/lib/notes";

export function NoteListItem({
  note,
  locale = "en",
}: {
  note: NoteMeta;
  locale?: string;
}) {
  return (
    <li className="border-b border-line">
      <Link
        href={`/notes/${note.slug}`}
        className="group block py-7 transition-colors md:py-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="font-display text-xl font-light text-ink transition-colors group-hover:text-accent md:text-2xl">
              {note.title}
            </p>
            {note.subtitle ? (
              <p className="mt-2 text-sm leading-[1.5] text-muted">
                {note.subtitle}
              </p>
            ) : null}
          </div>
          <div className="shrink-0 text-xs text-subtle sm:text-right">
            <p>{formatNoteDate(note.date, locale)}</p>
            {note.readingTime ? (
              <p className="mt-1">{note.readingTime}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
