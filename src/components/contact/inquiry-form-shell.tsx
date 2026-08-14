"use client";

import { useActionState } from "react";

import { submitInquiryAction } from "@/app/contact/actions";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { FormField } from "@/components/ui/forms/form-field";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ContentCta } from "@/data/contact-content";
import type { InquiryState } from "@/lib/contact-inquiry";

type InquiryFormShellProps = {
  cta: ContentCta;
};

const inputClasses =
  "min-h-12 w-full rounded-[4px] border border-zapier-sand bg-cream px-4 py-3 text-base text-zapier-black placeholder:text-zapier-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const initialState: InquiryState = { status: "idle" };

export function InquiryFormShell({ cta }: InquiryFormShellProps) {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, initialState);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <section className="bg-cream py-16 sm:py-20" data-testid="contact-inquiry-form">
      <Container variant="wide">
        <BorderedSurface as="section" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" tone="offwhite">
          <div className="space-y-4">
            <Eyebrow>Inquiry form</Eyebrow>
            <SectionHeading>Share the launch blocker that brought you here.</SectionHeading>
            <BodyText>
              Give us a contact point and describe the risk. We reply from a real inbox, and we start from the safest next step.
            </BodyText>
          </div>

          {state.status === "sent" ? (
            <div className="flex flex-col gap-3" role="status">
              <SectionHeading>Message received.</SectionHeading>
              <BodyText>
                We read every inquiry ourselves and reply to the address you gave us. If nothing arrives within a few days, the message did not reach us — try again or reach out on LinkedIn.
              </BodyText>
            </div>
          ) : (
            <form action={formAction} className="space-y-5" noValidate>
              {state.status === "error" ? (
                <BodyText className="text-sm text-[#b45309] sm:text-sm" role="alert">
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
                {isPending ? "Sending…" : cta.label}
              </PrimaryButton>
            </form>
          )}
        </BorderedSurface>
      </Container>
    </section>
  );
}
