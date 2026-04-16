import { FinalServicesCta } from "@/components/services/final-services-cta";
import { ServiceDecisionGrid } from "@/components/services/service-decision-grid";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ServicesHero } from "@/components/services/services-hero";
import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { projects } from "@/data/projects";
import { serviceOffers, servicesIntro } from "@/data/services-content";

const proofLinks = [
  {
    href: "/resources",
    label: "Resources overview and portfolio PDF",
    summary: "A quick way to review capabilities, launch support, and founder-friendly delivery notes before a call.",
  },
  {
    href: "/posts",
    label: "Posts and supporting write-ups",
    summary: "Use the writing archive when you want deeper implementation thinking, migration notes, and launch commentary.",
  },
  ...projects.map((project) => ({
    href: project.links[0]?.href ?? "/posts",
    label: `${project.name} proof path`,
    summary: project.summary,
  })),
];

const servicePlans = {
  "fmv-diagnosis": {
    deliveryItems: [
      "Founding story and launch blockers mapped into a decision memo.",
      "AI-generated code paths reviewed for brittleness, hidden coupling, and trust gaps.",
      "A clear recommendation on whether to stay with diagnosis, move into architecture work, or add ongoing CTO support.",
    ],
    supportLinks: [
      { href: "/resources", label: "Review the supporting resources" },
      { href: "/posts", label: "Scan the implementation writing archive" },
      { href: "/domains/fixmyvibe", label: "See a product-story proof path" },
    ],
  },
  "architecture-fix": {
    deliveryItems: [
      "Fragile flows rebuilt around simpler boundaries and more trustworthy implementation seams.",
      "Refactor priorities organized so the team can ship the next milestone without guessing.",
      "Launch notes and handoff guidance documented in the repo instead of buried in calls.",
    ],
    supportLinks: [
      { href: "/domains/drawhatha", label: "Read an architecture-note example" },
      { href: "/domains/iac", label: "Review infrastructure cleanup proof" },
      { href: "/resources", label: "See the supporting capability overview" },
    ],
  },
  "virtual-cto": {
    deliveryItems: [
      "Founders get steady technical translation for priorities, tradeoffs, and delivery sequencing.",
      "Architecture decisions stay connected to launch goals instead of drifting into endless cleanup.",
      "The team gets ongoing clarity about what to build next, what to defer, and how to keep risk visible.",
    ],
    supportLinks: [
      { href: "/posts", label: "Browse strategy and delivery posts" },
      { href: "/domains/fixmyvibe", label: "See founder-facing proof content" },
      { href: "/resources", label: "Use the resources page as a quick brief" },
    ],
  },
} satisfies Record<
  (typeof serviceOffers)[number]["id"],
  {
    deliveryItems: string[];
    supportLinks: Array<{ href: string; label: string }>;
  }
>;

export default function ServicesPage() {
  return (
    <main className="flex flex-col" data-testid="services-page">
      <ServicesHero data={servicesIntro} />
      <ServiceDecisionGrid offers={serviceOffers} />

      {serviceOffers.map((offer, index) => {
        const plan = servicePlans[offer.id as keyof typeof servicePlans];

        return (
          <ServiceDetailSection
            key={offer.id}
            bestFor={offer.bestFor}
            ctaHref={offer.ctaHref}
            ctaLabel={offer.ctaLabel}
            deliveryItems={plan.deliveryItems}
            eyebrow={index === 0 ? "Diagnosis-first rescue" : index === 1 ? "Implementation rescue" : "Ongoing founder support"}
            id={offer.id}
            outcome={offer.outcome}
            summary={offer.summary}
            supportLinks={plan.supportLinks}
            title={offer.name}
            tone={index % 2 === 0 ? "cream" : "offwhite"}
          />
        );
      })}

      <section className="bg-offwhite py-16 sm:py-20">
        <Container variant="wide" className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Proof and supporting content</Eyebrow>
            <SectionHeading>Use the existing proof before you commit to the rescue lane.</SectionHeading>
            <BodyText>
              The redesign keeps the repo&apos;s proof content visible so founders can check domain pages, supporting resources, and implementation writing before the next conversation.
            </BodyText>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {proofLinks.map((link) => (
              <BorderedSurface key={link.href} as="article" className="flex h-full flex-col gap-4" tone="cream">
                <div className="space-y-2">
                  <SectionHeading as="h3" className="text-2xl sm:text-3xl sm:leading-tight">
                    {link.label}
                  </SectionHeading>
                  <BodyText className="text-sm sm:text-base">{link.summary}</BodyText>
                </div>
                <div className="mt-auto">
                  <TextLink href={link.href}>Open supporting content</TextLink>
                </div>
              </BorderedSurface>
            ))}
          </div>
        </Container>
      </section>

      <FinalServicesCta diagnosisHref={servicesIntro.primaryCta.href} />
    </main>
  );
}
