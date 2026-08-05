import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";
import { getAllPerspectives } from "@/lib/perspectives";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pauhenkelsho.com";
  const notes = getAllNotes().map((note) => ({
    url: `${base}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const perspectives = getAllPerspectives().map((perspective) => ({
    url: `${base}/perspectives/${perspective.slug}`,
    lastModified: new Date(perspective.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/notes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    {
      url: `${base}/perspectives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...notes,
    ...perspectives,
  ];
}
