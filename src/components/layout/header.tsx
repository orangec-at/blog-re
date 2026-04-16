import Link from "next/link";

import { Container } from "./container";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { PillTag } from "@/components/ui/feedback/pill-tag";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Proof" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-zapier-sand bg-cream">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-zapier-black transition hover:text-zapier-charcoal"
        >
          <span className="text-2xl font-semibold">
            wakey<span className="text-zapier-orange">moment</span>
          </span>
          <PillTag className="border-zapier-orange/20 bg-[#fff2ea] text-xs font-semibold uppercase tracking-[0.5px] text-zapier-black">
            AI MVP Rescue
          </PillTag>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zapier-charcoal md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-zapier-black">
              {item.label}
            </Link>
          ))}
        </nav>

        <PrimaryButton href="/contact" className="text-sm">
          Start with Diagnosis
        </PrimaryButton>
      </Container>
    </header>
  );
}
