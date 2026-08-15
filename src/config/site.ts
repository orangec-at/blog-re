// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build and runtime, in previews too,
// and resolves it to the shortest production custom domain once one exists. Hardcoding
// the domain here is what pointed every canonical, og:image and sitemap entry at a
// project that had been deleted. The fallback only applies off Vercel.
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = productionDomain ? `https://${productionDomain}` : "https://wakeymoment.vercel.app";

export const siteConfig = {
  name: "wakeymoment",
  title: "wakeymoment — FixMyVibe technical debt rescue",
  description:
    "Founder-friendly technical debt diagnosis, remodeling, and launch-readiness support for AI-built MVPs.",
  url: siteUrl,
  locale: "en",
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
