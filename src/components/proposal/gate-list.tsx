type GateListProps = {
  gates: readonly { name: string; failureMode: string; auditQuestion: string }[];
};

export function GateList({ gates }: GateListProps) {
  return (
    <ul className="flex flex-col">
      {gates.map((gate) => (
        <li key={gate.name} className="grid gap-2 border-t border-rule py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
          <p className="font-mono text-sm text-ink">{gate.name}</p>

          <div className="flex flex-col gap-1">
            <p className="text-sm leading-relaxed text-ink-muted">{gate.failureMode}</p>
            <p className="text-sm leading-relaxed text-ink">{gate.auditQuestion}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
