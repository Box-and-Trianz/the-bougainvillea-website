import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; browsers that can't take AVIF fall back to WebP.
    formats: ["image/avif", "image/webp"],
    // 75 = default, 85 = hero/feature photography where detail matters.
    qualities: [75, 85],
    // Optimized images are immutable per URL — cache them for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Blog images published from Wix are served from Wix's media CDN.
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com", pathname: "/media/**" }],
  },
  poweredByHeader: false,
  compress: true,
  // 301s from the old Wix site's URLs, so links and search rankings carry over to the new pages.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/ballrooms", destination: "/gallery", permanent: true },
      { source: "/the-grand-ballroon", destination: "/the-grand-ballroom", permanent: true },
      { source: "/frequentlyaskedquestions", destination: "/faq", permanent: true },
      { source: "/booking-calendar/:path*", destination: "/schedule-a-tour", permanent: true },
      { source: "/book-online", destination: "/schedule-a-tour", permanent: true },
      { source: "/service-page/:path*", destination: "/schedule-a-tour", permanent: true },
      { source: "/blog-1/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blog-1", destination: "/blog", permanent: true },
      { source: "/blog-1/:path*", destination: "/blog", permanent: true },
      { source: "/blog/categories/:path*", destination: "/blog", permanent: true },
      // Every Wix post lives on at /blog/<same slug>.
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/profile/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
