import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import LuxButton from "@/components/LuxButton";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import type { Post } from "@/content/blog";
import { getPost, getPosts } from "@/lib/wix/blog";
import { ORG_ID, abs, breadcrumbJsonLd, graph, pageMeta, snippet } from "@/lib/seo";

// New Wix posts render on first visit, then are cached; everything refreshes at most hourly.
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  // Long headlines are used on their own so the important words aren't cut off in search results.
  const long = post.title.length > 40;
  return pageMeta({
    title: post.title,
    absoluteTitle: long,
    description: snippet(post.excerpt),
    path: `/blog/${post.slug}`,
    image: post.cover,
    imageAlt: post.title,
    type: "article",
  });
}

function postJsonLd(post: Post, minutes: number) {
  return graph(
    {
      "@type": "BlogPosting",
      "@id": `${abs(`/blog/${post.slug}`)}#article`,
      headline: post.title.slice(0, 110),
      description: snippet(post.excerpt),
      image: abs(post.cover),
      url: abs(`/blog/${post.slug}`),
      mainEntityOfPage: abs(`/blog/${post.slug}`),
      articleSection: post.category,
      ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
      wordCount: post.body.split(/\s+/).length,
      timeRequired: `PT${minutes}M`,
      inLanguage: "en-US",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    },
    breadcrumbJsonLd([
      ["Journal", "/blog"],
      [post.title, `/blog/${post.slug}`],
    ])
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const minutes = Math.max(1, Math.round(post.body.split(/\s+/).length / 220));

  return (
    <>
      <JsonLd data={postJsonLd(post, minutes)} />
      <article className="silk-weave pt-36 lg:pt-44 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[11px] font-body uppercase tracking-wide-luxe text-obsidian/50 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> The Journal
            </Link>
            <Eyebrow className="mt-8">
              {post.category} · {minutes} min read
              {post.date && (
                <>
                  {" · "}
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </time>
                </>
              )}
            </Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-obsidian mt-6 leading-[1.08]">{post.title}</h1>
          </Reveal>
        </div>
        <Reveal className="mx-auto max-w-5xl px-6 mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            <Image src={post.cover} alt={post.title} fill priority quality={85} sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="mx-auto max-w-3xl px-6 mt-12">
          <Markdown source={post.body} />
          <div className="mt-16 p-8 sm:p-10 bg-obsidian text-silk rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-body uppercase tracking-luxe text-gold">Plan it with us</p>
              <p className="font-display text-3xl mt-2">
                See the venue <span className="italic text-gold">in person.</span>
              </p>
            </div>
            <LuxButton to="/schedule-a-tour" variant="gold" className="flex-shrink-0">
              Schedule a Tour <ArrowRight className="w-4 h-4" />
            </LuxButton>
          </div>
        </div>
      </article>

      <section className="py-24 bg-champagne/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Eyebrow>Keep Reading</Eyebrow>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] font-body uppercase tracking-luxe text-gold mt-5">{p.category}</p>
                <h3 className="font-display text-2xl text-obsidian mt-2 leading-tight group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
