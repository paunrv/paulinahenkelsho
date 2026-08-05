import type { Metadata } from "next";
import { PerspectivesIndexPage } from "@/components/perspectives/PerspectivesIndexPage";

export const metadata: Metadata = {
  title: "Perspectives — Paulina Henkel",
  description:
    "Essays for questions without simple answers. Lived experience first. Reflection second.",
};

export default function PerspectivesPage() {
  return <PerspectivesIndexPage />;
}
