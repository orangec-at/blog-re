import { describe, expect, it } from "vitest";

import { findUnsafeClaims, validatePostFrontmatter } from "../check-content-engine.mjs";

describe("content engine checks", () => {
  it("requires SEO fields for non-draft posts", () => {
    const { errors } = validatePostFrontmatter({
      slug: "example",
      draft: false,
      title: "Example",
      summary: "Short summary",
      canonicalPath: "/posts/example",
      tags: [],
      keywords: [],
    });

    expect(errors).toContain("example: missing seoTitle");
    expect(errors).toContain("example: missing seoDescription");
    expect(errors).toContain("example: missing tags");
    expect(errors).toContain("example: missing keywords");
  });

  it("flags unapproved result/client-proof language", () => {
    expect(findUnsafeClaims("Proof/results for APAC clinics and client case study")).toHaveLength(3);
  });
});
