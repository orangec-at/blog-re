import { describe, expect, it } from "vitest";

import { isPlaceholderContact } from "@/config/site";
import { contactChannels } from "@/data/contacts";

describe("contact channels", () => {
  it("does not expose placeholder contact links", () => {
    expect(contactChannels.some((channel) => isPlaceholderContact(channel.href))).toBe(false);
  });
});
