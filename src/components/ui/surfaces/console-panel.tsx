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
        "overflow-hidden rounded-[8px] border border-zapier-sand bg-[#1c1e54] text-white",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 bg-[#fbfcff] px-6 py-4 text-[#061b31]">
        <div className="max-w-xl space-y-3">
          {kicker ? <Eyebrow className="text-[#533afd]">{kicker}</Eyebrow> : null}
          <h2 className="font-sans text-2xl font-normal tracking-[-0.04em] text-[#061b31] sm:text-3xl">{heading}</h2>
          {summary ? (
            <BodyText className="text-sm leading-6 text-[#64748d] sm:text-base">{summary}</BodyText>
          ) : null}
        </div>

        {aside ? <div>{aside}</div> : null}
      </div>

      <div className="bg-[#1c1e54]">{children}</div>
    </section>
  );
}
