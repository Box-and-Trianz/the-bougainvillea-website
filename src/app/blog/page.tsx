import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/wix/blog";
import { storyImage } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Wedding & Event Planning Blog",
  description:
    "Wedding ideas, corporate event tips, catering inspiration and Houston venue guides from the planning team at The Bougainvilleas in West Houston.",
  path: "/blog",
  image: storyImage,
});

// Refreshes from Wix Blog in the background at most once an hour (or instantly via /api/revalidate).
export const revalidate = 3600;

const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "");

export default async function BlogPage() {
  const [featured, ...rest] = await getPosts();
  return (
    <>
      <PageHero image={storyImage} alt="Event planning at The Bougainvilleas in Houston" eyebrow="Ideas · Inspiration · Advice" title="The Journal" />

      <section className="silk-weave py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-7 relative aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5">
                <Eyebrow>
                  Latest · {featured.category}
                  {featured.date && <> · <time dateTime={featured.date}>{fmt(featured.date)}</time></>}
                </Eyebrow>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-obsidian mt-6 leading-[1.1] group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="font-body text-base text-obsidian/60 mt-6 leading-relaxed">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 mt-8 text-[11px] font-body font-semibold uppercase tracking-wide-luxe text-gold">
                  Read the Story <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-obsidian/10">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.1}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] font-body uppercase tracking-luxe text-gold mt-6">
                    {p.category}
                    {p.date && <span className="text-obsidian/40"> · <time dateTime={p.date}>{fmt(p.date)}</time></span>}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl text-obsidian mt-3 leading-tight group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-obsidian/60 mt-4 leading-relaxed line-clamp-3">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
