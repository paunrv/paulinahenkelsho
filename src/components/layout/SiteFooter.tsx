export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-gutter text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p className="text-neutral-600">
          © {new Date().getFullYear()} Paulina Henkelsho
        </p>
        <p className="text-neutral-400">Designing clarity in complex systems</p>
      </div>
    </footer>
  );
}
