type DemoPlaceholderProps = {
  title: string;
  description: string;
};

export default function DemoPlaceholder({ title, description }: DemoPlaceholderProps) {
  return (
    <div className="rounded-lg border border-zapier-sand bg-offwhite p-6">
      <p className="text-sm uppercase tracking-wide text-zapier-gray">Demo</p>
      <h3 className="text-2xl font-semibold text-zapier-black">{title}</h3>
      <p className="text-zapier-charcoal">{description}</p>
      <div className="mt-4 rounded-lg border border-dashed border-zapier-sand p-4 text-sm text-zapier-gray">
        Interactive demo preview goes here.
      </div>
    </div>
  );
}
