export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/90 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-gutter text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
        <p className="text-neutral-400">
          Evolved from HTML5 UP &quot;Aerial&quot; — rebuilt for clarity.
        </p>
      </div>
    </footer>
  );
}
