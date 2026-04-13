import Link from "next/link";
import { Container } from "./container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/domains", label: "Domains" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="bg-cream border-b border-zapier-sand">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-zapier-black">
          blog<span className="text-zapier-orange">-re</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-zapier-charcoal md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-zapier-black">
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-lg border border-zapier-sand bg-zapier-orange px-4 py-2 text-sm font-semibold text-cream shadow-tab-active">
          Start a project
        </button>
      </Container>
    </header>
  );
}
