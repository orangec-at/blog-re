"use server";

import { Resend } from "resend";

import { submitInquiry, type InquiryState, type SendMail } from "@/lib/contact-inquiry";

const sendWithResend: SendMail = async (mail) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { error: "RESEND_API_KEY is not set" };
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  });
};

export async function submitInquiryAction(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const state = await submitInquiry(
    {
      workEmail: formData.get("workEmail"),
      launchBlocker: formData.get("launchBlocker"),
      company: formData.get("company") ?? "",
    },
    { to: process.env.CONTACT_TO_EMAIL, from: process.env.CONTACT_FROM_EMAIL },
    sendWithResend,
  );

  if (state.status === "error") {
    // The visitor's words are gone from our side either way — make the failure visible in logs.
    console.error("[contact] inquiry not delivered:", state.message);
  }

  return state;
}
