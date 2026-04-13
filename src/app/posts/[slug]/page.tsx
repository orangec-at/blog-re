import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/layout/container";
import { MDXContentRenderer } from "@/components/mdx/mdx-content";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <Container variant="narrow" className="space-y-6 py-12">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-wide text-zapier-gray">{post.domain}</p>
        <h1 className="text-4xl font-semibold text-zapier-black">{post.title}</h1>
        <p className="text-zapier-charcoal">{post.summary}</p>
      </div>
      <article className="prose prose-neutral max-w-none">
        <MDXContentRenderer code={post.body.code} />
      </article>
    </Container>
  );
}
