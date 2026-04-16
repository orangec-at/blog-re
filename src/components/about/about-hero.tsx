import { Container } from "@/components/layout/container";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

export function AboutHero() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container variant="wide" className="space-y-6">
        <div className="max-w-4xl space-y-4">
          <Eyebrow>About</Eyebrow>
          <h1 className="font-sans text-4xl font-medium leading-tight text-zapier-black sm:text-6xl sm:leading-[1.02]">
            Small team, senior product and architecture judgment
          </h1>
          <BodyText className="max-w-3xl">
            Wakeymoment is a founder-facing AI MVP rescue practice. We step in when launch plans drift,
            product decisions lose technical grounding, or the story no longer matches what the software can
            actually support.
          </BodyText>
        </div>

      </Container>
    </section>
  );
}
