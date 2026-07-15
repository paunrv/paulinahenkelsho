"use client";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/60 py-8 dark:border-neutral-800/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-gutter text-xs text-neutral-400 dark:text-neutral-600">
        <p>© {new Date().getFullYear()} Paulina Henkel</p>
        <p>Mexico</p>
      </div>
    </footer>
  );
}
