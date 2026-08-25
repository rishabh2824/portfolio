import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.site,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${config.site}/resume`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
