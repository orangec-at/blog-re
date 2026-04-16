import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { FeatureCard } from "@/components/ui/molecules/feature-card";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ServiceOffer } from "@/data/services-content";

type ServiceDecisionGridProps = {
  offers: ServiceOffer[];
};

export function ServiceDecisionGrid({ offers }: ServiceDecisionGridProps) {
  return (
    <section className="bg-offwhite py-16 sm:py-20" data-testid="service-decision-grid">
      <Container variant="wide" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>Start-here chooser</Eyebrow>
          <SectionHeading>Choose the rescue path that matches the current risk</SectionHeading>
          <BodyText>The diagnosis-first path keeps uncertain founders from overcommitting before the rescue scope is clear.</BodyText>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <FeatureCard
              key={offer.id}
              body={offer.summary}
              tag={offer.id === "fmv-diagnosis" ? "Recommended first step" : "Escalate when needed"}
              title={offer.id === "fmv-diagnosis" ? "FMV Diagnosis snapshot" : offer.id === "architecture-fix" ? "Architecture Fix snapshot" : "Virtual CTO snapshot"}
              tone="cream"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Eyebrow as="span">Best for</Eyebrow>
                  <BodyText className="text-sm sm:text-base">{offer.bestFor}</BodyText>
                </div>
                <div className="space-y-2">
                  <Eyebrow as="span">Outcome</Eyebrow>
                  <BodyText className="text-sm sm:text-base">{offer.outcome}</BodyText>
                </div>
                <TextLink href={`#${offer.id}`}>{offer.ctaLabel}</TextLink>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
