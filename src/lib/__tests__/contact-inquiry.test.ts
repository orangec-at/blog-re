import { describe, expect, it, vi } from "vitest";

import { buildInquiryMail, submitInquiry } from "@/lib/contact-inquiry";

const config = { to: "owner@example.com", from: "onboarding@resend.dev" };
const valid = { workEmail: "founder@startup.com", launchBlocker: "Supabase RLS is off in production.", company: "" };

describe("submitInquiry", () => {
  it("sends a valid inquiry and replies to the sender's address", async () => {
    const sendMail = vi.fn().mockResolvedValue({});

    await expect(submitInquiry(valid, config, sendMail)).resolves.toEqual({ status: "sent" });

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0]).toMatchObject({
      to: "owner@example.com",
      replyTo: "founder@startup.com",
    });
    expect(sendMail.mock.calls[0][0].text).toContain("Supabase RLS is off in production.");
  });

  it("rejects a bad email without sending", async () => {
    const sendMail = vi.fn();
    const state = await submitInquiry({ ...valid, workEmail: "not-an-email" }, config, sendMail);

    expect(state.status).toBe("error");
    expect(state).toHaveProperty("fieldErrors.workEmail");
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects a message too short to act on", async () => {
    const sendMail = vi.fn();
    const state = await submitInquiry({ ...valid, launchBlocker: "help" }, config, sendMail);

    expect(state.status).toBe("error");
    expect(state).toHaveProperty("fieldErrors.launchBlocker");
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("silently drops a bot that filled the honeypot", async () => {
    const sendMail = vi.fn();
    const state = await submitInquiry({ ...valid, company: "Acme Corp" }, config, sendMail);

    // Looks successful to the bot, costs us nothing.
    expect(state).toEqual({ status: "sent" });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("never reports success when no inbox is configured", async () => {
    const sendMail = vi.fn();
    const state = await submitInquiry(valid, { to: undefined, from: undefined }, sendMail);

    expect(state.status).toBe("error");
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("never reports success when the provider returns an error", async () => {
    const sendMail = vi.fn().mockResolvedValue({ error: { message: "domain not verified" } });
    const state = await submitInquiry(valid, config, sendMail);

    expect(state.status).toBe("error");
  });

  it("never reports success when the provider throws", async () => {
    const sendMail = vi.fn().mockRejectedValue(new Error("network down"));
    const state = await submitInquiry(valid, config, sendMail);

    expect(state.status).toBe("error");
  });
});

describe("buildInquiryMail", () => {
  it("falls back to the Resend onboarding sender when no from address is set", () => {
    const mail = buildInquiryMail(valid, { to: "owner@example.com", from: undefined });
    expect(mail?.from).toBe("onboarding@resend.dev");
  });

  it("returns null rather than a mail with no recipient", () => {
    expect(buildInquiryMail(valid, { to: undefined, from: undefined })).toBeNull();
  });
});
