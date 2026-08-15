import { describe, expect, it } from "vitest";

import { absoluteUrl, siteConfig } from "@/config/site";
import { buildBlogPostingJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/structured-data";

describe("structured data", () => {
  it("builds website json-ld", () => {
    expect(buildWebsiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      name: "wakeymoment",
      url: siteConfig.url,
    });
  });

  it("builds organization json-ld", () => {
    expect(buildOrganizationJsonLd()).toMatchObject({
      "@type": "Organization",
      name: "wakeymoment",
      url: siteConfig.url,
    });
  });

  it("builds blog posting json-ld with canonical url", () => {
    expect(buildBlogPostingJsonLd({
      title: "Example",
      description: "Summary",
      url: "/posts/example",
      datePublished: "2026-05-20",
      author: "Jaeil Lee",
    })).toMatchObject({
      "@type": "BlogPosting",
      headline: "Example",
      url: absoluteUrl("/posts/example"),
      author: { name: "Jaeil Lee" },
    });
  });
});
