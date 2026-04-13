import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoGallery } from "@/components/domains/demo-gallery";
import { DomainHero } from "@/components/domains/domain-hero";
import { Container } from "@/components/layout/container";
import { getAllDomains, getDomainById, getProjectsForDomain } from "@/data/projects";
import { getPostsByDomain } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllDomains().map((domain) => ({ domain: domain.id }));
}

export default async function DomainShowcasePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const showcase = getDomainById(domain);

  if (!showcase) {
    notFound();
  }

  const posts = getPostsByDomain(showcase.id);
  const relatedProjects = getProjectsForDomain(showcase.id);

  return (
    <>
      <DomainHero domain={showcase} />
      <DemoGallery
        title={`${showcase.name} demos and field notes`}
        items={posts.map((post) => ({
          id: post.slug,
          title: post.title,
          summary: post.summary,
          href: post.url,
          kicker: post.domain,
          layout: post.layout,
        }))}
        emptyMessage={`No published demos yet for ${showcase.name}. Browse the linked repos below while the next walkthrough is in progress.`}
      />

      <section className="bg-cream py-12">
        <Container variant="wide" className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
              Associated repos
            </p>
            <h2 className="text-3xl font-semibold text-zapier-black">
              Projects shipping inside this domain
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <article
                key={project.id}
                className="flex h-full flex-col gap-4 rounded-2xl border border-zapier-sand bg-offwhite p-6"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-zapier-black">{project.name}</h3>
                  <p className="text-zapier-charcoal">{project.summary}</p>
                </div>

                <ul className="space-y-2 text-sm text-zapier-charcoal">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-4">
                  {project.links
                    .filter((link) => link.href !== `/domains/${showcase.id}`)
                    .map((link) => (
                      <a
                        key={`${project.id}-${link.label}`}
                        href={link.href}
                        className="text-sm font-semibold text-zapier-orange"
                      >
                        {link.label} →
                      </a>
                    ))}
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-zapier-sand bg-offwhite p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
              Refactoring log
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zapier-black">
              Keep the architecture narrative attached to the demos.
            </h2>
            <p className="mt-2 text-zapier-charcoal">
              Every domain page should point back to the notes, trade-offs, and rollout details that made
              the demo possible.
            </p>
            <Link
              href={showcase.refactoringLogHref}
              className="mt-4 inline-flex text-sm font-semibold text-zapier-orange"
            >
              Read the refactoring log →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
