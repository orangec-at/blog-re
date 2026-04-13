import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/layout/container";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Container className="space-y-8">
      <header className="text-center">
        <p className="text-sm uppercase tracking-wide text-zapier-gray">Posts</p>
        <h1 className="text-4xl font-semibold text-zapier-black">Refactoring field notes</h1>
        <p className="text-zapier-charcoal">
          Case studies, demo write-ups, and automation stories that keep founders awake.
        </p>
      </header>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-lg border border-zapier-sand bg-offwhite p-6">
            <p className="text-sm text-zapier-gray">
              {format(parseISO(post.date), "LLLL d, yyyy")} • <span className="uppercase">{post.domain}</span>
            </p>
            <h2 className="text-2xl font-semibold text-zapier-black">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-zapier-charcoal">{post.summary}</p>
            <Link href={`/posts/${post.slug}`} className="text-sm font-semibold text-zapier-orange">
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
