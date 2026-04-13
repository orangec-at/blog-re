import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";

export function getAllPosts(): Post[] {
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByDomain(domain: string): Post[] {
  return getAllPosts().filter((post) => post.domain === domain);
}

export function getPostDomains(): string[] {
  return [...new Set(allPosts.map((post) => post.domain))].sort();
}
