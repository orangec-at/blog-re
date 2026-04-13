import { Container } from "@/components/layout/container";
import type { RefactoringLogEntry } from "@/data/homepage-content";

type RefactoringLogProps = {
  entries: RefactoringLogEntry[];
};

export function RefactoringLog({ entries }: RefactoringLogProps) {
  return (
    <section data-testid="refactoring-log" className="py-16">
      <Container variant="narrow" className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zapier-gray">Refactoring Log</p>
          <h2 className="text-3xl font-semibold text-zapier-black">
            Behind-the-scenes drop notes
          </h2>
        </header>
        <div className="space-y-6">
          {entries.map((entry) => (
            <article
              key={`${entry.title}-${entry.dated}`}
              className="rounded-lg border border-zapier-sand bg-offwhite p-5"
            >
              <p className="text-xs uppercase tracking-wide text-zapier-gray">{entry.dated}</p>
              <h3 className="text-xl font-semibold text-zapier-black">{entry.title}</h3>
              <p className="text-sm text-zapier-charcoal">{entry.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
