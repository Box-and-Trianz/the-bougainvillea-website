# The Bougainvilleas

Redesign of [thebougainvilleas.com](https://www.thebougainvilleas.com/) — West Houston's premier event venue.
Built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4. Every page is statically prerendered and all
images are served locally, so the site runs fully offline.

## Run it

```bash
npm install
npm run dev      # development, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build (fastest)
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/our-family` | Culture, Badra Andrews (owner), Chef Javier Solis, design |
| `/gallery` | Pick Your Room (seated / theater toggle) |
| `/the-grand-ballroom`, `/the-chapel`, `/the-wine-room`, `/the-bougainvilleas`, `/the-wedding-suite` | Room pages |
| `/packages` | Brochure request + Silver, Diamond, Corporate, Galas, Holiday, Birthdays, Quinceañera packages |
| `/catering` | Cuisines, partners, dietary options, offsite catering, food gallery |
| `/business-events` | Corporate events: spaces, ideal uses, location, booking steps, inquiry form |
| `/testimonials` | All reviews |
| `/faq` | FAQ by topic (with FAQPage structured data) |
| `/blog`, `/blog/[slug]` | The Journal (4 posts) |
| `/contact` | Contact details, hours, directions, message form |
| `/schedule-a-tour` | Venue tour request |

Forms are front-end only (they show a confirmation); connect them to an email service or CRM before launch.

## Where things live

```
src/
  app/            routes (one folder per page)
  components/     Header, Footer, forms, Reveal (scroll animation), PageHero, Markdown …
  content/
    pages.ts      packages, FAQ, team, catering, corporate content, extra reviews
    blog.ts       blog posts (Markdown bodies)
  lib/data.ts     site info, navigation, rooms, testimonials, partners
public/images/
  hero/ about/ events/ venues/<room>/ packages/ catering/ corporate/ our-family/
  blog/<post>/ testimonials/ partners/ social/
```

## Performance notes

- All images use `next/image`: responsive sizes per slot, AVIF/WebP, lazy loading, hero images preloaded.
  Source photos are capped at 1920px; quality 85 for heroes, 75 elsewhere (`next.config.ts`).
- Scroll animations use a small IntersectionObserver component (no animation library) and respect
  `prefers-reduced-motion`.
- Fonts are self-hosted via `next/font`.

## SEO

Everything search engines read is generated from code:

| What | Where |
|---|---|
| Titles, descriptions, canonical URLs, Open Graph / Twitter cards | `pageMeta()` in `src/lib/seo.ts`, called from each page |
| Business, venue, blog, breadcrumb and FAQ structured data (JSON-LD) | `src/lib/seo.ts`, rendered with `src/components/JsonLd.tsx` |
| `/sitemap.xml` (with image entries) | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` |
| Default share image (1200×630) | `public/og/default.jpg` |
| 301 redirects from the old Wix URLs (`/home`, `/post/...`, `/frequentlyaskedquestions`, ...) | `redirects()` in `next.config.ts` |

Environment variables (set in Vercel → Settings → Environment Variables):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain, default `https://www.thebougainvilleas.com`. Used for canonicals, sitemap and schema. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Code from Google Search Console (HTML tag method) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Code from Bing Webmaster Tools |

Preview deployments on Vercel are automatically `noindex`, so only production appears in search.

After launch:
1. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
2. Keep the Google Business Profile's website link, hours, photos and categories ("Wedding venue", "Event venue", "Banquet hall", "Caterer") current, and ask happy clients for Google reviews.
3. Test structured data at https://search.google.com/test/rich-results.

## Blog (Journal) ↔ Wix Blog

The Journal reads posts **live from Wix Blog** (`src/lib/wix/blog.ts`). Write, edit or delete posts in the
Wix dashboard as usual; this site follows:

- **Automatically within 1 hour.** Blog pages and the sitemap are cached and refreshed in the background
  (`revalidate = 3600`). New posts also render immediately the first time someone opens their URL.
- **Instantly (optional).** In Wix → Automations, create an automation with trigger *Blog post published*
  (and another for *updated*, if available) and action *Send a webhook* to
  `https://www.thebougainvilleas.com/api/revalidate?secret=<REVALIDATE_SECRET>`.

Post URLs keep their Wix slugs (`/post/<slug>` → `/blog/<slug>`, 301), so existing search rankings carry over.
Wix rich text (headings, lists, links, images, galleries, quotes) is converted to the site's own styling.

If Wix is not configured, `WIX_BLOG=off` is set, or Wix can't be reached, the 18 posts saved in
`src/content/blog.ts` are shown instead.

| Variable | Purpose |
|---|---|
| `WIX_API_KEY`, `WIX_SITE_ID` | Same keys as the forms; the key needs the **Wix Blog** permission |
| `REVALIDATE_SECRET` | Long random string that protects `/api/revalidate` |
| `WIX_BLOG` | Optional. `off` = always use the local posts |
