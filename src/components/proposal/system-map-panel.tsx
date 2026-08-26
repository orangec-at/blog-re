type SystemMapPanelProps = {
  layers: readonly { name: string }[];
  boundaries: readonly { id: string; between: string; auditQuestion: string }[];
  argument: string;
};

// The only dark surface on the site. It holds the drawing and nothing else —
// see DESIGN.md, "The dark panel".
export function SystemMapPanel({ layers, boundaries, argument }: SystemMapPanelProps) {
  return (
    <div className="flex flex-col gap-8 bg-panel-dark p-6 sm:p-10">
      <ol className="flex flex-col gap-px" data-testid="system-map-layers">
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className="border border-panel-dark-muted/30 px-4 py-3 font-mono text-sm text-paper"
            style={{ marginInline: `${index * 0.5}rem` }}
          >
            {layer.name}
          </li>
        ))}
      </ol>

      <p className="max-w-xl font-display text-lg text-paper">{argument}</p>

      <ul className="flex flex-col gap-4 border-t border-panel-dark-muted/30 pt-6">
        {boundaries.map((boundary) => (
          <li key={boundary.id} className="grid gap-1 sm:grid-cols-[2rem_minmax(0,1fr)]">
            <span aria-hidden="true" className="font-mono text-xs text-p0">{boundary.id}</span>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm text-paper">{boundary.between}</p>
              <p className="text-sm leading-relaxed text-panel-dark-muted">{boundary.auditQuestion}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
