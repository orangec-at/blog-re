import { ServicePackageCard } from "@/components/marketing/service-package-card";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="grid gap-8 lg:grid-cols-[0.95fr_2fr] lg:items-end">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <SectionHeading>{intro.title}</SectionHeading>
            <BodyText>{intro.body}</BodyText>
          </div>
          <Card className="border-[#b9b9f9] bg-cream px-5 py-4">
            <div className="grid gap-3 text-sm text-zapier-charcoal sm:grid-cols-[0.7fr_1fr] sm:items-center">
              <Badge variant="label">Chooser note</Badge>
              <span>{intro.chooserNote}</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <ServicePackageCard
              key={offer.id}
              offer={offer}
              packageNumber={index + 1}
              startHere={offer.id === "fmv-diagnosis"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
