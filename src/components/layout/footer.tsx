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
    <footer className="bg-ink text-paper">
      <Container className="flex flex-col gap-6 py-10">
        <div className="flex flex-wrap gap-4 text-sm">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full border border-rule px-4 text-paper transition hover:bg-paper hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-panel-dark-muted">
          © {siteConfig.name} {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-panel-dark-muted">
          wakeymoment · launch-readiness review · rev. 2026-08
        </p>
      </Container>
    </footer>
  );
}
