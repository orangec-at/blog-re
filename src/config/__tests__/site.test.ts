import { describe, expect, it } from "vitest";

import { absoluteUrl, isPlaceholderContact, siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("normalizes absolute URLs from paths", () => {
    expect(absoluteUrl("/posts/example")).toBe(`${siteConfig.url}/posts/example`);
    expect(absoluteUrl("posts/example")).toBe(`${siteConfig.url}/posts/example`);
    expect(absoluteUrl("https://example.org/post")).toBe("https://example.org/post");
  });

  it("detects placeholder contact channels", () => {
    expect(isPlaceholderContact("mailto:hello@example.com")).toBe(true);
    expect(isPlaceholderContact("/contact")).toBe(false);
  });
});
