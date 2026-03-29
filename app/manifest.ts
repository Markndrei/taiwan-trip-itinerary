import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Taiwan 2027 — Our Journey",
    short_name: "Taiwan 2027",
    description: "A curated travel itinerary through the heart of Taiwan, January 2027.",
    start_url: "/",
    display: "standalone",          // hides browser chrome — feels native
    orientation: "portrait",
    background_color: "#F5F0E8",    // --paper colour
    theme_color: "#0D0D0D",         // --ink colour
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}