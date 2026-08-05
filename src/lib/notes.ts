import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NoteCategory = "Building" | "Field Notes";

export type NoteFrontmatter = {
  title: string;
  subtitle: string;
  category: NoteCategory;
  date: string;
  readingTime: string;
  featured: boolean;
  published: boolean;
  tags: string[];
};

export type NoteMeta = NoteFrontmatter & {
  slug: string;
};

export type Note = NoteMeta & {
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), "content/notes");

function isCategory(value: unknown): value is NoteCategory {
  return value === "Building" || value === "Field Notes";
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string
): NoteFrontmatter {
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  if (!isCategory(data.category)) {
    throw new Error(`Invalid category in note "${slug}"`);
  }

  return {
    title: String(data.title ?? ""),
    subtitle: String(data.subtitle ?? ""),
    category: data.category,
    date: String(data.date ?? ""),
    readingTime: String(data.readingTime ?? ""),
    featured: Boolean(data.featured),
    published: data.published !== false,
    tags,
  };
}

function readNoteFile(filename: string): Note {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    content: content.trim(),
  };
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return fs
    .readdirSync(NOTES_DIR)
    .filter(
      (file) =>
        file.endsWith(".md") &&
        !file.startsWith("_") &&
        file.toLowerCase() !== "readme.md"
    )
    .map((file) => {
      const note = readNoteFile(file);
      const { content: _content, ...meta } = note;
      return meta;
    })
    .filter((note) => note.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedNotes(): NoteMeta[] {
  return getAllNotes().filter((note) => note.featured);
}

export function getNotesByCategory(category: NoteCategory): NoteMeta[] {
  return getAllNotes().filter((note) => note.category === category);
}

export function getNoteBySlug(slug: string): Note | null {
  const filename = `${slug}.md`;
  const filepath = path.join(NOTES_DIR, filename);
  if (!fs.existsSync(filepath)) return null;

  const note = readNoteFile(filename);
  if (!note.published) return null;
  return note;
}

export function getNoteSlugs(): string[] {
  return getAllNotes().map((note) => note.slug);
}

export function formatNoteDate(date: string, locale: string = "en") {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}
