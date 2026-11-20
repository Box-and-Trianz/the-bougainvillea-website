import { revalidatePath, revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { BLOG_TAG } from "@/lib/wix/blog";

/**
 * Instant refresh hook for the Journal. Call it (e.g. from a Wix Automation "Send a webhook" action
 * on "Blog post published/updated") with the secret:
 *
 *   POST https://www.thebougainvilleas.com/api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Without it, new Wix posts still appear on their own within an hour.
 */
async function handle(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const given = new URL(req.url).searchParams.get("secret") ?? req.headers.get("x-revalidate-secret") ?? "";
  const ok =
    !!expected && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return Response.json({ ok: false, error: "Invalid or missing secret" }, { status: 401 });

  revalidateTag(BLOG_TAG);
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
  return Response.json({ ok: true, revalidated: ["blog", "posts", "sitemap"], at: new Date().toISOString() });
}

export const POST = handle;
export const GET = handle;
