import { Container } from "@/components/layout/container";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

type FinalServicesCtaProps = {
  diagnosisHref: string;
};

export function FinalServicesCta({ diagnosisHref }: FinalServicesCtaProps) {
  return (
    <section className="bg-cream py-16 sm:py-20" data-testid="final-services-cta">
      <Container variant="wide">
        <BorderedSurface as="section" className="flex flex-col gap-6" tone="offwhite">
          <div className="space-y-4">
            <Eyebrow>Still unsure?</Eyebrow>
            <SectionHeading>Start with diagnosis and move forward with a calmer plan.</SectionHeading>
            <BodyText>
              If you know the MVP is brittle but do not know whether you need deeper implementation work or ongoing technical leadership, book the diagnosis first and we will route you to the right rescue path.
            </BodyText>
          </div>

          <CTAGroup
            primaryAction={{ href: diagnosisHref, label: "Book a diagnosis call" }}
            secondaryAction={{ href: "/contact", label: "Send the launch blockers" }}
          />
        </BorderedSurface>
      </Container>
    </section>
  );
}
