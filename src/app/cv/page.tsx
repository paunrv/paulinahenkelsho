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
    <section className="border-t border-neutral-200/60 py-10 md:py-14 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h2 className="font-display text-xl font-normal tracking-[-0.02em] text-neutral-950 md:text-2xl dark:text-neutral-50">
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
    <main className="pt-20 md:pt-24">
      <header className="border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-gutter py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                {t.cv.title}
              </p>
              <h1 className="mt-5 font-display text-4xl font-normal tracking-[-0.03em] text-neutral-950 md:text-5xl dark:text-neutral-50">
                Paulina Henkel
              </h1>
              <p className="mt-4 text-base leading-[1.7] text-neutral-500 md:text-lg dark:text-neutral-400">
                {t.cv.role}
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-400 md:flex-row md:items-center md:gap-4 dark:text-neutral-500">
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
                className="inline-flex items-center justify-center rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                {t.cv.actions.download}
              </a>
              <a
                href="mailto:phsho007@gmail.com"
                className="inline-flex items-center justify-center rounded-md border border-neutral-200/60 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-100 dark:border-neutral-800/60 dark:text-neutral-50 dark:hover:bg-neutral-900"
              >
                {t.cv.actions.email}
              </a>
              <a
                href="https://www.linkedin.com/in/paulina-nrv/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-md border border-neutral-200/60 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-100 dark:border-neutral-800/60 dark:text-neutral-50 dark:hover:bg-neutral-900"
              >
                {t.cv.actions.linkedin}
              </a>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-600">
            <Link href="/" className="transition hover:text-neutral-600 dark:hover:text-neutral-400">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <Section title={t.cv.sections.summary}>
        <p className="text-base leading-[1.75] text-neutral-600 md:text-lg dark:text-neutral-400">
          {t.cv.summary}
        </p>
      </Section>

      <Section title={t.cv.sections.skills}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.cv.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-neutral-200/60 px-3 py-2 text-sm text-neutral-600 dark:border-neutral-800/60 dark:text-neutral-400"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.cv.sections.aiProducts}>
        <div className="space-y-10">
          {t.cv.aiProducts.map((product) => (
            <div key={product.title} className="border-l border-neutral-200/60 pl-6 dark:border-neutral-800/60">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                  {product.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-400 dark:text-neutral-600">
                  {product.period ? <span>{product.period}</span> : null}
                  {product.status ? (
                    <span className="inline-flex items-center rounded-full border border-neutral-200/80 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                      {product.status}
                    </span>
                  ) : null}
                </div>
                {product.url ? (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener"
                    className="w-fit text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-950 dark:text-neutral-50 dark:decoration-neutral-700 dark:hover:decoration-neutral-50"
                  >
                    {product.urlLabel || product.url}
                    <span className="ml-1 text-neutral-400 dark:text-neutral-600" aria-hidden>
                      ↗
                    </span>
                  </a>
                ) : null}
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400">
                {product.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700"
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

      <Section title={t.cv.sections.experience}>
        <div className="space-y-10">
          {t.cv.experience.map((role) => (
            <div key={role.title} className="border-l border-neutral-200/60 pl-6 dark:border-neutral-800/60">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                  {role.title}
                </h3>
                {role.period ? (
                  <p className="text-sm text-neutral-400 dark:text-neutral-600">{role.period}</p>
                ) : null}
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400">
                {role.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700"
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
              <h3 className="font-display text-2xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                {p.title}
              </h3>
              <ul className="mt-5 space-y-2 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400">
                {p.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700"
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
              className="rounded-lg border border-neutral-200/60 bg-neutral-50/50 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-neutral-950 dark:text-neutral-50">{e.title}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{e.detail}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-600">{e.period}</p>
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
              className="rounded-full border border-neutral-200/60 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800/60 dark:text-neutral-400"
            >
              {f}
            </span>
          ))}
        </div>
      </Section>
    </main>
  );
}
