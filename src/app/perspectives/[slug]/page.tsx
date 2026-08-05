import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PerspectiveArticlePage } from "@/components/perspectives/PerspectiveArticlePage";
import {
  getPerspectiveBySlug,
  getPerspectiveSlugs,
} from "@/lib/perspectives";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPerspectiveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);
  if (!perspective) return { title: "Perspective — Paulina Henkel" };

  return {
    title: `${perspective.title} — Perspectives — Paulina Henkel`,
    description: perspective.subtitle || perspective.title,
  };
}

export default async function PerspectivePage({ params }: Props) {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);
  if (!perspective) notFound();

  return <PerspectiveArticlePage perspective={perspective} />;
}
