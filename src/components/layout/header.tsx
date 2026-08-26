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
          className="flex min-h-11 items-center text-ink transition hover:text-ink-muted"
        >
          {/* The mark is the aperture: a ring broken at the upper right, because the
              thing you cannot see in your own app is the thing this reviews. */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
            className="mr-2.5 size-7 shrink-0 sm:size-8"
          >
            <path
              d="M 73.75 30.07 A 31 31 0 1 1 44.62 19.47"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <circle cx="42" cy="57" r="12" fill="currentColor" />
            <circle cx="60.60" cy="20.87" r="5" fill="#d7402b" />
          </svg>
          {/* At 320px the 2xl wordmark and the CTA total 304px inside a 288px
              container, so flex-wrap drops the button onto its own row. */}
          <span className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
            fmv<span className="text-[#d7402b]">.</span>
          </span>
        </Link>

        <PrimaryButton href="/contact" className="text-sm">
          Start a review
        </PrimaryButton>
      </Container>
    </header>
  );
}
