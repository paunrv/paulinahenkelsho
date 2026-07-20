"use client";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-gutter text-xs text-subtle">
        <p>© {new Date().getFullYear()} Paulina Henkel</p>
        <p>Mexico</p>
      </div>
    </footer>
  );
}
