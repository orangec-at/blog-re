import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import { canReadDraftContent, isPublishedContent } from "@/lib/post-access";

type GetPostBySlugOptions = {
  includeDrafts?: boolean;
};

export function getAllPosts(): Post[] {
  return allPosts.filter(isPublishedContent).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string, options: GetPostBySlugOptions = {}): Post | undefined {
  const includeDrafts = options.includeDrafts ?? canReadDraftContent();
  const post = allPosts.find((candidate) => candidate.slug === slug);

  if (!post) {
    return undefined;
  }

  if (!includeDrafts && !isPublishedContent(post)) {
    return undefined;
  }

  return post;
}

export function getPostsByDomain(domain: string): Post[] {
  return getAllPosts().filter((post) => post.domain === domain);
}

export function getPostDomains(): string[] {
  return [...new Set(getAllPosts().map((post) => post.domain))].sort();
}
