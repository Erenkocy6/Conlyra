import type { MetadataRoute } from "next";

const siteUrl = "https://conlyra.ai";
const lastModified = new Date("2026-07-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
