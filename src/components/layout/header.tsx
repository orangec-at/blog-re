import Link from "next/link";

import { Container } from "./container";
import { MobileFloatingAppbar } from "./mobile-floating-appbar";
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
    <>
      <header className="border-b border-zapier-sand/80 bg-white/88 backdrop-blur-xl">
        <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 text-zapier-black transition hover:text-[#533afd]"
          >
            <span className="text-2xl font-semibold tracking-[-0.04em]">
              wakey<span className="text-[#533afd]">moment</span>
            </span>
            <PillTag className="rounded-[5px] border-[#d6d9fc] bg-[#f4f7ff] text-xs font-medium uppercase tracking-[0.5px] text-[#533afd]">
              AI MVP Rescue
            </PillTag>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zapier-charcoal md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 min-w-11 items-center justify-center transition hover:text-[#533afd]">
                {item.label}
              </Link>
            ))}
          </nav>

          <PrimaryButton href="/contact" className="text-sm">
            기술 부채 진단 문의하기
          </PrimaryButton>
        </Container>
      </header>
      <MobileFloatingAppbar />
    </>
  );
}
