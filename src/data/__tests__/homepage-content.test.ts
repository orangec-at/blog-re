import { describe, expect, it } from "vitest";
import { contactCta } from "@/data/homepage-content";

describe("homepage content modules", () => {
  it("provides the contact CTA", () => {
    expect(contactCta.primaryHref).toBe("/contact");
    expect(contactCta.title).toBeTruthy();
  });
});
