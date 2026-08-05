import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PerspectiveListItem } from "@/components/perspectives/PerspectiveListItem";
import { getAllPerspectives } from "@/lib/perspectives";

export function PerspectivesIndexPage() {
  const perspectives = getAllPerspectives();

  return (
    <>
      <SiteHeader />
      <main className="pt-14 md:pt-16">
        <header className="py-section">
          <div className="mx-auto max-w-6xl px-gutter">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              Perspectives
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-title-md font-light text-ink text-balance md:text-title-lg">
              Essays for questions without simple answers.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-muted md:text-xl">
              Lived experience first. Reflection second. Not written to
              convince — written to think.
            </p>
            <p className="mt-8">
              <Link
                href="/"
                className="text-sm font-medium text-ink border-b border-accent/40 pb-0.5 transition-colors hover:border-accent"
              >
                Back home
              </Link>
            </p>
          </div>
        </header>

        <section className="border-t border-line py-section">
          <div className="mx-auto max-w-6xl px-gutter">
            {perspectives.length > 0 ? (
              <ul className="max-w-3xl border-t border-line">
                {perspectives.map((perspective) => (
                  <PerspectiveListItem
                    key={perspective.slug}
                    perspective={perspective}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtle">
                Nothing published here yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
