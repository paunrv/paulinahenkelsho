import type { Metadata } from "next";
import { NotesIndexPage } from "@/components/notes/NotesIndexPage";

export const metadata: Metadata = {
  title: "Notes — Paulina Henkel",
  description:
    "A notebook of ideas, observations, and product thinking. Building notes and field notes.",
};

export default function NotesPage() {
  return <NotesIndexPage />;
}
