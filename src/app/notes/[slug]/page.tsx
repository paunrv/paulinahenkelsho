import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteArticlePage } from "@/components/notes/NoteArticlePage";
import {
  getNoteBySlug,
  getNoteSlugs,
  noteExcerpt,
} from "@/lib/notes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note — Paulina Henkel" };

  const description = noteExcerpt(note.content, note.title);
  const path = `/notes/${note.slug}`;

  return {
    title: `${note.title} — Paulina Henkel`,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: note.title,
      description,
      type: "article",
      url: path,
      siteName: "Paulina Henkel",
      locale: note.language === "es" ? "es_MX" : "en_US",
      publishedTime: note.date,
      authors: ["Paulina Henkel"],
    },
    twitter: {
      card: "summary",
      title: note.title,
      description,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return <NoteArticlePage note={note} />;
}
