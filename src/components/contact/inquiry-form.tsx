"use client";

import { useActionState } from "react";

import { submitInquiryAction } from "@/app/contact/actions";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { FormField } from "@/components/ui/forms/form-field";
import { BodyText } from "@/components/ui/typography/body-text";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { InquiryState } from "@/lib/contact-inquiry";

type InquiryFormProps = {
  ctaLabel: string;
};

const inputClasses =
  "min-h-12 w-full rounded-[4px] border border-rule bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const initialState: InquiryState = { status: "idle" };

export function InquiryForm({ ctaLabel }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, initialState);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <div className="max-w-2xl" data-testid="contact-inquiry-form">
      {state.status === "sent" ? (
        <div className="flex flex-col gap-3" role="status">
          <SectionHeading as="h3" className="text-2xl sm:text-2xl">Message received.</SectionHeading>
          <BodyText>
            I read every inquiry myself and reply to the address you gave. If nothing arrives within a few days, the message did not reach me — try again or reach out on LinkedIn.
          </BodyText>
        </div>
      ) : (
        <form action={formAction} className="space-y-5" noValidate>
          {state.status === "error" ? (
            <BodyText className="text-sm text-p0 sm:text-sm" role="alert">
              {state.message}
            </BodyText>
          ) : null}

          <FormField error={fieldErrors?.workEmail} htmlFor="work-email" label="Work email">
            <input
              autoComplete="email"
              className={inputClasses}
              id="work-email"
              name="workEmail"
              required
              type="email"
            />
          </FormField>

          <FormField
            error={fieldErrors?.launchBlocker}
            htmlFor="launch-blocker"
            label="What feels brittle, blocked, or risky?"
          >
            <textarea
              className={`${inputClasses} min-h-32 resize-y`}
              id="launch-blocker"
              name="launchBlocker"
              required
            />
          </FormField>

          {/* Honeypot. Hidden from people and assistive tech; bots fill it and get dropped. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="company">Company</label>
            <input autoComplete="off" id="company" name="company" tabIndex={-1} type="text" />
          </div>

          <PrimaryButton disabled={isPending} type="submit">
            {isPending ? "Sending…" : ctaLabel}
          </PrimaryButton>
        </form>
      )}
    </div>
  );
}
