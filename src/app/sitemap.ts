import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getAllPosts } from "@/lib/mdx";

const staticRoutes = ["/", "/about", "/services", "/resources", "/posts", "/domains", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date((post as typeof post & { updated?: string }).updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
