import { Container } from "@/components/layout/container";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { DisplayHeading } from "@/components/ui/typography/display-heading";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import type { HomeRescueHero } from "@/data/home-redesign-content";

type HomeHeroProps = {
  chooserNote: string;
  data: HomeRescueHero;
};

const starterChecklist = [
  "Find the brittle AI-generated shortcuts that are blocking the launch.",
  "Choose the right rescue path before you waste time on a rewrite.",
  "Leave with a calmer plan for product, code, and delivery.",
];

export function HomeHero({ chooserNote, data }: HomeHeroProps) {
  return (
    <section className="bg-cream py-16 sm:py-24" data-testid="home-redesign-hero">
      <Container variant="wide" className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <DisplayHeading>{data.title}</DisplayHeading>
            <BodyText className="max-w-2xl text-lg sm:text-xl">{data.subtitle}</BodyText>
          </div>

          <CTAGroup
            primaryAction={data.primaryCta}
            secondaryAction={data.secondaryCta}
            secondaryVariant="text-link"
          />

          <BodyText className="max-w-2xl text-sm sm:text-base">{chooserNote}</BodyText>
        </div>

        <BorderedSurface className="flex flex-col gap-4" tone="offwhite">
          <Eyebrow>What happens first</Eyebrow>
          <DisplayHeading as="h2" className="text-3xl sm:text-4xl">
            Start with FMV diagnosis.
          </DisplayHeading>
          <BodyText className="text-sm sm:text-base">
            We review the product story, the code paths AI assembled, and the launch blockers that keep the MVP from surviving real use.
          </BodyText>
          <ul className="space-y-3">
            {starterChecklist.map((item) => (
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
