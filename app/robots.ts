import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // O painel de edição não tem por que aparecer em busca.
      disallow: "/studio",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
