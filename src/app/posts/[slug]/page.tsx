import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
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

  // Two slugs used to get a landing page bolted on top of the article: an
  // eyebrow, a meta row, a "best for" list, a table of contents and a
  // conversion rail rendered twice — five chrome blocks before the first
  // sentence. Every other post went straight to the writing and read better for
  // it. The rail's CTA is also already in the MDX as <ArticleCTA>, at the end,
  // where a reader who finished is the one being asked.
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
