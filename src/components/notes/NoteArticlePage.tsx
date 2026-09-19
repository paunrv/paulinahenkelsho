import Link from "next/link";
import { NotesEtchFrame } from "@/components/notes/NotesEtchFrame";
import { NoteMarkdown } from "@/components/notes/NoteMarkdown";
import {
  formatCategoryLabel,
  formatNoteDate,
  getAdjacentNotes,
  noteExcerpt,
  splitNoteBody,
  type Note,
} from "@/lib/notes";
import "./note-article-etch.css";

const SITE = "https://pauhenkelsho.com";

export function NoteJsonLd({ note }: { note: Note }) {
  const url = `${SITE}/notes/${note.slug}`;
  const description = noteExcerpt(note.content, note.title);

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description,
    inLanguage: note.language,
    datePublished: note.date,
    author: {
      "@type": "Person",
      name: "Paulina Henkel",
      url: SITE,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    articleSection: formatCategoryLabel(note.category),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function NoteArticlePage({ note }: { note: Note }) {
  const { body, location } = splitNoteBody(note.content, note.title);
  const adjacent = getAdjacentNotes(note.slug);
  const dateLabel = formatNoteDate(note.date, note.language);

  return (
    <NotesEtchFrame className="note-article-etch">
      <NoteJsonLd note={note} />
      <main className="notes-index-screen note-article-screen">
        <article
          id="content"
          className="note-article"
          lang={note.language}
        >
          <p className="note-article-back">
            <Link href="/notes">← All notes</Link>
          </p>

          <header className="note-article-header">
            <p className="note-article-kicker">
              {formatCategoryLabel(note.category)}
            </p>
            <h1 className="note-article-title">{note.title}</h1>
            <p className="note-article-meta">
              <time dateTime={note.date}>{dateLabel}</time>
              {note.readingTime ? (
                <>
                  <span aria-hidden> · </span>
                  <span>{note.readingTime}</span>
                </>
              ) : null}
            </p>
            {location ? (
              <p className="note-article-location">{location}</p>
            ) : null}
          </header>

          <div className="note-article-body">
            <NoteMarkdown content={body} />
            <p className="note-article-signoff">Pau</p>
          </div>

          <nav className="note-article-endnav" aria-label="Notes">
            <Link href="/notes" className="note-article-all">
              ← All notes
            </Link>
            {adjacent.older || adjacent.newer ? (
              <p className="note-article-adjacent">
                {adjacent.older ? (
                  <Link href={`/notes/${adjacent.older.slug}`}>
                    ← {adjacent.older.title}
                  </Link>
                ) : (
                  <span />
                )}
                {adjacent.newer ? (
                  <Link href={`/notes/${adjacent.newer.slug}`}>
                    {adjacent.newer.title} →
                  </Link>
                ) : null}
              </p>
            ) : null}
          </nav>
        </article>
      </main>
    </NotesEtchFrame>
  );
}
