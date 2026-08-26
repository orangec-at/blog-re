import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { TeamSnapshot } from "@/components/about/team-snapshot";
import { WhyWeWorkThisWay } from "@/components/about/why-we-work-this-way";
import { Container } from "@/components/layout/container";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how wakeymoment supports founder-led launches with practical technical judgment and safer productization.",
  alternates: { canonical: "/about" },
};


export default function AboutPage() {
  return (
    <div className="flex flex-col" data-testid="about-page">
      <AboutHero />

      <section className="bg-paper pb-16 sm:pb-20">
        <Container variant="wide" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <TeamSnapshot />
          <WhyWeWorkThisWay />
        </Container>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-20">
        <Container variant="wide">
          <BorderedSurface as="section" className="flex flex-col gap-6" tone="offwhite">
            <div className="space-y-3">
              <Eyebrow>Next step</Eyebrow>
              <SectionHeading>Need founder-facing technical judgment for the next launch decision?</SectionHeading>
              <BodyText>
                Start with the diagnosis when you need clarity on what to fix first, how much rescue work is
                actually required, and which proof path will help the team ship again.
              </BodyText>
            </div>

            <CTAGroup
              primaryAction={{ href: "/contact", label: "Start with diagnosis" }}
              secondaryAction={{ href: "/posts", label: "Read the field notes" }}
            />
          </BorderedSurface>
        </Container>
      </section>
    </div>
  );
}
