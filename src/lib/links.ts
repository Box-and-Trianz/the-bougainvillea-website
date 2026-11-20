/* ----------------------------------------------------------------------------
 * Link clean-up for blog content (live Wix posts and the local copies).
 * Fixes common typing mistakes, points the venue's own old addresses at this site,
 * and drops links to sites that no longer exist (their text is kept).
 * ------------------------------------------------------------------------- */

/** Addresses the venue has used for itself, including typos found in old posts. */
const OWN_SITE = /(^|\.)(thebouga(i)?n?villeas|thebougainvilleashouston|bougainvilleasvenue)\.com$/i;

/** Outbound links found dead (domain gone or page removed). Keep this list short and specific. */
const DEAD_LINKS = [
  /^https?:\/\/(www\.)?celebration\.wedding\/?$/i,
  /^https?:\/\/(www\.)?texas\.hosting\/?$/i,
  /^https?:\/\/(www\.)?madisongreencountryclub\.com\/west-palm-beach-country-club-event-space\/?$/i,
];

const OLD_PATHS: Record<string, string> = {
  "/home": "/",
  "/frequentlyaskedquestions": "/faq",
  "/the-grand-ballroon": "/the-grand-ballroom",
  "/ballrooms": "/gallery",
};

/**
 * Returns a usable href, or `null` when the link should be shown as plain text.
 * e.g. "www.site.com" → "https://www.site.com", "info@site.com" → "mailto:info@site.com",
 * "https://www.thebougainvilleas.com/post/x" → "/blog/x", "http://]https://site.com" → "https://site.com".
 */
export function cleanLink(raw: string): string | null {
  let url = raw.trim();
  if (!url) return null;
  // Pasting mistakes like "http://]https://site.com": keep the last full address.
  const schemes = [...url.matchAll(/https?:\/\//gi)];
  if (schemes.length > 1) url = url.slice(schemes[schemes.length - 1].index);
  if (url.startsWith("/") || url.startsWith("#") || /^(tel|mailto):/i.test(url)) return url;
  if (/^[^\s/:@]+@[^\s/@]+\.[a-z]{2,}$/i.test(url)) return `mailto:${url}`;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = `https://${url}`;

  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return null;
  if (DEAD_LINKS.some((re) => re.test(u.href))) return null;

  if (OWN_SITE.test(u.hostname)) {
    const p = u.pathname.replace(/\/$/, "") || "/";
    if (p.startsWith("/post/")) return `/blog/${p.slice(6)}`;
    if (p.startsWith("/blog-1")) return "/blog";
    return OLD_PATHS[p] ?? p;
  }
  return u.href;
}
