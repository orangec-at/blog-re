import type { ReactNode } from "react";

import { BodyText, Eyebrow } from "@/components/ui/typography";

type ConsolePanelProps = {
  children: ReactNode;
  className?: string;
  heading: string;
  kicker?: string;
  summary?: string;
  aside?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ConsolePanel({ aside, children, className, heading, kicker, summary }: ConsolePanelProps) {
  return (
    <section
      className={joinClasses(
        "overflow-hidden rounded-[28px] border border-zapier-black bg-[#1b1614] text-cream",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zapier-sand bg-[#f7efe7] px-6 py-5">
        <div className="max-w-xl space-y-3">
          {kicker ? <Eyebrow className="text-zapier-orange">{kicker}</Eyebrow> : null}
          <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-zapier-black sm:text-3xl">{heading}</h2>
          {summary ? (
            <BodyText className="text-sm leading-6 text-zapier-charcoal sm:text-base">{summary}</BodyText>
          ) : null}
        </div>

        {aside ? <div>{aside}</div> : null}
      </div>

      <div className="bg-[#1b1614]">{children}</div>
    </section>
  );
}
