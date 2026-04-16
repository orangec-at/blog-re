import { Container } from "@/components/layout/container";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

type ReassuranceNoteProps = {
  message: string;
};

export function ReassuranceNote({ message }: ReassuranceNoteProps) {
  return (
    <section className="bg-offwhite pb-16 sm:pb-20" data-testid="contact-reassurance-note">
      <Container variant="wide">
        <BorderedSurface className="space-y-3" tone="cream">
          <Eyebrow>Not sure yet?</Eyebrow>
          <BodyText>{message}</BodyText>
        </BorderedSurface>
      </Container>
    </section>
  );
}
