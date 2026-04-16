import { Container } from "@/components/layout/container";
import { BodyText } from "@/components/ui/typography/body-text";
import { DisplayHeading } from "@/components/ui/typography/display-heading";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import type { ContactHero as ContactHeroContent } from "@/data/contact-content";

type ContactHeroProps = {
  data: ContactHeroContent;
};

export function ContactHero({ data }: ContactHeroProps) {
  return (
    <section className="bg-cream py-16 sm:py-24" data-testid="contact-hero">
      <Container variant="wide" className="max-w-4xl space-y-4">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <DisplayHeading>{data.title}</DisplayHeading>
        <BodyText className="max-w-3xl text-lg sm:text-xl">{data.body}</BodyText>
      </Container>
    </section>
  );
}
