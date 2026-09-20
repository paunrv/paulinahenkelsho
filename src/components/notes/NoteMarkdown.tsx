import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function childText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(childText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    return childText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return "";
}

function headingId(children: ReactNode) {
  return childText(children)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Long-form reading styles for Notes.
 * Homepage sections do not use this component.
 *
 * Aim: continuous essay immersion — magazine / printed essay,
 * not sentence-by-sentence visual rhythm.
 */
export function NoteMarkdown({ content }: { content: string }) {
  return (
    <div className="essay">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = headingId(children);
            return (
              <h2 id={id || undefined} className="note-article-h2">
                {children}
              </h2>
            );
          },
          h2: ({ children }) => {
            const id = headingId(children);
            return (
              <h2 id={id || undefined} className="note-article-h2">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="note-article-h3">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="essay-p note-article-p">{children}</p>
          ),
          hr: () => <hr className="note-article-rule" />,
          ul: ({ children }) => (
            <ul className="note-article-list">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="note-article-list is-ordered">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          a: ({ href, children }) => (
            <a href={href} className="note-article-inline-link">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="essay-quote note-article-quote">
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
