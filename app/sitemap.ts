import type { MetadataRoute } from "next";
import { getPosts } from "@/sanity/lib/fetch";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
