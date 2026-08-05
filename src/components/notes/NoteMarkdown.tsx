"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Long-form reading styles for Notes and Perspectives.
 * Homepage sections do not use this component.
 *
 * Aim: continuous essay immersion (New Yorker / Stripe Press / Every.to),
 * not sentence-by-sentence visual rhythm.
 */
export function NoteMarkdown({ content }: { content: string }) {
  return (
    <div className="essay">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-title-md font-light text-ink text-balance md:text-title-lg">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 font-display text-2xl font-light text-ink md:mt-14 md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="essay-p mt-[1.15em] text-lg leading-[1.72] text-ink/80 first:mt-0 md:text-xl md:leading-[1.75]">
              {children}
            </p>
          ),
          hr: () => (
            <hr className="my-10 border-0 border-t border-line/80 md:my-12" />
          ),
          ul: ({ children }) => (
            <ul className="mt-[1.15em] list-disc space-y-2 pl-5 text-lg leading-[1.72] text-ink/80 md:text-xl">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-[1.15em] list-decimal space-y-2 pl-5 text-lg leading-[1.72] text-ink/80 md:text-xl">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-medium text-ink">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-ink/90">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="essay-quote mt-8 border-l border-line pl-5 text-lg leading-[1.72] text-ink/70 md:mt-10 md:pl-6 md:text-xl md:leading-[1.75]">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
