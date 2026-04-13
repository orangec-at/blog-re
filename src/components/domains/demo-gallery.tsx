import Link from "next/link";
import { Container } from "@/components/layout/container";

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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            Featured demos
          </p>
          <h2 className="text-3xl font-semibold text-zapier-black">{title}</h2>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col gap-4 rounded-2xl border border-zapier-sand bg-cream p-6"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
                    {item.kicker}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-zapier-black">{item.title}</h3>
                </div>
                <p className="text-zapier-charcoal">{item.summary}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                  <span className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium uppercase text-zapier-charcoal">
                    {item.layout} layout
                  </span>
                  <Link href={item.href} className="text-sm font-semibold text-zapier-orange">
                    Open walkthrough →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zapier-sand bg-cream p-8 text-center">
            <p className="text-base text-zapier-charcoal">{emptyMessage}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
