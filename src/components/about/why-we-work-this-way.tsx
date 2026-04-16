import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

const principles = [
  "Launch blockers usually span product framing, UX proof, and architecture at the same time.",
  "Diagnosis only helps if it turns into clear priorities, believable demos, and code decisions the team can ship.",
  "Founders move faster when one partner can translate between roadmap pressure and technical reality without drama.",
];

export function WhyWeWorkThisWay() {
  return (
    <BorderedSurface as="section" className="flex h-full flex-col gap-6" tone="cream">
      <div className="space-y-3">
        <Eyebrow>Why we work this way</Eyebrow>
        <SectionHeading>Why we work this way</SectionHeading>
        <BodyText>
          Most rescue work stalls when strategy, implementation, and communication are split across too many
          people. The structure here stays intentionally small so the recommendation can survive contact with
          the codebase and the launch timeline.
        </BodyText>
      </div>

      <ul className="space-y-3">
        {principles.map((principle) => (
          <li key={principle} className="rounded-lg border border-zapier-sand bg-offwhite px-4 py-3 text-sm text-zapier-charcoal sm:text-base">
            {principle}
          </li>
        ))}
      </ul>
    </BorderedSurface>
  );
}
