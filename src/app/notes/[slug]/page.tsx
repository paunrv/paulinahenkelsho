import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteArticlePage } from "@/components/notes/NoteArticlePage";
import { getNoteBySlug, getNoteSlugs } from "@/lib/notes";

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

  return {
    title: `${note.title} — Notes — Paulina Henkel`,
    description: note.subtitle || note.title,
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return <NoteArticlePage note={note} />;
}
