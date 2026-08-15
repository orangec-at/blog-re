// Six of six studio references reviewed put something to look at in the service slot;
// text-only cards were the most concrete reason the page read as a template.
// Drawn in SVG and markup rather than shipped as images, so the panels cannot drift
// from the copy and there is no binary asset to maintain.

type ServiceVisualProps = {
  variant: "gate" | "risk-table" | "partner";
};

const GRID_ID = "svc-grid";

function GridField({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-40 w-full overflow-hidden bg-offwhite" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" role="presentation">
        <defs>
          <pattern id={GRID_ID} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#e5edf5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${GRID_ID})`} />
      </svg>
      <div className="relative flex h-full items-center justify-center">{children}</div>
    </div>
  );
}

/** A threshold: the line a build crosses to reach real users. */
function GateMark() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" role="presentation">
      <circle cx="44" cy="44" r="30" fill="none" stroke="#b9c6d6" strokeWidth="3" />
      <path d="M6 44h76" stroke="#b9c6d6" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 20v48" stroke="#533afd" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** Two overlapping frames: the founder's call and ours, held together. */
function PartnerMark() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" role="presentation">
      <rect x="10" y="20" width="46" height="46" rx="6" fill="none" stroke="#b9c6d6" strokeWidth="3" />
      <rect x="32" y="20" width="46" height="46" rx="6" fill="none" stroke="#533afd" strokeWidth="3" opacity="0.55" />
    </svg>
  );
}

// Rows carried over from the published sample report's Go / No-Go table.
const SAMPLE_ROWS = [
  { signal: "Ownership check not proven server-side", level: "P0" },
  { signal: "Secret exposure path unverified", level: "P0" },
  { signal: "Provider failure fails silently", level: "P1" },
  { signal: "Rollback and smoke test undocumented", level: "P1" },
];

/** A real fragment of the sample report, not a picture of one. */
function RiskTable() {
  return (
    <div className="relative h-40 w-full overflow-hidden bg-offwhite px-5 pt-4" aria-hidden="true">
      <p className="mb-2 text-[10px] uppercase tracking-[0.6px] text-zapier-gray">Sample · risk table</p>
      <ul className="space-y-1.5">
        {SAMPLE_ROWS.map((row) => (
          <li key={row.signal} className="flex items-start gap-2 text-[11px] leading-snug text-zapier-charcoal">
            <span
              className={`mt-px shrink-0 rounded-[3px] px-1 py-px text-[9px] font-semibold ${
                row.level === "P0" ? "bg-[#fde8e8] text-[#a12a2a]" : "bg-[#fdf3e0] text-[#8a5a12]"
              }`}
            >
              {row.level}
            </span>
            <span>{row.signal}</span>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-offwhite to-transparent" />
    </div>
  );
}

export function ServiceCardVisual({ variant }: ServiceVisualProps) {
  if (variant === "risk-table") {
    return <RiskTable />;
  }

  return <GridField>{variant === "gate" ? <GateMark /> : <PartnerMark />}</GridField>;
}
