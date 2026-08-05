import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NoteListItem } from "@/components/notes/NoteListItem";
import {
  getNotesByCategory,
  type NoteMeta,
} from "@/lib/notes";

function CategoryBlock({
  title,
  description,
  notes,
  empty,
}: {
  title: string;
  description: string;
  notes: NoteMeta[];
  empty: string;
}) {
  return (
    <section className="border-t border-line py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {title}
          </p>
          <p className="mt-6 text-lg leading-[1.65] text-muted">{description}</p>
        </div>

        {notes.length > 0 ? (
          <ul className="mt-12 max-w-3xl border-t border-line md:mt-14">
            {notes.map((note) => (
              <NoteListItem key={note.slug} note={note} />
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-sm text-subtle md:mt-14">{empty}</p>
        )}
      </div>
    </section>
  );
}

export function NotesIndexPage() {
  const building = getNotesByCategory("Building");
  const fieldNotes = getNotesByCategory("Field Notes");

  return (
    <>
      <SiteHeader />
      <main className="pt-14 md:pt-16">
        <header className="py-section">
          <div className="mx-auto max-w-6xl px-gutter">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              Notes
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-title-md font-light text-ink text-balance md:text-title-lg">
              A personal library of observations.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-muted md:text-xl">
              Projects show what was built. Notes reveal the thinking behind it
              — moments worth preserving, written to understand, not to teach.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-[1.65] text-subtle">
              A notebook. Not a blog.
            </p>
            <p className="mt-8">
              <Link
                href="/#notes"
                className="text-sm font-medium text-ink border-b border-accent/40 pb-0.5 transition-colors hover:border-accent"
              >
                Back home
              </Link>
            </p>
          </div>
        </header>

        <CategoryBlock
          title="Building"
          description="How products are born — decisions, tradeoffs, questions, and mistakes. Never frameworks."
          notes={building}
          empty="Nothing published here yet."
        />

        <CategoryBlock
          title="Field Notes"
          description="Life outside the computer. Observations only. No forced lesson."
          notes={fieldNotes}
          empty="Nothing published here yet."
        />
      </main>
      <SiteFooter />
    </>
  );
}
