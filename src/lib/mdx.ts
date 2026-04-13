import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";

export function getAllPosts(): Post[] {
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}
