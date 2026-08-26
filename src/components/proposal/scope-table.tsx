type ScopeTableProps = {
  included: readonly string[];
  excluded: readonly string[];
};

// ponytail: two lists, not a table element. Nothing here is tabular data — the
// exclusions have no matching column, they are their own list.
export function ScopeTable({ included, excluded }: ScopeTableProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">What this includes</h3>
        <ul className="flex flex-col gap-2">
          {included.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-ink">{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">What this does not include</h3>
        <ul className="flex flex-col gap-2">
          {excluded.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-deferred">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
