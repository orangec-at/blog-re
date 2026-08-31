import { BodyText } from "@/components/ui/typography";

type SignalListProps = {
  className?: string;
  headingLevel?: 2 | 3;
  items: string[];
  tone?: "default" | "inverse";
  title: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SignalList({
  className,
  headingLevel = 3,
  items,
  tone = "default",
  title,
}: SignalListProps) {
  const headingClass =
    tone === "inverse"
      ? "font-sans text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-[#fffaf6]"
      : "font-sans text-2xl font-semibold tracking-[-0.02em] text-ink";

  const bodyClass =
    tone === "inverse"
      ? "min-w-0 text-base font-medium leading-7 text-[#fff4ed]"
      : "min-w-0 text-sm leading-6 text-ink sm:text-base";

  const markerClass = tone === "inverse" ? "bg-[#ff9a62]" : "bg-ink";

  const HeadingTag = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={joinClasses("space-y-5", className)}>
      <HeadingTag className={headingClass}>{title}</HeadingTag>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true" className={joinClasses("mt-1 h-2.5 w-2.5 rounded-full", markerClass)} />
            <BodyText as="span" className={bodyClass}>
              {item}
            </BodyText>
          </li>
        ))}
      </ul>
    </div>
  );
}
