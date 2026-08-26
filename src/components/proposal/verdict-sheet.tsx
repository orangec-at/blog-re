type VerdictSheetProps = {
  title: string;
  sampleNotice: string;
  sections: readonly { heading: string; body: string }[];
};

// The artifact shown rather than described. This is what stands in for
// testimonials until there are customers: seeing what arrives is a stronger
// claim than a stranger saying it was good.
export function VerdictSheet({ title, sampleNotice, sections }: VerdictSheetProps) {
  return (
    <figure className="m-0 max-w-2xl border border-rule bg-paper">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-6 py-4">
        <h3 className="font-display text-lg font-normal text-ink">{title}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-p1">{sampleNotice}</p>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6">
        {sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-1">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{section.heading}</h4>
            <p className="text-sm leading-relaxed text-ink">{section.body}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
