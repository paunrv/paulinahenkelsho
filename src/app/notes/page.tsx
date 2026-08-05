import type { Metadata } from "next";
import { NotesIndexPage } from "@/components/notes/NotesIndexPage";

export const metadata: Metadata = {
  title: "Notes — Paulina Henkel",
  description:
    "A personal library of observations. Projects show what was built. Notes reveal the thinking behind it.",
};

export default function NotesPage() {
  return <NotesIndexPage />;
}
