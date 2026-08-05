export type NoteCategory = "Building" | "Field Notes" | "Perspectives";

export const NOTE_CATEGORIES: NoteCategory[] = [
  "Building",
  "Field Notes",
  "Perspectives",
];

/** Subtle equal labels — never elevates one category over another. */
export function formatCategoryLabel(category: NoteCategory): string {
  switch (category) {
    case "Building":
      return "Building";
    case "Field Notes":
      return "Field Note";
    case "Perspectives":
      return "Perspective";
  }
}

export function isNoteCategory(value: unknown): value is NoteCategory {
  return (
    value === "Building" ||
    value === "Field Notes" ||
    value === "Perspectives"
  );
}
