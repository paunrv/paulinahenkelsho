"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function NoteMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-display text-title-md font-light text-ink text-balance md:text-title-lg">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-16 font-display text-2xl font-light text-ink md:mt-20 md:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-12 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-6 text-lg leading-[1.75] text-muted first:mt-0 md:mt-7 md:text-xl md:leading-[1.7]">
            {children}
          </p>
        ),
        hr: () => <hr className="my-14 border-0 border-t border-line md:my-16" />,
        ul: ({ children }) => (
          <ul className="mt-6 list-disc space-y-3 pl-5 text-lg leading-[1.75] text-muted md:text-xl">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-lg leading-[1.75] text-muted md:text-xl">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-medium text-ink">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-ink/90">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="mt-8 border-l border-line pl-6 text-lg leading-[1.75] text-subtle md:mt-10 md:text-xl">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
