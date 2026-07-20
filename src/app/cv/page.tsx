"use client";

import Link from "next/link";
import { useT } from "@/i18n/i18n";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h2 className="font-display text-xl font-light tracking-[-0.02em] text-ink md:text-2xl">
              {title}
            </h2>
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function CvPage() {
  const t = useT();

  return (
    <main className="bg-page pt-20 md:pt-24">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-gutter py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
                {t.cv.title}
              </p>
              <h1 className="mt-5 font-display text-4xl font-light tracking-[-0.03em] text-ink md:text-5xl">
                Paulina Henkel
              </h1>
              <p className="mt-4 text-base leading-[1.7] text-muted md:text-lg">
                {t.cv.role}
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-subtle md:flex-row md:items-center md:gap-4">
                <span>{t.cv.location}</span>
                <span className="hidden opacity-50 md:inline" aria-hidden>
                  ·
                </span>
                <span>{t.cv.languages}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/paulina-nrv-cv.pdf"
                download="paulina-nrv-cv.pdf"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-surface bg-ink px-4 py-2 text-sm font-medium text-surface transition hover:bg-ink/90"
              >
                {t.cv.actions.download}
              </a>
              <a
                href="mailto:phsho007@gmail.com"
                className="inline-flex items-center justify-center rounded-surface border border-line bg-surface px-4 py-2 text-sm font-medium text-ink shadow-soft transition hover:border-accent/40"
              >
                {t.cv.actions.email}
              </a>
              <a
                href="https://www.linkedin.com/in/paulina-nrv/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-surface border border-line bg-surface px-4 py-2 text-sm font-medium text-ink shadow-soft transition hover:border-accent/40"
              >
                {t.cv.actions.linkedin}
              </a>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-subtle">
            <Link href="/" className="transition hover:text-accent">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <Section title={t.cv.sections.summary}>
        <p className="text-base leading-[1.75] text-muted md:text-lg">
          {t.cv.summary}
        </p>
      </Section>

      <Section title={t.cv.sections.skills}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.cv.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-surface border border-line bg-surface px-3 py-2 text-sm text-muted shadow-soft"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.cv.sections.aiProducts}>
        <div className="space-y-10">
          {t.cv.aiProducts.map((product) => {
            const href = String(product.url || "");
            const linkLabel = String(product.urlLabel || href);

            return (
              <div key={product.title} className="border-l border-lavender/50 pl-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-ink">
                    {product.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtle">
                    {product.period ? <span>{product.period}</span> : null}
                    {product.status ? (
                      <span className="inline-flex items-center rounded-full border border-lavender/40 bg-lavender-soft px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-lavender">
                        {product.status}
                      </span>
                    ) : null}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="w-fit text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
                    >
                      {linkLabel}
                      <span className="ml-1 text-lavender" aria-hidden>
                        ↗
                      </span>
                    </a>
                  ) : null}
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-muted">
                  {product.bullets.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span
                        className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title={t.cv.sections.experience}>
        <div className="space-y-10">
          {t.cv.experience.map((role) => (
            <div key={role.title} className="border-l border-line pl-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-ink">
                  {role.title}
                </h3>
                {role.period ? (
                  <p className="text-sm text-subtle">{role.period}</p>
                ) : null}
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-muted">
                {role.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent/70"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.cv.sections.projects}>
        <div className="space-y-10">
          {t.cv.projects.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-ink">
                {p.title}
              </h3>
              <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-muted">
                {p.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent/70"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.cv.sections.education}>
        <div className="space-y-6">
          {t.cv.education.map((e) => (
            <div
              key={e.title}
              className="rounded-surface border border-line bg-surface p-6 shadow-soft"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-ink">{e.title}</p>
                <p className="text-sm text-muted">{e.detail}</p>
                <p className="text-xs text-subtle">{e.period}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.cv.sections.focus}>
        <div className="flex flex-wrap gap-2">
          {t.cv.focus.map((f) => (
            <span
              key={f}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted shadow-soft"
            >
              {f}
            </span>
          ))}
        </div>
      </Section>
    </main>
  );
}
