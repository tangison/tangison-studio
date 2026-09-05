/**
 * Minimal markdown renderer for article bodies.
 *
 * Supported subset (everything the content pipeline emits):
 *   ## Heading          -> h2
 *   ### Heading         -> h3
 *   - item              -> ul/li (items may start with **bold** leads)
 *   paragraphs          -> p
 *   **bold**            -> strong
 *   *italic*            -> em
 *   [text](href)        -> next/link (internal) or a (external)
 *
 * Deliberately no markdown dependency: the output is fully controlled and
 * the page-transfer budget stays untouched.
 */
import type { ReactNode } from "react";
import Link from "next/link";

const INLINE_RE =
  /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(INLINE_RE).filter((p) => p !== undefined && p !== "");
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={key} href={href} className="link-underline">
            {label}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          {label}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

export function renderMarkdown(src: string): ReactNode[] {
  const lines = src.split("\n");
  const out: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let k = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) out.push(<p key={`p-${k++}`}>{renderInline(text, `p${k}`)}</p>);
    para = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    out.push(
      <ul key={`ul-${k++}`} className="article-list">
        {list.map((item, i) => (
          <li key={i}>{renderInline(item, `li${k}-${i}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      out.push(
        <h2 key={`h2-${k++}`} className="h2 mt-16 mb-6">
          {renderInline(line.slice(3).trim(), `h2-${k}`)}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      out.push(
        <h3 key={`h3-${k++}`} className="h3 mt-12 mb-4">
          {renderInline(line.slice(4).trim(), `h3-${k}`)}
        </h3>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2).trim());
      continue;
    }
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    para.push(line.trim());
  }
  flushPara();
  flushList();
  return out;
}
