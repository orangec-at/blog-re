import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getAllPosts, getPostDomains } from "@/lib/mdx";
import { Container } from "@/components/layout/container";

type PostsPageProps = {
  searchParams?: Promise<{
    domain?: string | string[];
  }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const availableDomains = getPostDomains();
  const requestedDomain = Array.isArray(resolvedSearchParams.domain)
    ? resolvedSearchParams.domain[0]
    : resolvedSearchParams.domain;
  const selectedDomain = requestedDomain && availableDomains.includes(requestedDomain) ? requestedDomain : undefined;
  const posts = selectedDomain
    ? getAllPosts().filter((post) => post.domain === selectedDomain)
    : getAllPosts();

  return (
    <Container variant="wide" className="space-y-8 py-12">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-wide text-ink-muted">Posts</p>
        <h1 className="text-4xl font-semibold text-ink">Technical insight for founder-led launches</h1>
        <p className="mx-auto max-w-3xl text-ink">
          The thinking behind AI MVP rescues, architecture rewrites, and proof-building delivery.
        </p>
        <div data-testid="posts-filter" className="flex flex-wrap justify-center gap-2">
          <Link
            href="/posts"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              !selectedDomain
                ? "border-[#c63d00] bg-[#c63d00] text-paper"
                : "border-rule text-ink hover:border-rule"
            }`}
          >
            All
          </Link>
          {availableDomains.map((domain) => (
            <Link
              key={domain}
              href={`/posts?domain=${domain}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition ${
                selectedDomain === domain
                  ? "border-[#c63d00] bg-[#c63d00] text-paper"
                  : "border-rule text-ink hover:border-rule"
              }`}
            >
              {domain}
            </Link>
          ))}
        </div>
      </header>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="rounded-lg border border-rule bg-paper p-6">
              <p className="text-sm text-ink-muted">
                {format(parseISO(post.date), "LLLL d, yyyy")} •{" "}
                <span className="uppercase">{post.domain}</span>
              </p>
              <h2 className="text-2xl font-semibold text-ink">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-ink">{post.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm font-semibold text-ink"
                >
                  Read post →
                </Link>
                <Link
                  href={`/domains/${post.domain}`}
                  className="text-sm font-medium uppercase tracking-wide text-ink"
                >
                  View domain →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-rule bg-paper p-8 text-center">
            <h2 className="text-2xl font-semibold text-ink">No posts in this domain yet</h2>
            <p className="mt-2 text-ink">
              Try another filter or browse all field notes while the next walkthrough is being published.
            </p>
            <Link href="/posts" className="mt-4 inline-flex text-sm font-semibold text-ink">
              View all posts →
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
