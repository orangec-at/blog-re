import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
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
  ctaLabel: "Start a review",
  description: "Reading is not the point. The review turns launch risk into something you can act on.",
  navLabel: "AI MVP checklist sections",
  railTitle: "What the review produces",
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
  secondaryLabel: "Sample report",
  title: "Risk table · System map · Two-week plan",
};

const sampleReportRail: ConversionRailConfig = {
  ctaLabel: "Start a review",
  description: "Once you have read the sample, the next step is seeing what yours would say.",
  navLabel: "Sample audit report sections",
  railTitle: "What is in the sample",
  sections: [
    { href: "#executive-summary", label: "Executive Summary" },
    { href: "#system-map", label: "System Map" },
    { href: "#risk-table", label: "Risk Table" },
    { href: "#security-data", label: "Security & Data" },
    { href: "#stabilization-plan", label: "Two-week plan" },
    { href: "#go-no-go", label: "Go / No-Go" },
  ],
  secondaryHref: "/posts/ai-mvp-launch-checklist",
  secondaryLabel: "Back to the checklist",
  title: "Executive summary · Risk table · Go / No-Go",
};

const checklistHero: Omit<PostUseCaseHeroProps, "summary" | "title"> = {
  bestFor: [
    "Founders about to put an AI-built MVP in front of its first customers",
    "Teams that need auth, data ownership, payment and deploy recovery turned into launch gates",
  ],
  eyebrow: "FixMyVibe use case · Launch-readiness checklist",
  meta: [
    { label: "Level", value: "Founder-friendly" },
    { label: "Scope", value: "7 launch gates" },
    { label: "Output", value: "Risk table" },
  ],
  primary: { href: "/contact", label: "Start a review" },
  secondary: { href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "Read the sample report" },
};

const sampleReportHero: Omit<PostUseCaseHeroProps, "summary" | "title"> = {
  bestFor: [
    "Founders who want to see what a review produces before commissioning one",
    "Teams checking how deep the risk table, system map and Go / No-Go go",
  ],
  eyebrow: "FixMyVibe use case · Sample audit report",
  meta: [
    { label: "Format", value: "Sample report" },
    { label: "Scope", value: "Audit output" },
    { label: "Next", value: "Go / No-Go" },
  ],
  primary: { href: "/contact", label: "Start a review" },
  secondary: { href: "/posts/ai-mvp-launch-checklist", label: "Read the checklist" },
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
          className="border-y border-rule bg-paper py-16"
          contentClassName="space-y-6"
        >
          <div data-testid="post-full-layout" className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-ink-muted">{post.domain}</p>
              <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{post.title}</h1>
              <p className="max-w-3xl text-lg text-ink">{post.summary}</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-rule bg-paper p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Layout sample
              </p>
              <p className="text-sm text-ink">
                This post uses the full-width shell so demos can break out of the reading column and feel
                closer to a product walkthrough.
              </p>
            </div>
          </div>
        </FullWidth>

        <Container variant="narrow" className="space-y-8 py-12">
          <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral max-w-none prose-a:text-ink">
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
          <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral min-w-0 max-w-none break-words prose-a:text-ink [overflow-wrap:anywhere]">
            <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
          </article>
          <PostConversionRail config={railConfig} />
        </div>
      </Container>
    );
  }

  return (
    <NarrowPage>
      {/* Left-aligned, and the title is text-4xl rather than text-6xl: a post
          headline larger than the site's own h1 inverts the hierarchy. The
          eyebrow was {post.domain}, which reads "fixmyvibe" on every post and
          therefore says nothing — the date is the fact a document should carry. */}
      <div data-testid="post-narrow-layout" className="flex max-w-3xl flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <Link className="font-mono text-sm text-ink-muted transition hover:text-ink" href="/posts">
            ← Proof
          </Link>
          <time className="font-mono text-sm text-ink-muted" dateTime={post.date}>
            {format(parseISO(post.date), "yyyy-MM-dd")}
          </time>
        </div>

        <h1 className="font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{post.summary}</p>
      </div>
      <article data-testid="post-article-body" className="fmv-article-prose prose prose-neutral max-w-none prose-a:text-ink">
        <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
      </article>
    </NarrowPage>
  );
}
