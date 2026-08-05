import Link from "next/link";
import type { PerspectiveMeta } from "@/lib/perspectives";
import { formatPerspectiveDate } from "@/lib/perspectives";

export function PerspectiveListItem({
  perspective,
}: {
  perspective: PerspectiveMeta;
}) {
  return (
    <li className="border-b border-line">
      <Link
        href={`/perspectives/${perspective.slug}`}
        className="group block py-7 transition-colors md:py-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="font-display text-xl font-light text-ink transition-colors group-hover:text-accent md:text-2xl">
              {perspective.title}
            </p>
            {perspective.subtitle ? (
              <p className="mt-2 text-sm leading-[1.5] text-muted">
                {perspective.subtitle}
              </p>
            ) : null}
          </div>
          <div className="shrink-0 text-xs text-subtle sm:text-right">
            <p>
              {formatPerspectiveDate(perspective.date, perspective.language)}
            </p>
            {perspective.readingTime ? (
              <p className="mt-1">{perspective.readingTime}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
