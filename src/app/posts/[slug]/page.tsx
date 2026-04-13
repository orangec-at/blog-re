import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/layout/container";
import { FullWidth } from "@/components/layout/full-width";
import { NarrowPage } from "@/components/layout/narrow-page";
import { ClientPostContent } from "@/components/mdx/client-post-content";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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

        <Container variant="wide" className="space-y-8 py-12">
          <article className="prose prose-neutral max-w-none prose-a:text-zapier-orange">
            <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
          </article>
        </Container>
      </>
    );
  }

  return (
    <NarrowPage>
      <div data-testid="post-narrow-layout" className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-wide text-zapier-gray">{post.domain}</p>
        <h1 className="text-4xl font-semibold text-zapier-black">{post.title}</h1>
        <p className="text-zapier-charcoal">{post.summary}</p>
      </div>
      <article className="prose prose-neutral max-w-none prose-a:text-zapier-orange">
        <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
      </article>
    </NarrowPage>
  );
}
