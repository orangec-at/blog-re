import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

const snapshotItems = [
  {
    title: "Product and architecture in one thread",
    body: "Strategy, scope, and implementation tradeoffs stay connected instead of being handed off between separate advisors.",
  },
  {
    title: "Hands-on rescue delivery",
    body: "When the fastest path is shipping, the same team can move from diagnosis into code, demos, and launch proof.",
  },
  {
    title: "Founder-ready communication",
    body: "You get direct answers about risk, sequencing, and technical constraints without a translation gap.",
  },
];

export function TeamSnapshot() {
  return (
    <BorderedSurface as="section" className="flex h-full flex-col gap-6" tone="offwhite">
      <div className="space-y-3">
        <Eyebrow>Team snapshot</Eyebrow>
        <SectionHeading>Team snapshot</SectionHeading>
        <BodyText className="text-sm sm:text-base">
          Architecture decisions and PM communication stay in the same conversation, so founders do not
          lose context between roadmap choices and implementation reality.
        </BodyText>
      </div>

      <div className="grid gap-4">
        {snapshotItems.map((item) => (
          <article key={item.title} className="rounded-lg border border-zapier-sand bg-cream p-4">
            <h3 className="text-lg font-semibold text-zapier-black">{item.title}</h3>
            <BodyText className="mt-2 text-sm sm:text-base">{item.body}</BodyText>
          </article>
        ))}
      </div>
    </BorderedSurface>
  );
}
