import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PostPage from "@/app/posts/[slug]/page";

const mockedNotFound = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  notFound: mockedNotFound,
}));

vi.mock("@/components/mdx/client-post-content", () => ({
  ClientPostContent: ({
    defaultDemoLayout,
  }: {
    code: string;
    defaultDemoLayout?: string;
  }) => <div data-testid="mdx-renderer" data-layout={defaultDemoLayout} />,
}));

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => [{ slug: "hello-world" }],
  getPostBySlug: (slug: string) =>
    slug === "hello-world"
      ? {
          slug,
          title: "Hello World",
          summary: "A full-width demo post",
          domain: "fixmyvibe",
          layout: "full",
          body: { code: "compiled-code" },
        }
      : undefined,
}));

describe("PostPage", () => {
  it("passes the frontmatter layout through to the mdx renderer", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "hello-world" }) }));

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByTestId("post-full-layout")).toBeInTheDocument();
    expect(screen.getByTestId("post-full-body")).toBeInTheDocument();
    expect(screen.getByTestId("mdx-renderer")).toHaveAttribute("data-layout", "full");
    expect(mockedNotFound).not.toHaveBeenCalled();
  });
});
