import Link from "next/link";

import { Container } from "./container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";

// ponytail: no nav. /services, /about, /resources, /domains stay live but unlinked
// until there are receipts to put on them. Add a nav item back, not a page, when there are.
export function Header() {
  return (
    <header className="border-b border-zapier-sand/80 bg-white/88 backdrop-blur-xl">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex min-h-11 items-center text-zapier-black transition hover:text-[#533afd]"
        >
          <span className="text-2xl font-semibold tracking-[-0.04em]">
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
