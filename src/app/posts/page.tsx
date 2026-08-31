import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/layout/container";

// Typeset like the home page rather than as a card grid: left-aligned, hairline
// rules between entries, the date in the margin. The domain filter is gone —
// every post carries domain "fixmyvibe", so it was a control that filtered
// nothing. Bring it back when a second domain exists.
export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
        <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
          Proof
        </p>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">
              What I have published
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
              The method is open before anyone pays for it. Each of these shows a piece of how a
              review is done, or what one produces.
            </p>
          </div>

          {posts.length > 0 ? (
            <ul className="flex flex-col">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="font-mono text-sm text-ink-muted">
                    {format(parseISO(post.date), "yyyy-MM-dd")}
                  </p>

                  <div className="flex flex-col gap-2">
                    <h2 className="font-display text-lg font-normal text-ink">
                      <Link className="hover:text-ink-muted" href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {post.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-t border-rule py-6 text-sm text-ink-muted">
              Nothing published yet.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
