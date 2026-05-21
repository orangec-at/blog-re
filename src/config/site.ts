export const siteConfig = {
  name: "wakeymoment",
  title: "wakeymoment — FixMyVibe technical debt rescue",
  description:
    "Founder-friendly technical debt diagnosis, remodeling, and launch-readiness support for AI-built MVPs.",
  url: "https://wakeymoment.vercel.app",
  locale: "en",
  defaultOgImage: "/og/default.png",
  contactPath: "/contact",
  disallowedPlaceholders: ["hello@example.com", "example.com", "TODO", "TBD"],
} as const;

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${path}`;
}

export function isPlaceholderContact(value: string): boolean {
  return siteConfig.disallowedPlaceholders.some((placeholder) =>
    value.toLowerCase().includes(placeholder.toLowerCase()),
  );
}
