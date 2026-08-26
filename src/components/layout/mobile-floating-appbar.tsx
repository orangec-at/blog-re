"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ChipGroup, InteractiveChip } from "@/components/ui/chip";

// Mirrors the header's nav so the two never disagree about what the site links
// to. /services is gone from here for the same reason it is gone from there: it
// is written in Korean and this buyer reads English.
const mobileNavItems = [
  { href: "/posts", label: "Proof" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const productArticleSlugs = new Set([
  "/posts/ai-mvp-launch-checklist",
  "/posts/ai-mvp-technical-debt-audit-sample-report",
]);

export function MobileFloatingAppbar() {
  const pathname = usePathname();

  if (productArticleSlugs.has(pathname)) {
    return null;
  }

  return <MobileFloatingAppbarFrame floating />;
}

type MobileFloatingAppbarFrameProps = {
  floating?: boolean;
};

export function MobileFloatingAppbarFrame({ floating = false }: MobileFloatingAppbarFrameProps) {
  return (
    <div className={floating ? "fixed inset-x-0 bottom-4 z-40 px-4 md:hidden" : "px-4 py-4"}>
      <nav
        aria-label="Mobile primary navigation"
        className="mx-auto flex max-w-xl items-center justify-between gap-3 rounded-[28px] border border-rule bg-paper/95 px-3 py-3 shadow-[0_12px_40px_rgba(32,21,21,0.12)] backdrop-blur"
      >
        <ChipGroup className="flex-1">
          {mobileNavItems.map((item) => (
            <InteractiveChip key={item.href} href={item.href} size="sm">
              {item.label}
            </InteractiveChip>
          ))}
        </ChipGroup>

        <Button className="shrink-0" href="/contact" size="sm" variant="primary">
          Start a review
        </Button>
      </nav>
    </div>
  );
}
