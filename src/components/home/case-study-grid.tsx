import Link from "next/link";
import { Container } from "@/components/layout/container";
import type { CaseStudy } from "@/data/homepage-content";

type CaseStudyGridProps = {
  caseStudies: CaseStudy[];
};

export function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  return (
    <section data-testid="case-study-grid" className="bg-cream py-16">
      <Container variant="wide" className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zapier-gray">Case Studies</p>
          <h2 className="text-3xl font-semibold text-zapier-black">
            Recent refactors and domain work
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="flex h-full flex-col gap-4 rounded-lg border border-zapier-sand bg-offwhite p-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-zapier-black">{study.name}</h3>
                <p className="text-sm text-zapier-gray">{study.headline}</p>
              </div>
              <p className="text-sm text-zapier-charcoal">{study.summary}</p>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium text-zapier-charcoal"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <Link
                  href={study.ctaHref}
                  className="inline-flex items-center text-sm font-semibold text-zapier-orange"
                >
                  {study.ctaLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
