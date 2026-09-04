import Link from "next/link";

import { Container } from "./container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";

// The nav stayed empty while the inner pages had no receipts to put on it. Two
// now do: /posts carries the published sample report and the checklist, /about
// carries the grounds the "Why me" section stands on.
//
// Three pages are still deliberately unlinked. /services and /resources are
// written in Korean and this site's buyer arrives from Upwork in English, so a
// nav item would walk him into a page he cannot read. /domains is English but is
// DrawHatha and infrastructure work — real, and not what this page is selling.
// Add an item when a page can answer the question its label makes.
const navItems = [
  { href: "/posts", label: "Proof" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  return (
    <header className="border-b border-rule/80 bg-white/88 backdrop-blur-xl">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex min-h-11 items-center text-ink transition hover:text-ink-muted"
        >
          {/* The mark is a lens aperture: the blades break at the upper right, and the red
              dot is what that blind spot was hiding. Never animate it — it is not a spinner. */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
            className="mr-2.5 size-7 shrink-0 sm:size-8"
          >
            <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
              <line x1="50.00" y1="25.00" x2="50.00" y2="16.00" />
              <line x1="59.57" y1="26.90" x2="63.01" y2="18.59" />
              <line x1="73.10" y1="59.57" x2="81.41" y2="63.01" />
              <line x1="67.68" y1="67.68" x2="74.04" y2="74.04" />
              <line x1="59.57" y1="73.10" x2="63.01" y2="81.41" />
              <line x1="50.00" y1="75.00" x2="50.00" y2="84.00" />
              <line x1="40.43" y1="73.10" x2="36.99" y2="81.41" />
              <line x1="32.32" y1="67.68" x2="25.96" y2="74.04" />
              <line x1="26.90" y1="59.57" x2="18.59" y2="63.01" />
              <line x1="25.00" y1="50.00" x2="16.00" y2="50.00" />
              <line x1="26.90" y1="40.43" x2="18.59" y2="36.99" />
              <line x1="32.32" y1="32.32" x2="25.96" y2="25.96" />
              <line x1="40.43" y1="26.90" x2="36.99" y2="18.59" />
            </g>
            <circle cx="55" cy="45" r="5" fill="#d7402b" />
          </svg>
          {/* The name went from three characters to nine on 2026-09-04, which
              cost the mark 50px: measured at 320px it is 122px wide against 72
              before, and 143 against 83 at 640. Both still sit on one row with
              the CTA — 237px of content inside a 288px container — and neither
              width overflows. The container keeps flex-wrap so the button drops
              to its own row rather than overflowing if the name grows again. */}
          <span className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
            vibeguard<span className="text-[#d7402b]">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          {/* Hidden below sm, where the floating appbar carries the same links. */}
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-ink-muted transition hover:text-ink"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <PrimaryButton href="/contact" className="text-sm">
            Start a review
          </PrimaryButton>
        </div>
      </Container>
    </header>
  );
}
