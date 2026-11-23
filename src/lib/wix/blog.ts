import "server-only";
import { posts as localPosts, type Post } from "@/content/blog";
import { cleanLink } from "@/lib/links";

/* ----------------------------------------------------------------------------
 * The Journal's data source.
 *
 * When WIX_API_KEY and WIX_SITE_ID are set, posts are read live from Wix Blog, so anything
 * published, edited or deleted in the Wix dashboard shows up on this site:
 *   - automatically within REVALIDATE_SECONDS (pages are cached and refreshed in the background), or
 *   - instantly when Wix calls /api/revalidate (see README → "Blog").
 * If Wix isn't configured, is switched off (WIX_BLOG=off) or can't be reached, the copies in
 * src/content/blog.ts are used so the Journal never goes blank.
 * ------------------------------------------------------------------------- */

export const BLOG_TAG = "wix-blog";
export const REVALIDATE_SECONDS = 3600;

const enabled = () => process.env.WIX_BLOG !== "off" && Boolean(process.env.WIX_API_KEY && process.env.WIX_SITE_ID);

async function wix<T>(path: string): Promise<T> {
  const res = await fetch(`https://www.wixapis.com${path}`, {
    headers: { Authorization: process.env.WIX_API_KEY!, "wix-site-id": process.env.WIX_SITE_ID! },
    next: { revalidate: REVALIDATE_SECONDS, tags: [BLOG_TAG] },
  });
  if (!res.ok) throw new Error(`Wix ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json() as Promise<T>;
}

/* ------------------------------ Wix types ------------------------------- */

type WixNode = {
  type: string;
  nodes?: WixNode[];
  textData?: { text: string; decorations?: { type: string; fontWeightValue?: number; linkData?: { link?: { url?: string } } }[] };
  headingData?: { level?: number };
  imageData?: { image?: { src?: { id?: string; url?: string } }; altText?: string; caption?: string };
  galleryData?: { items?: { image?: { media?: { src?: { id?: string; url?: string } } }; altText?: string; title?: string }[] };
};
type WixPost = {
  slug: string;
  title: string;
  excerpt?: string;
  firstPublishedDate?: string;
  categoryIds?: string[];
  media?: { wixMedia?: { image?: { id?: string; url?: string } }; embedMedia?: { thumbnail?: { url?: string } } };
  richContent?: { nodes?: WixNode[] };
};

/* ------------------------- Rich content → markdown ------------------------ */

/**
 * Wix keeps the uploaded originals (often 2–5 MB PNGs). Asking Wix's image service for a
 * 1920px JPEG first keeps the download small and makes our image optimisation near-instant.
 */
const sized = (url?: string) => {
  const m = url?.match(/^https:\/\/static\.wixstatic\.com\/media\/([^/?#]+)$/);
  return m ? `https://static.wixstatic.com/media/${m[1]}/v1/fit/w_1920,h_1920,q_90/file.jpg` : url;
};

const mediaUrl = (src?: { id?: string; url?: string }) =>
  sized(src?.url?.startsWith("http") ? src.url : src?.id ? `https://static.wixstatic.com/media/${src.id}` : undefined);


function text(nodes: WixNode[] = []): string {
  return nodes
    .map((n) => {
      if (n.type !== "TEXT" || !n.textData) return text(n.nodes);
      let t = n.textData.text;
      if (!t.trim()) return t;
      const lead = t.match(/^\s*/)![0];
      const trail = t.match(/\s*$/)![0];
      t = t.trim();
      for (const d of n.textData.decorations ?? []) {
        if (d.type === "BOLD" && (d.fontWeightValue ?? 700) >= 600) t = `**${t}**`;
        else if (d.type === "ITALIC") t = `_${t}_`;
        else if (d.type === "LINK" && d.linkData?.link?.url) {
          const href = cleanLink(d.linkData.link.url);
          if (href) t = `[${t}](${href.replace(/\(/g, "%28").replace(/\)/g, "%29")})`;
        }
      }
      return lead + t + trail;
    })
    .join("")
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Wix authors often bold whole paragraphs: short ones become subheadings, long ones plain text. */
function paragraph(t: string) {
  const plain = t.replace(/\*\*/g, "").trim();
  const bold = (t.match(/\*\*[^*]+\*\*/g) ?? []).join("").replace(/\*\*/g, "").length / Math.max(1, plain.length);
  if (bold > 0.8 && plain.length <= 90 && !/[.!?:]\)?$/.test(plain)) return `### ${plain}`;
  return bold > 0.8 ? plain : t;
}

function toMarkdown(nodes: WixNode[] = []): string[] {
  const out: string[] = [];
  for (const n of nodes) {
    switch (n.type) {
      case "PARAGRAPH": {
        const t = text(n.nodes);
        if (t) out.push(paragraph(t));
        break;
      }
      case "HEADING": {
        const t = text(n.nodes).replace(/\*\*/g, "");
        if (t) out.push(`${(n.headingData?.level ?? 2) <= 2 ? "##" : "###"} ${t}`);
        break;
      }
      case "BULLETED_LIST":
      case "ORDERED_LIST":
        (n.nodes ?? []).forEach((li, i) => {
          const t = text(li.nodes);
          if (t) out.push(`- ${n.type === "ORDERED_LIST" && !/^\d/.test(t) ? `${i + 1}. ` : ""}${t}`);
        });
        break;
      case "BLOCKQUOTE": {
        const t = text(n.nodes);
        if (t) out.push(`> ${t}`);
        break;
      }
      case "IMAGE": {
        const src = mediaUrl(n.imageData?.image?.src);
        if (src) {
          out.push(`![${(n.imageData?.altText ?? "").replace(/[[\]]/g, "")}](${src})`);
          if (n.imageData?.caption) out.push(`_${n.imageData.caption}_`);
        }
        break;
      }
      case "GALLERY":
        for (const item of n.galleryData?.items ?? []) {
          const src = mediaUrl(item.image?.media?.src);
          if (src) out.push(`![${(item.altText ?? item.title ?? "").replace(/[[\]]/g, "")}](${src})`);
        }
        break;
      default:
        // Containers (e.g. collapsible lists, tables) – keep their text content.
        if (n.nodes?.length) out.push(...toMarkdown(n.nodes));
    }
  }
  return out;
}

const guessCategory = (t: string) =>
  /corporate|business/i.test(t) ? "Corporate Events" : /cater|dessert|menu/i.test(t) ? "Catering" : /wedding|bride/i.test(t) ? "Weddings" : /graduat|party|birthday/i.test(t) ? "Celebrations" : "Venue Guide";

const cleanExcerpt = (s = "") => {
  s = s.replace(/\s+/g, " ").replace(/\s+([.,!?])/g, "$1").replace(/\.\.\.$/, "").trim();
  return s.length <= 220 ? s : `${s.slice(0, s.lastIndexOf(" ", 215))}…`;
};

function toPost(p: WixPost, categories: Map<string, string>): Post {
  const body = toMarkdown(p.richContent?.nodes).join("\n\n");
  const firstImage = body.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1];
  const category = p.categoryIds?.map((id) => categories.get(id)).find(Boolean) ?? guessCategory(p.title);
  return {
    slug: p.slug,
    title: p.title.trim().replace(/\s*\.$/, "").replace(/\s*–\s*/g, ": "),
    category,
    cover: sized(p.media?.wixMedia?.image?.url) ?? p.media?.embedMedia?.thumbnail?.url ?? firstImage ?? "/og/default.jpg",
    date: p.firstPublishedDate,
    excerpt: cleanExcerpt(p.excerpt),
    body,
  };
}

/* -------------------------------- Public API ------------------------------- */

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  if (!enabled()) return localPosts;
  try {
    const [cats, ...pages] = await Promise.all([
      wix<{ categories?: { id: string; label: string }[] }>("/blog/v3/categories?paging.limit=100"),
      wix<{ posts?: WixPost[]; metaData?: { total?: number } }>("/blog/v3/posts?paging.limit=100&sort=PUBLISHED_DATE_DESC&fieldsets=RICH_CONTENT"),
    ]);
    let all = pages[0].posts ?? [];
    // Fetch further pages if the blog ever grows past 100 posts.
    for (let offset = 100; offset < (pages[0].metaData?.total ?? 0); offset += 100) {
      const next = await wix<{ posts?: WixPost[] }>(`/blog/v3/posts?paging.limit=100&paging.offset=${offset}&sort=PUBLISHED_DATE_DESC&fieldsets=RICH_CONTENT`);
      all = all.concat(next.posts ?? []);
    }
    if (!all.length) return localPosts;
    const categories = new Map((cats.categories ?? []).map((c) => [c.id, c.label]));
    return all.map((p) => toPost(p, categories));
  } catch (err) {
    console.error("[blog] Falling back to local posts:", err instanceof Error ? err.message : err);
    return localPosts;
  }
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}
