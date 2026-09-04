import { ImageResponse } from "next/og";

import { getAllPosts, getPostBySlug } from "@/lib/mdx";

// Every post's frontmatter pointed ogImage at /og/<slug>.png, and none of those
// files were ever in the repo. Rendering the card from the post's own title keeps
// it correct for posts that do not exist yet.

export const alt = "vibeguard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfcff",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#061b31" }}>
          wakey<span style={{ color: "#533afd" }}>moment</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#061b31",
            maxWidth: "1000px",
          }}
        >
          {post?.title ?? "vibeguard"}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#64748d" }}>
          Your developer says it’s done. You have no way to check.
        </div>
      </div>
    ),
    size,
  );
}
