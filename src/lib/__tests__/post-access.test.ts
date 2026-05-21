import { describe, expect, it, vi } from "vitest";

import { canReadDraftContent, isPublishedContent } from "@/lib/post-access";

describe("post access helpers", () => {
  it("classifies draft and published content", () => {
    expect(isPublishedContent({})).toBe(true);
    expect(isPublishedContent({ draft: false })).toBe(true);
    expect(isPublishedContent({ draft: true })).toBe(false);
  });

  it("keeps draft direct access off in production unless explicitly enabled", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("BLOG_RE_ENABLE_DRAFT_POSTS", "false");
    expect(canReadDraftContent()).toBe(false);

    vi.stubEnv("BLOG_RE_ENABLE_DRAFT_POSTS", "true");
    expect(canReadDraftContent()).toBe(true);
    vi.unstubAllEnvs();
  });
});
