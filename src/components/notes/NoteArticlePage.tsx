import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NoteMarkdown } from "@/components/notes/NoteMarkdown";
import { formatNoteDate, type Note } from "@/lib/notes";

export function NoteArticlePage({ note }: { note: Note }) {
  return (
    <>
      <SiteHeader />
      <main className="pt-14 md:pt-16">
        <article className="pb-section" lang={note.language}>
          <header className="border-b border-line py-section">
            <div className="mx-auto max-w-2xl px-gutter md:max-w-[42rem]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
                {note.category}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtle">
                <time dateTime={note.date}>
                  {formatNoteDate(note.date, note.language)}
                </time>
                {note.readingTime ? <span>{note.readingTime}</span> : null}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-2xl px-gutter pt-12 md:max-w-[42rem] md:pt-14">
            <NoteMarkdown content={note.content} />
          </div>

          <div className="mx-auto max-w-2xl px-gutter pt-14 md:max-w-[42rem] md:pt-16">
            <Link
              href="/notes"
              className="text-sm font-medium text-ink border-b border-accent/40 pb-0.5 transition-colors hover:border-accent"
            >
              All notes
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
