import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  isNoteCategory,
  type NoteCategory,
} from "@/lib/note-categories";

export type {
  NoteCategory,
} from "@/lib/note-categories";

export {
  NOTE_CATEGORIES,
  formatCategoryLabel,
  isNoteCategory,
} from "@/lib/note-categories";

export type NoteFrontmatter = {
  title: string;
  subtitle: string;
  category: NoteCategory;
  date: string;
  readingTime: string;
  featured: boolean;
  published: boolean;
  language: "en" | "es";
  tags: string[];
};

export type NoteMeta = NoteFrontmatter & {
  slug: string;
};

export type Note = NoteMeta & {
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), "content/notes");

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string
): NoteFrontmatter {
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  if (!isNoteCategory(data.category)) {
    throw new Error(`Invalid category in note "${slug}"`);
  }

  const language = data.language === "es" ? "es" : "en";

  return {
    title: String(data.title ?? ""),
    subtitle: String(data.subtitle ?? ""),
    category: data.category,
    date: String(data.date ?? ""),
    readingTime: String(data.readingTime ?? ""),
    featured: Boolean(data.featured),
    published: data.published !== false,
    language,
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function splitNoteBody(
  content: string,
  title: string
): { body: string; location?: string } {
  let body = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trim();
  body = body.replace(new RegExp(`^#\\s+${escapeRegExp(title)}\\s*\\n+`, "u"), "");

  const locationMatch = body.match(/^\*([^*]+)\*\s*\n+/);
  let location: string | undefined;
  if (locationMatch) {
    location = locationMatch[1].trim();
    body = body.slice(locationMatch[0].length);
  }

  body = body.replace(/^# /gm, "## ");
  return { body, location };
}

export function noteExcerpt(content: string, title: string): string {
  const { body } = splitNoteBody(content, title);
  const blocks = body.split(/\n{2,}/);

  for (const block of blocks) {
    const line = block.trim();
    if (
      !line ||
      line === "---" ||
      line.startsWith("#") ||
      line.startsWith(">") ||
      line.startsWith("|")
    ) {
      continue;
    }

    const text = line
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    if (text.length < 24) continue;
    if (text.length <= 158) return text;

    const cut = text.slice(0, 157);
    const space = cut.lastIndexOf(" ");
    return `${(space > 80 ? cut.slice(0, space) : cut).trim()}…`;
  }

  return title;
}

export function getAdjacentNotes(slug: string): {
  older: NoteMeta | null;
  newer: NoteMeta | null;
} {
  const notes = getAllNotes();
  const index = notes.findIndex((note) => note.slug === slug);
  if (index < 0) return { older: null, newer: null };

  return {
    newer: index > 0 ? notes[index - 1] : null,
    older: index < notes.length - 1 ? notes[index + 1] : null,
  };
}
