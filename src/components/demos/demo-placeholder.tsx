type DemoPlaceholderProps = {
  title: string;
  description: string;
};

export default function DemoPlaceholder({ title, description }: DemoPlaceholderProps) {
  return (
    <div className="rounded-lg border border-rule bg-paper p-6">
      <p className="text-sm uppercase tracking-wide text-ink-muted">Demo</p>
      <h3 className="text-2xl font-semibold text-ink">{title}</h3>
      <p className="text-ink">{description}</p>
      <div className="mt-4 rounded-lg border border-dashed border-rule p-4 text-sm text-ink-muted">
        Interactive demo preview goes here.
      </div>
    </div>
  );
}
