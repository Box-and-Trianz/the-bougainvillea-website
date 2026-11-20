import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|(?<![\w*])_[^_]+_(?![\w]))/g;

/** Inline formatting: **bold**, _italic_ and [links](url). Internal links use client-side navigation. */
function inline(text: string): React.ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-obsidian">
          {inline(part.slice(2, -2))}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "text-obsidian underline decoration-gold/60 underline-offset-4 hover:text-gold transition-colors";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={cls}>
          {inline(label)}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inline(label)}
        </a>
      );
    }
    if (/^_[^_]+_$/.test(part)) return <em key={i}>{inline(part.slice(1, -1))}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Small Markdown renderer for blog posts: ##/### headings, - lists, ![img](src) with an optional
 * _caption_ line after it, > quotes and paragraphs with inline formatting. Images may be local
 * (/images/...) or from Wix (static.wixstatic.com).
 */
export default function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let lastWasImage = false;
  const flush = () => {
    if (!list.length) return;
    out.push(
      <ul key={`ul-${out.length}`} className="my-8 space-y-4 border-l border-gold/40 pl-6">
        {list.map((li, j) => (
          <li key={j} className="relative font-body text-base text-obsidian/75 leading-relaxed">
            <span className="absolute -left-[27px] top-2.5 w-1.5 h-1.5 rounded-full bg-gold" />
            {inline(li)}
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  blocks.forEach((b, i) => {
    if (b.startsWith("- ")) {
      list.push(b.slice(2));
      lastWasImage = false;
      return;
    }
    flush();
    const img = b.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      out.push(
        <div key={i} className="relative my-10 aspect-[4/3] overflow-hidden rounded-sm bg-champagne/40">
          <Image src={img[2]} alt={img[1] || "Event at The Bougainvilleas, Houston"} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
      );
      lastWasImage = true;
      return;
    }
    if (lastWasImage && /^_[^_]+_$/.test(b)) {
      out.push(
        <p key={i} className="-mt-6 mb-10 text-center text-[11px] font-body uppercase tracking-wide-luxe text-obsidian/40">
          {b.slice(1, -1)}
        </p>
      );
    } else if (b.startsWith("### ")) {
      out.push(
        <h3 key={i} className="font-display text-2xl sm:text-3xl text-obsidian mt-10 mb-4">
          {inline(b.slice(4))}
        </h3>
      );
    } else if (b.startsWith("## ")) {
      out.push(
        <h2 key={i} className="font-display text-3xl sm:text-4xl text-obsidian mt-14 mb-5 leading-tight">
          {inline(b.slice(3))}
        </h2>
      );
    } else if (b.startsWith("> ")) {
      out.push(
        <blockquote key={i} className="my-10 border-l-2 border-gold pl-6 font-display text-2xl italic text-obsidian/80 leading-snug">
          {inline(b.slice(2))}
        </blockquote>
      );
    } else {
      out.push(
        <p key={i} className="font-body text-base sm:text-[17px] text-obsidian/75 leading-[1.85] my-5">
          {inline(b)}
        </p>
      );
    }
    lastWasImage = false;
  });
  flush();
  return <>{out}</>;
}
