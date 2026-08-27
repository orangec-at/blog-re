import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PostPage, { generateMetadata } from "@/app/posts/[slug]/page";
import { absoluteUrl } from "@/config/site";

const mockedNotFound = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  notFound: mockedNotFound,
}));

vi.mock("@/components/mdx/server-post-content", () => ({
  ServerPostContent: ({
    defaultDemoLayout,
  }: {
    code: string;
    defaultDemoLayout?: string;
  }) => <div data-testid="mdx-renderer" data-layout={defaultDemoLayout} />,
}));

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => [
    { slug: "hello-world", title: "Hello World", date: "2026-05-20" },
    { slug: "ai-mvp-launch-checklist", title: "AI MVP launch checklist", date: "2026-05-05" },
    {
      slug: "ai-mvp-technical-debt-audit-sample-report",
      title: "AI MVP Technical Debt Audit — Sample Report",
      date: "2026-05-04",
    },
    { slug: "remodeling-sprint-for-ai-built-apps", title: "What a Remodeling Sprint is", date: "2026-05-03" },
  ],
  getPostBySlug: (slug: string) => {
    if (slug === "hello-world") {
      return {
        slug,
        title: "Hello World",
        summary: "A full-width demo post",
        domain: "fixmyvibe",
        layout: "full",
        body: { code: "compiled-code" },
      };
    }

    if (slug === "ai-mvp-launch-checklist") {
      return {
        slug,
        title: "AI로 만든 MVP를 출시하기 전에 반드시 점검해야 할 7가지",
        summary: "AI MVP launch checklist",
        seoTitle: "AI MVP 출시 전 체크리스트: 고객 받기 전 7가지 점검",
        seoDescription: "AI 코딩 도구로 만든 MVP를 공개하기 전 launch-readiness 체크리스트.",
        date: "2026-05-05",
        canonicalPath: "/posts/ai-mvp-launch-checklist",
        keywords: ["AI MVP", "launch readiness"],
        tags: ["technical debt", "AI MVP"],
        ogImage: "/og/ai-mvp-launch-checklist.png",
        domain: "fixmyvibe",
        layout: "narrow",
        body: { code: "compiled-code" },
      };
    }

    if (slug === "remodeling-sprint-for-ai-built-apps") {
      return {
        slug,
        title: "What a Remodeling Sprint is",
        summary: "Turning a prototype into a product",
        date: "2026-05-03",
        domain: "fixmyvibe",
        layout: "narrow",
        body: { code: "compiled-code" },
      };
    }

    if (slug === "ai-mvp-technical-debt-audit-sample-report") {
      return {
        slug,
        title: "What goes into a sample AI MVP technical debt audit report",
        summary: "FixMyVibe sample audit report walkthrough",
        date: "2026-05-05",
        domain: "fixmyvibe",
        layout: "report",
        body: { code: "compiled-code" },
      };
    }

    return undefined;
  },
}));

describe("PostPage", () => {
  it("generates approval-ready SEO metadata from the post frontmatter", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "ai-mvp-launch-checklist" }) });

    expect(metadata).toMatchObject({
      title: "AI MVP 출시 전 체크리스트: 고객 받기 전 7가지 점검",
      description: "AI 코딩 도구로 만든 MVP를 공개하기 전 launch-readiness 체크리스트.",
      alternates: { canonical: "/posts/ai-mvp-launch-checklist" },
      openGraph: {
        title: "AI MVP 출시 전 체크리스트: 고객 받기 전 7가지 점검",
        description: "AI 코딩 도구로 만든 MVP를 공개하기 전 launch-readiness 체크리스트.",
        type: "article",
        url: absoluteUrl("/posts/ai-mvp-launch-checklist"),
        siteName: "fmv",
      },
      twitter: {
        card: "summary_large_image",
        title: "AI MVP 출시 전 체크리스트: 고객 받기 전 7가지 점검",
        description: "AI 코딩 도구로 만든 MVP를 공개하기 전 launch-readiness 체크리스트.",
      },
    });
    expect(metadata.keywords).toEqual(["AI MVP", "launch readiness", "technical debt"]);
  });

  it("leaves og:image to the generated card instead of naming a file that does not exist", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "ai-mvp-launch-checklist" }) });

    // Frontmatter still carries an ogImage path, but every /og/*.png it named was
    // missing from the repo, so posts shared with no preview image.
    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(metadata.twitter).not.toHaveProperty("images");
  });

  it("passes the frontmatter layout through to the mdx renderer", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "hello-world" }) }));

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByTestId("post-full-layout")).toBeInTheDocument();
    expect(screen.getByTestId("post-article-body")).toHaveClass("fmv-article-prose");
    expect(screen.getByTestId("post-full-body")).toBeInTheDocument();
    expect(screen.getByTestId("mdx-renderer")).toHaveAttribute("data-layout", "full");
    expect(mockedNotFound).not.toHaveBeenCalled();
  });

  it("gives the product articles the same shell as every other post", async () => {
    // These two slugs used to get a landing page bolted on top of the article:
    // an eyebrow, a meta row, a "best for" list, a table of contents, and a
    // conversion rail rendered twice. Five chrome blocks before the first
    // sentence, on the two posts a reader is most likely to have arrived to read.
    for (const slug of ["ai-mvp-launch-checklist"]) {
      const { unmount } = render(await PostPage({ params: Promise.resolve({ slug }) }));

      expect(screen.getByTestId("post-narrow-layout")).toBeInTheDocument();
      expect(screen.queryByText(/^Best for$/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/^On this guide$/i)).not.toBeInTheDocument();

      // The article's own <ArticleCTA> sits at the end of the MDX, where a reader
      // who finished is the one being asked. The rail asked before they started.
      expect(screen.queryByText(/^What is in the sample$/i)).not.toBeInTheDocument();

      unmount();
    }
  });

  it("typesets a post as a document, not as a bare column", async () => {
    // A post was the one page in the system without document chrome: no locator
    // in the margin, no closing stamp, and a reading column that agreed with
    // nothing around it. The home page and the index both use this grid.
    render(await PostPage({ params: Promise.resolve({ slug: "ai-mvp-launch-checklist" }) }));

    expect(screen.getByTestId("post-narrow-layout")).toHaveClass("lg:grid-cols-[6rem_minmax(0,1fr)]");
    expect(screen.getByRole("link", { name: /← Proof/ })).toHaveAttribute("href", "/posts");
    expect(screen.getByText("2026-05-05")).toHaveAttribute("datetime", "2026-05-05");
    expect(screen.getByText(/End of document · ai-mvp-launch-checklist/)).toBeVisible();
  });

  it("points the reader at the next document instead of just stopping", async () => {
    // getAllPosts is sorted newest first, so the post after this one in reading
    // order is the next index, not the previous one.
    render(await PostPage({ params: Promise.resolve({ slug: "ai-mvp-launch-checklist" }) }));

    expect(
      screen.getByRole("link", { name: /AI MVP Technical Debt Audit — Sample Report/ }),
    ).toHaveAttribute("href", "/posts/ai-mvp-technical-debt-audit-sample-report");
  });

  it("sets the sample report as a sheet, because it is a deliverable", async () => {
    // The one page on the site that renders an artifact rather than describing
    // one. It gets a bordered sheet with a running head and foot, not the
    // article shell, and the reading measure gives way to the sheet's own width
    // so a seven-column risk table has room.
    render(
      await PostPage({
        params: Promise.resolve({ slug: "ai-mvp-technical-debt-audit-sample-report" }),
      }),
    );

    const sheet = screen.getByTestId("post-report-layout");
    expect(sheet).toBeInTheDocument();
    expect(sheet).toHaveClass("border", "border-rule");
    expect(screen.queryByTestId("post-narrow-layout")).not.toBeInTheDocument();
    expect(screen.getByText("FixMyVibe · Launch Gate Audit")).toBeVisible();
    expect(screen.getByText("fmv · sample audit report")).toBeVisible();
  });

  it("falls back to the index when a post is the oldest one", async () => {
    render(
      await PostPage({
        params: Promise.resolve({ slug: "remodeling-sprint-for-ai-built-apps" }),
      }),
    );

    expect(screen.getByRole("link", { name: /Everything I have published/ })).toHaveAttribute(
      "href",
      "/posts",
    );
  });
});
