import Link from "next/link";
import { NotesIndexNav } from "@/components/notes/NotesIndexNav";
import {
  NOTE_CATEGORIES,
  formatCategoryLabel,
  getNotesByCategory,
  type NoteCategory,
  type NoteMeta,
} from "@/lib/notes";
import "./notes-index-etch.css";

const EMPTY_COPY: Record<NoteCategory, string> = {
  Building: "Nothing published here yet.",
  "Field Notes": "Nothing published here yet.",
  Perspectives: "Nothing published here yet.",
};

type TableRow = {
  key: string;
  category: string;
  showCategory: boolean;
  title: string;
  href?: string;
  date: string;
  dateTime?: string;
  readingTime: string;
};

function formatTableDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function buildRows(): TableRow[] {
  const rows: TableRow[] = [];

  for (const category of NOTE_CATEGORIES) {
    const notes: NoteMeta[] = getNotesByCategory(category);
    const label = formatCategoryLabel(category);

    if (notes.length === 0) {
      rows.push({
        key: `${category}-empty`,
        category: label,
        showCategory: true,
        title: EMPTY_COPY[category],
        date: "—",
        readingTime: "—",
      });
      continue;
    }

    notes.forEach((note, index) => {
      rows.push({
        key: note.slug,
        category: label,
        showCategory: index === 0,
        title: note.title,
        href: `/notes/${note.slug}`,
        date: formatTableDate(note.date),
        dateTime: note.date,
        readingTime: note.readingTime || "—",
      });
    });
  }

  return rows;
}

export function NotesIndexPage() {
  const rows = buildRows();

  return (
    <div className="notes-index-page">
      <div className="notes-index-body">
        <NotesIndexNav />

        <main className="notes-index-screen">
          <header className="notes-index-masthead">
            <h1 className="notes-index-word">Notes</h1>
            <div className="notes-index-draw" aria-hidden="true">
              <span className="notes-index-draw-h" />
              <span className="notes-index-draw-v" />
            </div>
            <Link href="/#notes" className="notes-index-cta">
              Back home
              <span aria-hidden>→</span>
            </Link>
          </header>

          <p className="notes-index-lede">
            One notebook. Three ways of thinking.
          </p>
          <p className="notes-index-intro">
            Projects show what was built. Notes show how she thinks — while
            building, while observing, while reflecting. Categories organize
            the shelf. They are not separate products.
          </p>
          <p className="notes-index-aside">A notebook. Not a blog.</p>

          <table className="notes-index-table">
            <caption className="sr-only">All notes</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Note</th>
                <th scope="col">Date</th>
                <th scope="col">Read time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="notes-index-cat">
                    {row.showCategory ? row.category : null}
                  </td>
                  <td className="notes-index-note">
                    {row.href ? (
                      <Link href={row.href}>{row.title}</Link>
                    ) : (
                      <span className="is-empty">{row.title}</span>
                    )}
                  </td>
                  <td className="notes-index-date">
                    {row.dateTime ? (
                      <time dateTime={row.dateTime}>{row.date}</time>
                    ) : (
                      row.date
                    )}
                  </td>
                  <td className="notes-index-time">{row.readingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <footer className="notes-index-bezel">
          <p className="notes-index-contact">
            <a
              href="https://www.linkedin.com/in/paulina-nrv/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a href="https://github.com/paunrv" target="_blank" rel="noopener">
              GitHub
            </a>
            <a href="mailto:phsho007@gmail.com">Email</a>
          </p>
        </footer>

        <span className="notes-index-knob notes-index-knob-l" aria-hidden />
        <span className="notes-index-knob notes-index-knob-r" aria-hidden />
      </div>
    </div>
  );
}
