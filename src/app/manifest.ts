import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Bougainvilleas · Houston Event Venue",
    short_name: "Bougainvilleas",
    description: "Boutique wedding and event venue in West Houston, Texas.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfaf7",
    theme_color: "#1a1a1a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
