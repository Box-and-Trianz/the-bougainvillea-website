import type { MetadataRoute } from "next";
import { venues } from "@/lib/data";
import { abs } from "@/lib/seo";
import { getPosts } from "@/lib/wix/blog";

export const revalidate = 3600;

/** /sitemap.xml: every indexable page, with the images on it so they can show in image search. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", images: string[] = []) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
    images: images.map(abs),
  });

  return [
    page("/", 1, "weekly", ["/og/default.jpg", "/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"]),
    page("/gallery", 0.9, "monthly", venues.map((v) => v.image)),
    ...venues.map((v) => page(`/${v.slug}`, 0.9, "monthly", [v.image, ...v.gallery.slice(0, 8)])),
    page("/packages", 0.9, "monthly", ["/images/hero/hero-3.jpg"]),
    page("/business-events", 0.9, "monthly", ["/images/corporate/hero.jpg"]),
    page("/catering", 0.8, "monthly", ["/images/catering/plated-dinner.jpg"]),
    page("/schedule-a-tour", 0.8, "yearly"),
    page("/contact", 0.8, "yearly"),
    page("/testimonials", 0.7, "monthly"),
    page("/faq", 0.7, "monthly"),
    page("/our-family", 0.6, "yearly", ["/images/our-family/front-entrance.jpg"]),
    page("/blog", 0.6, "weekly"),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.5, "yearly", [p.cover]), lastModified: p.date ? new Date(p.date) : now })),
  ];
}
