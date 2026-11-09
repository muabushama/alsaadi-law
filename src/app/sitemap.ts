import type { MetadataRoute } from "next";
import { serviceCategories } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...serviceCategories.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
