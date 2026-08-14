import { z } from "zod";

/**
 * Inquiry handling is kept free of Next.js and Resend imports so the rules that
 * decide whether a message is sent — and what happens when sending fails — can be
 * tested without a network or a running server.
 */

export const inquirySchema = z.object({
  workEmail: z.email("Enter an email address we can reply to.").max(320),
  launchBlocker: z
    .string()
    .trim()
    .min(10, "Tell us a little more — one sentence about what feels risky is enough.")
    .max(5000, "Please keep this under 5000 characters."),
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export type InquiryMail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type InquiryConfig = {
  to: string | undefined;
  from: string | undefined;
};

export type SendMail = (mail: InquiryMail) => Promise<{ error?: unknown }>;

const FALLBACK_ERROR =
  "We could not send that just now. Please try again in a minute — nothing was saved on our side.";

export function buildInquiryMail(input: InquiryInput, config: InquiryConfig): InquiryMail | null {
  if (!config.to) {
    return null;
  }

  return {
    from: config.from ?? "onboarding@resend.dev",
    to: config.to,
    replyTo: input.workEmail,
    subject: `Launch review inquiry — ${input.workEmail}`,
    text: `${input.workEmail} wrote:\n\n${input.launchBlocker}\n`,
  };
}

export async function submitInquiry(
  formValues: Record<string, unknown>,
  config: InquiryConfig,
  sendMail: SendMail,
): Promise<InquiryState> {
  const parsed = inquirySchema.safeParse(formValues);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }

    // A filled honeypot is a bot, not a person to explain validation to.
    if (fieldErrors.company) {
      return { status: "sent" };
    }

    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const mail = buildInquiryMail(parsed.data, config);

  if (!mail) {
    // Misconfigured server. Say so plainly rather than swallow the message.
    return {
      status: "error",
      message: "This form is not connected to an inbox yet. Please reach out on LinkedIn instead.",
    };
  }

  try {
    const result = await sendMail(mail);
    if (result?.error) {
      return { status: "error", message: FALLBACK_ERROR };
    }
    return { status: "sent" };
  } catch {
    return { status: "error", message: FALLBACK_ERROR };
  }
}
