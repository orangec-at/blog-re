import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

type ServiceSupportLink = {
  href: string;
  label: string;
};

type ServiceDetailSectionProps = {
  bestFor: string;
  ctaHref: string;
  ctaLabel: string;
  deliveryItems: string[];
  eyebrow: string;
  id: string;
  outcome: string;
  summary: string;
  supportLinks: ServiceSupportLink[];
  title: string;
  tone?: "cream" | "offwhite";
};

export function ServiceDetailSection({
  bestFor,
  ctaHref,
  ctaLabel,
  deliveryItems,
  eyebrow,
  id,
  outcome,
  summary,
  supportLinks,
  title,
  tone = "cream",
}: ServiceDetailSectionProps) {
  const surfaceTone = tone === "cream" ? "offwhite" : "cream";

  return (
    <section id={id} className={tone === "cream" ? "bg-cream py-16 sm:py-20" : "bg-offwhite py-16 sm:py-20"}>
      <Container variant="wide" className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{title}</SectionHeading>
          <BodyText>{summary}</BodyText>
          <div className="space-y-2">
            <Eyebrow>Best for</Eyebrow>
            <BodyText className="text-sm sm:text-base">{bestFor}</BodyText>
          </div>
          <TextLink href={ctaHref}>{ctaLabel}</TextLink>
        </div>

        <div className="grid gap-6">
          <BorderedSurface tone={surfaceTone} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Eyebrow>Outcome</Eyebrow>
              <BodyText className="text-sm sm:text-base">{outcome}</BodyText>
            </div>
            <div className="space-y-2">
              <Eyebrow>What we work through</Eyebrow>
              <ul className="space-y-3">
                {deliveryItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zapier-charcoal sm:text-base">
                    <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 rounded-full bg-zapier-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BorderedSurface>

          <BorderedSurface tone={surfaceTone} className="space-y-4">
            <div className="space-y-2">
              <Eyebrow>Supporting proof</Eyebrow>
              <BodyText className="text-sm sm:text-base">
                Use the linked proof and supporting content to validate the rescue recommendation before you commit to the next step.
              </BodyText>
            </div>
            <div className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <TextLink key={`${id}-${link.href}`} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          </BorderedSurface>
        </div>
      </Container>
    </section>
  );
}
