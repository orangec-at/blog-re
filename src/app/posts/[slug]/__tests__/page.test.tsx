import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PostPage, { generateMetadata } from "@/app/posts/[slug]/page";
import { absoluteUrl } from "@/config/site";

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
  getAllPosts: () => [
    { slug: "hello-world" },
    { slug: "ai-mvp-launch-checklist" },
    { slug: "ai-mvp-technical-debt-audit-sample-report" },
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
        canonicalPath: "/posts/ai-mvp-launch-checklist",
        keywords: ["AI MVP", "launch readiness"],
        tags: ["technical debt", "AI MVP"],
        ogImage: "/og/ai-mvp-launch-checklist.png",
        domain: "fixmyvibe",
        layout: "narrow",
        body: { code: "compiled-code" },
      };
    }

    if (slug === "ai-mvp-technical-debt-audit-sample-report") {
      return {
        slug,
        title: "AI MVP 기술 부채 진단 샘플 리포트에는 무엇이 들어가야 하나",
        summary: "FixMyVibe sample audit report walkthrough",
        domain: "fixmyvibe",
        layout: "narrow",
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

  it("adds a Lazyweb-inspired conversion rail to the AI MVP checklist article", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "ai-mvp-launch-checklist" }) }));

    expect(screen.getByTestId("post-conversion-rail")).toBeInTheDocument();
    expect(screen.getByTestId("post-mobile-conversion-rail")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "AI MVP checklist sections" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Mobile AI MVP checklist sections" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Post use-case summary" })).toBeVisible();
    expect(screen.getByTestId("post-article-body")).toHaveClass("fmv-article-prose");
    expect(screen.getByText("FixMyVibe use case · Launch-readiness checklist")).toBeVisible();
    expect(screen.getByText("Best for")).toBeVisible();
    expect(screen.getByText("7 launch gates")).toBeVisible();
    expect(screen.getByText("Risk table")).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Auth & Session" })[0]).toHaveAttribute("href", "#auth-session");
    expect(screen.getAllByText("진단 산출물").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Risk table · System map · 2주 안정화").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("link", { name: "진단 문의" })[0]).toHaveAttribute("href", "/contact");
  });

  it("adds a sample-report rail that previews deliverables and keeps the contact path visible", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "ai-mvp-technical-debt-audit-sample-report" }) }));

    expect(screen.getByTestId("post-conversion-rail")).toBeInTheDocument();
    expect(screen.getByTestId("post-mobile-conversion-rail")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Sample audit report sections" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Mobile Sample audit report sections" })).toBeVisible();
    expect(screen.getByText("FixMyVibe use case · Sample audit report")).toBeVisible();
    expect(screen.getByText("Sample report")).toBeVisible();
    expect(screen.getByText("Audit output")).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Executive Summary" })[0]).toHaveAttribute("href", "#executive-summary");
    expect(screen.getAllByText("샘플 리포트 구성" ).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Executive summary · Risk table · Go / No-Go" ).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("link", { name: "진단 문의" })[0]).toHaveAttribute("href", "/contact");
  });
});
