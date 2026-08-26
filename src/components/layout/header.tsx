import Link from "next/link";

import { Container } from "./container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";

// ponytail: no nav. /services, /about, /resources, /domains stay live but unlinked
// until there are receipts to put on them. Add a nav item back, not a page, when there are.
export function Header() {
  return (
    <header className="border-b border-rule/80 bg-white/88 backdrop-blur-xl">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex min-h-11 items-center text-ink transition hover:text-[#533afd]"
        >
          {/* At 320px the 2xl wordmark and the CTA total 304px inside a 288px
              container, so flex-wrap drops the button onto its own row. */}
          <span className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
            wakey<span className="text-[#533afd]">moment</span>
          </span>
        </Link>

        <PrimaryButton href="/contact" className="text-sm">
          Start a review
        </PrimaryButton>
      </Container>
    </header>
  );
}
