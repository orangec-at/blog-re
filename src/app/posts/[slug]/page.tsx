import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { PostConversionRail, PostMobileConversionRail, type ConversionRailConfig } from "@/components/content/post-conversion-rail";
import { PostUseCaseHero, type PostUseCaseHeroProps } from "@/components/content/post-use-case-hero";
import { Container } from "@/components/layout/container";
import { FullWidth } from "@/components/layout/full-width";
import { NarrowPage } from "@/components/layout/narrow-page";
import { ClientPostContent } from "@/components/mdx/client-post-content";
import { absoluteUrl, siteConfig } from "@/config/site";

type PostSeoFields = {
  canonicalPath?: string;
  keywords?: string[];
  seoDescription?: string;
  seoTitle?: string;
  tags?: string[];
  ogImage?: string;
  author?: string;
  updated?: string;
};

const checklistRail: ConversionRailConfig = {
  ctaLabel: "진단 문의",
  description: "글을 읽는 것에서 끝내지 않고, 실제 출시 리스크를 산출물로 정리합니다.",
  navLabel: "AI MVP checklist sections",
  railTitle: "진단 산출물",
  sections: [
    { href: "#real-user-scenarios", label: "User Scenarios" },
    { href: "#auth-session", label: "Auth & Session" },
    { href: "#data-ownership", label: "Data Ownership" },
    { href: "#secrets", label: "Secrets" },
    { href: "#payment-lifecycle", label: "Payment" },
    { href: "#deploy-recovery", label: "Deploy / Recovery" },
    { href: "#maintainability-handoff", label: "Handoff" },
  ],
  secondaryHref: "/posts/ai-mvp-technical-debt-audit-sample-report",
  secondaryLabel: "샘플 리포트",
  title: "Risk table · System map · 2주 안정화",
};

const sampleReportRail: ConversionRailConfig = {
  ctaLabel: "진단 문의",
  description: "샘플을 읽은 뒤 우리 MVP의 리포트가 어떻게 생길지 바로 상담으로 연결합니다.",
  navLabel: "Sample audit report sections",
  railTitle: "샘플 리포트 구성",
  sections: [
    { href: "#executive-summary", label: "Executive Summary" },
    { href: "#system-map", label: "System Map" },
    { href: "#risk-table", label: "Risk Table" },
    { href: "#security-data", label: "Security & Data" },
    { href: "#stabilization-plan", label: "2주 Plan" },
    { href: "#go-no-go", label: "Go / No-Go" },
  ],
  secondaryHref: "/posts/ai-mvp-launch-checklist",
  secondaryLabel: "체크리스트로 돌아가기",
  title: "Executive summary · Risk table · Go / No-Go",
};

const checklistHero: Omit<PostUseCaseHeroProps, "summary" | "title"> = {
  bestFor: [
    "AI 코딩 도구로 만든 MVP를 첫 고객 앞에 내놓기 전인 founder",
    "Auth, data ownership, payment, deploy recovery를 빠르게 launch gate로 정리해야 하는 팀",
  ],
  eyebrow: "FixMyVibe use case · Launch-readiness checklist",
  meta: [
    { label: "Level", value: "Founder-friendly" },
    { label: "Scope", value: "7 launch gates" },
    { label: "Output", value: "Risk table" },
  ],
  primary: { href: "/contact", label: "기술 부채 진단 문의하기" },
  secondary: { href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 리포트 보기" },
};

const sampleReportHero: Omit<PostUseCaseHeroProps, "summary" | "title"> = {
  bestFor: [
    "Technical Debt Audit을 받으면 어떤 산출물이 나오는지 먼저 보고 싶은 founder",
    "Risk table, system map, Go / No-Go recommendation의 깊이를 확인해야 하는 팀",
  ],
  eyebrow: "FixMyVibe use case · Sample audit report",
  meta: [
    { label: "Format", value: "Sample report" },
    { label: "Scope", value: "Audit output" },
    { label: "Next", value: "Go / No-Go" },
  ],
  primary: { href: "/contact", label: "진단 문의하기" },
  secondary: { href: "/posts/ai-mvp-launch-checklist", label: "체크리스트 보기" },
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const seo = post as typeof post & PostSeoFields;
  const title = seo.seoTitle ?? post.title;
  const description = seo.seoDescription ?? post.summary;
  const canonical = seo.canonicalPath ?? post.url;
  const canonicalUrl = absoluteUrl(canonical);
  const keywords = [...new Set([...(seo.keywords ?? []), ...(seo.tags ?? [])])];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  if (post.layout === "full") {
    return (
      <>
        <FullWidth
          className="border-y border-zapier-sand bg-offwhite py-16"
          contentClassName="space-y-6"
        >
          <div data-testid="post-full-layout" className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-zapier-gray">{post.domain}</p>
              <h1 className="text-4xl font-semibold text-zapier-black sm:text-5xl">{post.title}</h1>
              <p className="max-w-3xl text-lg text-zapier-charcoal">{post.summary}</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-zapier-sand bg-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
                Layout sample
              </p>
              <p className="text-sm text-zapier-charcoal">
                This post uses the full-width shell so demos can break out of the reading column and feel
                closer to a product walkthrough.
              </p>
            </div>
          </div>
        </FullWidth>

        <Container variant="narrow" className="space-y-8 py-12">
          <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral max-w-none prose-a:text-zapier-orange">
            <div data-testid="post-full-body">
              <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
            </div>
          </article>
        </Container>
      </>
    );
  }

  const railConfig = post.slug === "ai-mvp-launch-checklist"
    ? checklistRail
    : post.slug === "ai-mvp-technical-debt-audit-sample-report"
      ? sampleReportRail
      : null;

  if (railConfig) {
    const heroConfig = post.slug === "ai-mvp-launch-checklist" ? checklistHero : sampleReportHero;

    return (
      <Container className="py-10 sm:py-12">
        <PostUseCaseHero title={post.title} summary={post.summary} {...heroConfig} />
        <PostMobileConversionRail config={railConfig} />
        <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral min-w-0 max-w-none break-words prose-a:text-zapier-orange [overflow-wrap:anywhere]">
            <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
          </article>
          <PostConversionRail config={railConfig} />
        </div>
      </Container>
    );
  }

  return (
    <NarrowPage>
      <div data-testid="post-narrow-layout" className="mx-auto max-w-3xl space-y-5 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-zapier-orange">{post.domain}</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-zapier-black sm:text-6xl">{post.title}</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-zapier-charcoal sm:text-lg">{post.summary}</p>
      </div>
      <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral max-w-none prose-a:text-zapier-orange">
        <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
      </article>
    </NarrowPage>
  );
}
