import { Container } from "./container";

const socials = [
  { label: "Github", href: "https://github.com/orangec-at" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/orangec-at" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function Footer() {
  return (
    <footer className="bg-zapier-black text-cream">
      <Container className="flex flex-col gap-6 py-10">
        <div>
          <p className="text-lg font-semibold">I do bilingual refactors.</p>
          <p className="text-zapier-gray">English & Korean systems, same precision.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full border border-zapier-sand px-4 py-2 text-cream transition hover:bg-cream hover:text-zapier-black"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-zapier-gray">© {new Date().getFullYear()} blog-re. All rights reserved.</p>
      </Container>
    </footer>
  );
}
