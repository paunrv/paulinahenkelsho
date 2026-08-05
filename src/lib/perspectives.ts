import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PerspectiveFrontmatter = {
  title: string;
  subtitle: string;
  category: "Perspectives";
  date: string;
  readingTime: string;
  featured: boolean;
  published: boolean;
  language: "en" | "es";
  tags: string[];
};

export type PerspectiveMeta = PerspectiveFrontmatter & {
  slug: string;
};

export type Perspective = PerspectiveMeta & {
  content: string;
};

const PERSPECTIVES_DIR = path.join(process.cwd(), "content/perspectives");

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string
): PerspectiveFrontmatter {
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  if (data.category !== "Perspectives") {
    throw new Error(`Invalid category in perspective "${slug}"`);
  }

  const language = data.language === "es" ? "es" : "en";

  return {
    title: String(data.title ?? ""),
    subtitle: String(data.subtitle ?? ""),
    category: "Perspectives",
    date: String(data.date ?? ""),
    readingTime: String(data.readingTime ?? ""),
    featured: Boolean(data.featured),
    published: data.published !== false,
    language,
    tags,
  };
}

function readPerspectiveFile(filename: string): Perspective {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(PERSPECTIVES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    content: content.trim(),
  };
}

export function getAllPerspectives(): PerspectiveMeta[] {
  if (!fs.existsSync(PERSPECTIVES_DIR)) return [];

  return fs
    .readdirSync(PERSPECTIVES_DIR)
    .filter(
      (file) =>
        file.endsWith(".md") &&
        !file.startsWith("_") &&
        file.toLowerCase() !== "readme.md"
    )
    .map((file) => {
      const perspective = readPerspectiveFile(file);
      const { content: _content, ...meta } = perspective;
      return meta;
    })
    .filter((perspective) => perspective.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPerspectives(): PerspectiveMeta[] {
  return getAllPerspectives().filter((perspective) => perspective.featured);
}

export function getPerspectiveBySlug(slug: string): Perspective | null {
  const filename = `${slug}.md`;
  const filepath = path.join(PERSPECTIVES_DIR, filename);
  if (!fs.existsSync(filepath)) return null;

  const perspective = readPerspectiveFile(filename);
  if (!perspective.published) return null;
  return perspective;
}

export function getPerspectiveSlugs(): string[] {
  return getAllPerspectives().map((perspective) => perspective.slug);
}

export function formatPerspectiveDate(date: string, locale: string = "en") {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}
