import { Container } from "@/components/layout/container";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { DisplayHeading } from "@/components/ui/typography/display-heading";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import type { ServicesIntro } from "@/data/services-content";

type ServicesHeroProps = {
  data: ServicesIntro;
};

const diagnosisChecklist = [
  "Review the product story before brittle implementation details derail the launch.",
  "Separate what can be safely repaired from what should be rebuilt with calmer boundaries.",
  "Leave with a rescue recommendation founders can actually act on.",
];

export function ServicesHero({ data }: ServicesHeroProps) {
  return (
    <section className="bg-cream py-16 sm:py-24" data-testid="services-hero">
      <Container
        variant="wide"
        className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start"
      >
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <DisplayHeading>{data.title}</DisplayHeading>
            <BodyText className="max-w-3xl text-lg sm:text-xl">{data.body}</BodyText>
          </div>

          <CTAGroup
            primaryAction={{ href: data.primaryCta.href, label: "Talk through the diagnosis" }}
            secondaryAction={{ href: "/resources", label: "Browse supporting proof" }}
            secondaryVariant="text-link"
          />

          <BodyText className="max-w-3xl text-sm sm:text-base">{data.chooserNote}</BodyText>
        </div>

        <BorderedSurface className="flex flex-col gap-4" tone="offwhite">
          <Eyebrow>Start here</Eyebrow>
          <DisplayHeading as="h2" className="text-3xl sm:text-4xl">
            Diagnosis first. Rescue second.
          </DisplayHeading>
          <BodyText className="text-sm sm:text-base">
            If the MVP feels messy, the safest first move is understanding the failure pattern before choosing an engagement.
          </BodyText>
          <ul className="space-y-3">
            {diagnosisChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zapier-charcoal sm:text-base">
                <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 rounded-full bg-zapier-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </BorderedSurface>
      </Container>
    </section>
  );
}
