import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { FormField } from "@/components/ui/forms/form-field";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ContentCta } from "@/data/contact-content";

type InquiryFormShellProps = {
  cta: ContentCta;
};

const inputClasses =
  "min-h-12 w-full rounded-[4px] border border-zapier-sand bg-cream px-4 py-3 text-base text-zapier-black placeholder:text-zapier-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

export function InquiryFormShell({ cta }: InquiryFormShellProps) {
  return (
    <section className="bg-cream py-16 sm:py-20" data-testid="contact-inquiry-form">
      <Container variant="wide">
        <BorderedSurface as="section" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" tone="offwhite">
          <div className="space-y-4">
            <Eyebrow>Inquiry form</Eyebrow>
            <SectionHeading>Share the launch blocker that brought you here.</SectionHeading>
            <BodyText>
              This shell keeps the diagnosis conversation simple: give us a contact point, describe the risk, and we&apos;ll start from the safest next step.
            </BodyText>
          </div>

          <form className="space-y-5" noValidate onSubmit={(event) => event.preventDefault()}>
            <FormField htmlFor="work-email" label="Work email">
              <input autoComplete="email" className={inputClasses} id="work-email" name="workEmail" type="email" />
            </FormField>

            <FormField htmlFor="launch-blocker" label="What feels brittle, blocked, or risky?">
              <textarea className={`${inputClasses} min-h-32 resize-y`} id="launch-blocker" name="launchBlocker" />
            </FormField>

            <PrimaryButton type="submit">{cta.label}</PrimaryButton>
          </form>
        </BorderedSurface>
      </Container>
    </section>
  );
}
