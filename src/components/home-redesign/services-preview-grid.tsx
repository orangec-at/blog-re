import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { FeatureCard } from "@/components/ui/molecules/feature-card";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ServiceOffer, ServicesIntro } from "@/data/services-content";

type ServicesPreviewGridProps = {
  intro: ServicesIntro;
  offers: ServiceOffer[];
};

export function ServicesPreviewGrid({ intro, offers }: ServicesPreviewGridProps) {
  return (
    <section className="bg-offwhite py-16 sm:py-20">
      <Container variant="wide" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <SectionHeading>{intro.title}</SectionHeading>
          <BodyText>{intro.body}</BodyText>
          <BodyText className="text-sm sm:text-base">{intro.chooserNote}</BodyText>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <FeatureCard
              key={offer.id}
              body={offer.summary}
              tag={offer.id === "fmv-diagnosis" ? "Start here" : undefined}
              title={offer.name}
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
                <TextLink href={offer.ctaHref}>{offer.ctaLabel}</TextLink>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
