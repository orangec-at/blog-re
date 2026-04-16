import { FeaturedInsightRow } from "@/components/home-redesign/featured-insight-row";
import { HomeHero } from "@/components/home-redesign/home-hero";
import { PainPointGrid } from "@/components/home-redesign/pain-point-grid";
import { ProofStatStrip } from "@/components/home-redesign/proof-stat-strip";
import { ServicesPreviewGrid } from "@/components/home-redesign/services-preview-grid";
import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { contactHero } from "@/data/contact-content";
import { homeRescueHero } from "@/data/home-redesign-content";
import { projects } from "@/data/projects";
import { founderHelpItems, resourcesIntro } from "@/data/resources-content";
import { serviceOffers, servicesIntro } from "@/data/services-content";

const proofMetrics = [
  {
    value: String(serviceOffers.length),
    label: "rescue paths founders can choose from",
  },
  {
    value: String(projects.length),
    label: "proof-backed product stories already live on the site",
  },
  {
    value: "FMV",
    label: "diagnosis-first path for teams that need clarity before committing",
  },
];

export default function Home() {
  return (
    <main data-testid="home-page" className="flex flex-col">
      <HomeHero chooserNote={servicesIntro.chooserNote} data={homeRescueHero} />
      <PainPointGrid items={founderHelpItems} />
      <ProofStatStrip metrics={proofMetrics} />
      <ServicesPreviewGrid intro={servicesIntro} offers={serviceOffers} />
      <FeaturedInsightRow items={projects} />

      <section className="bg-cream py-16 sm:py-20">
        <Container variant="wide">
          <BorderedSurface as="section" className="flex flex-col gap-6" tone="offwhite">
            <div className="space-y-4">
              <Eyebrow>Next step</Eyebrow>
              <SectionHeading>Choose the fastest path back to launch</SectionHeading>
              <BodyText>{contactHero.body}</BodyText>
              <BodyText className="text-sm sm:text-base">{resourcesIntro.downloadNote}</BodyText>
            </div>

            <CTAGroup
              primaryAction={{ href: "/services", label: "Review rescue services" }}
              secondaryAction={{ href: "/contact", label: "Talk through the diagnosis" }}
            />

            <TextLink href="/resources">Download proof and resources</TextLink>
          </BorderedSurface>
        </Container>
      </section>
    </main>
  );
}
