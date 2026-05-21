export type DraftableContent = {
  draft?: boolean;
};

export function isPublishedContent(content: DraftableContent): boolean {
  return content.draft !== true;
}

export function canReadDraftContent(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.BLOG_RE_ENABLE_DRAFT_POSTS === "true";
}
