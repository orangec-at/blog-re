import { absoluteUrl, siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/mdx";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const items = getAllPosts()
    .map((post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${absoluteUrl(post.url)}</link>
        <guid>${absoluteUrl(post.url)}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${escapeXml(post.summary)}</description>
      </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
