import { Container } from "@/components/layout/container";

type ProposalSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ProposalSection({ number, title, children, className = "" }: ProposalSectionProps) {
  const headingId = `section-${number}`;

  return (
    <section aria-labelledby={headingId} className={`border-t border-rule py-16 sm:py-24 ${className}`}>
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
          {/* The number sits in the margin like a report's section mark. aria-hidden
              keeps it out of the heading's accessible name. */}
          <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
            {number}
          </p>

          <div className="flex flex-col gap-6">
            <h2 id={headingId} className="font-display text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">
              {title}
            </h2>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
