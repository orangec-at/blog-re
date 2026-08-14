import { Container } from "./container";
import { siteConfig } from "@/config/site";

// ponytail: no mailto until there is a real inbox. hello@example.com was a placeholder
// and site.ts already lists it as disallowed — /contact is the only honest path today.
const links = [
  { label: "Contact", href: siteConfig.contactPath },
  { label: "Github", href: "https://github.com/orangec-at" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/orangec-at" },
];

export function Footer() {
  return (
    <footer className="bg-zapier-black text-cream">
      <Container className="flex flex-col gap-6 py-10">
        <div className="flex flex-wrap gap-4 text-sm">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full border border-zapier-sand px-4 py-2 text-cream transition hover:bg-cream hover:text-zapier-black"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-zapier-gray">
          © {siteConfig.name} {new Date().getFullYear()}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
