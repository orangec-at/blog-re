import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/layout/container";
import { FullWidth } from "@/components/layout/full-width";
import { ServerPostContent } from "@/components/mdx/server-post-content";
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

  // A report is a deliverable, so it is set as a sheet rather than as an
  // article: a bordered page on the paper ground, with a running head and foot
  // the way a PDF audit carries them. The sheet is wider than the reading
  // measure because a seven-column risk table needs the room — and inside it
  // --article-measure is the sheet's own content width, so prose and tables
  // still share one right edge rather than reintroducing four of them.
  if (post.layout === "report") {
    return (
      <Container variant="wide" className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[56rem]">
          <div className="mb-4 flex items-baseline justify-between gap-4 font-mono text-sm text-ink-muted">
            <Link className="transition hover:text-ink" href="/posts">
              ← Proof
            </Link>
            <time dateTime={post.date}>{format(parseISO(post.date), "yyyy-MM-dd")}</time>
          </div>

          <article
            data-testid="post-report-layout"
            className="border border-rule bg-paper"
            style={{ ["--article-measure" as string]: "100%" }}
          >
            <header className="border-b border-rule px-6 py-10 sm:px-12 sm:py-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                FixMyVibe · Launch Gate Audit
              </p>
              <h1 className="mt-5 font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{post.summary}</p>
            </header>

            <div
              data-testid="post-article-body"
              className="vibeguard-article-prose prose prose-neutral max-w-none px-6 py-10 prose-a:text-ink sm:px-12 sm:py-14"
            >
              <ServerPostContent code={post.body.code} defaultDemoLayout="narrow" />
            </div>

            <footer className="flex flex-wrap items-baseline justify-between gap-3 border-t border-rule px-6 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted sm:px-12">
              <span>vibeguard · sample audit report</span>
              <span>{post.slug}</span>
            </footer>
          </article>
        </div>
      </Container>
    );
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
          <article data-testid="post-article-body" className="vibeguard-article-prose prose prose-neutral max-w-none prose-a:text-ink">
            <div data-testid="post-full-body">
              <ServerPostContent code={post.body.code} defaultDemoLayout={post.layout} />
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
  //
  // The shell is the same 6rem margin grid the home page and the index use. A
  // post was the one page in the system not typeset as a document: no locator
  // in the margin, no closing stamp, a reading column that agreed with nothing
  // around it. Sharing the grid is what makes it read as the same publication.
  const posts = getAllPosts();
  const position = posts.findIndex((candidate) => candidate.slug === post.slug);
  const nextPost = position >= 0 ? posts[position + 1] : undefined;

  return (
    <Container variant="wide" className="py-16 sm:py-24">
      {/* The grid is centred as a unit rather than filling the wide container.
          The home page and the index let their right cell fill the 1fr, but a
          post caps that cell at the reading measure, so filling would leave the
          document hugging the left edge with a void beside it. */}
      <div
        data-testid="post-narrow-layout"
        className="mx-auto grid max-w-[calc(6rem+3rem+var(--article-measure))] gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12"
      >
        {/* The margin carries the locator, the way a report's section mark does.
            The eyebrow used to be {post.domain}, which reads "fixmyvibe" on every
            post and therefore says nothing; the date is the fact a document
            should carry. */}
        <div className="flex flex-row items-baseline gap-4 font-mono text-sm text-ink-muted lg:flex-col lg:gap-2">
          <Link className="transition hover:text-ink" href="/posts">
            ← Proof
          </Link>
          <time dateTime={post.date}>{format(parseISO(post.date), "yyyy-MM-dd")}</time>
        </div>

        {/* min-w-0: a grid item defaults to min-width:auto and will not shrink below
            its content, so one wide table inside the article widened the whole
            reading column and pushed every section off a narrow screen. */}
        <div className="flex w-full min-w-0 flex-col gap-10">
          {/* The title is text-3xl/4xl rather than text-6xl: a post headline
              larger than the site's own h1 inverts the hierarchy. The summary is
              ink, not ink-muted — DESIGN.md reserves muted for metadata, and
              this paragraph carries the article's argument. */}
          <header className="flex flex-col gap-5 border-b border-rule pb-10">
            <h1 className="font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-ink">{post.summary}</p>
          </header>

          <article
            data-testid="post-article-body"
            className="vibeguard-article-prose prose prose-neutral max-w-none prose-a:text-ink"
          >
            <ServerPostContent code={post.body.code} defaultDemoLayout={post.layout} />
          </article>

          {/* A document ends by saying so and pointing at the next one. Before
              this the article just stopped. */}
          <footer className="flex flex-col gap-6 border-t border-rule pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              End of document · {post.slug}
            </p>

            {nextPost?.title ? (
              <Link className="flex flex-col gap-1 group" href={`/posts/${nextPost.slug}`}>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Next
                </span>
                <span className="font-display text-lg font-normal text-ink transition group-hover:text-ink-muted">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <Link className="text-sm text-ink transition hover:text-ink-muted" href="/posts">
                ← Everything I have published
              </Link>
            )}
          </footer>
        </div>
      </div>
    </Container>
  );
}
