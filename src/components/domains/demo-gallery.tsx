import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { CardHeader } from "@/components/ui/molecules/card-header";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

export type DemoGalleryItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  kicker: string;
  layout: "full" | "narrow";
};

type DemoGalleryProps = {
  title: string;
  items: DemoGalleryItem[];
  emptyMessage: string;
};

export function DemoGallery({ title, items, emptyMessage }: DemoGalleryProps) {
  return (
    <section data-testid="demo-gallery" className="bg-offwhite py-16">
      <Container variant="wide" className="space-y-6">
        <div className="space-y-2">
          <Eyebrow>Featured demos</Eyebrow>
          <SectionHeading className="text-3xl sm:text-4xl sm:leading-tight">{title}</SectionHeading>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <BorderedSurface
                key={item.id}
                as="article"
                className="flex h-full flex-col gap-4 rounded-2xl"
              >
                <CardHeader body={item.summary} eyebrow={item.kicker} title={item.title} />
                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                  <PillTag className="px-3 py-1 text-xs uppercase">
                    {item.layout} layout
                  </PillTag>
                  <Link href={item.href} className="text-sm font-semibold text-zapier-orange">
                    Open walkthrough →
                  </Link>
                </div>
              </BorderedSurface>
            ))}
          </div>
        ) : (
          <BorderedSurface className="rounded-2xl border-dashed p-8 text-center">
            <BodyText className="text-base sm:text-base">{emptyMessage}</BodyText>
          </BorderedSurface>
        )}
      </Container>
    </section>
  );
}
