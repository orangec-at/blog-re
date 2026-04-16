import { Container } from "@/components/layout/container";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { ContactGuidance } from "@/data/contact-content";

type WhenToContactUsProps = {
  data: ContactGuidance;
};

export function WhenToContactUs({ data }: WhenToContactUsProps) {
  return (
    <section className="bg-offwhite py-16 sm:py-20" data-testid="contact-guidance">
      <Container variant="wide" className="space-y-8">
        <SectionHeading>{data.title}</SectionHeading>

        <div className="grid gap-6 lg:grid-cols-3">
          {data.items.map((item) => (
            <BorderedSurface key={item.title} as="article" className="space-y-3" tone="cream">
              <SectionHeading as="h3" className="text-2xl sm:text-3xl sm:leading-tight">
                {item.title}
              </SectionHeading>
              <BodyText className="text-sm sm:text-base">{item.body}</BodyText>
            </BorderedSurface>
          ))}
        </div>
      </Container>
    </section>
  );
}
