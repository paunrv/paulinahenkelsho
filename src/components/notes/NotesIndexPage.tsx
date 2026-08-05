import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NoteListItem } from "@/components/notes/NoteListItem";
import {
  formatCategoryLabel,
  getNotesByCategory,
  type NoteCategory,
  type NoteMeta,
} from "@/lib/notes";

const CATEGORY_COPY: Record<
  NoteCategory,
  { description: string; empty: string }
> = {
  Building: {
    description:
      "How products are built — discovery, UX, AI, systems, decisions, and real projects.",
    empty: "Nothing published here yet.",
  },
  "Field Notes": {
    description:
      "Observations from real life — hospitals, open water, travel, people, moments.",
    empty: "Nothing published here yet.",
  },
  Perspectives: {
    description:
      "Long-form reflections grounded in lived experience. Not opinion pieces.",
    empty: "Nothing published here yet.",
  },
};

function CategoryBlock({
  category,
  notes,
}: {
  category: NoteCategory;
  notes: NoteMeta[];
}) {
  const copy = CATEGORY_COPY[category];

  return (
    <section className="border-t border-line py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            {formatCategoryLabel(category)}
          </p>
          <p className="mt-6 text-lg leading-[1.65] text-muted">
            {copy.description}
          </p>
        </div>

        {notes.length > 0 ? (
          <ul className="mt-12 max-w-3xl border-t border-line md:mt-14">
            {notes.map((note) => (
              <NoteListItem key={note.slug} note={note} />
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-sm text-subtle md:mt-14">{copy.empty}</p>
        )}
      </div>
    </section>
  );
}

export function NotesIndexPage() {
  const building = getNotesByCategory("Building");
  const fieldNotes = getNotesByCategory("Field Notes");
  const perspectives = getNotesByCategory("Perspectives");

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
              One notebook. Three ways of thinking.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-muted md:text-xl">
              Projects show what was built. Notes show how she thinks — while
              building, while observing, while reflecting. Categories organize
              the shelf. They are not separate products.
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

        <CategoryBlock category="Building" notes={building} />
        <CategoryBlock category="Field Notes" notes={fieldNotes} />
        <CategoryBlock category="Perspectives" notes={perspectives} />
      </main>
      <SiteFooter />
    </>
  );
}
