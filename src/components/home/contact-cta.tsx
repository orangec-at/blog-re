import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { SecondaryButton } from "@/components/ui/actions/secondary-button";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ContactCTA } from "@/data/homepage-content";

type ContactCtaProps = {
  data: ContactCTA;
};

export function ContactCta({ data }: ContactCtaProps) {
  const { title, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref } = data;

  return (
    <section data-testid="contact-cta" className="bg-zapier-black py-16 text-cream">
      <Container variant="wide">
        <BorderedSurface className="rounded-2xl bg-zapier-charcoal p-8 text-cream">
          <div className="space-y-4">
            <Eyebrow>Let’s refactor together</Eyebrow>
            <SectionHeading className="text-3xl text-cream sm:text-4xl sm:leading-tight">{title}</SectionHeading>
            <BodyText className="text-base text-cream/80 sm:text-base sm:leading-6">{body}</BodyText>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton className="rounded-lg px-6 py-3 text-base" href={primaryHref}>
              {primaryLabel}
            </PrimaryButton>
            <SecondaryButton
              className="border-zapier-sand bg-transparent px-6 py-3 text-base text-cream hover:bg-zapier-sand hover:text-zapier-black"
              href={secondaryHref}
            >
              {secondaryLabel}
            </SecondaryButton>
          </div>
        </BorderedSurface>
      </Container>
    </section>
  );
}
