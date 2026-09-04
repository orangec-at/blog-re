// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build and runtime, in previews too,
// and resolves it to the shortest production custom domain once one exists. Hardcoding
// the domain here is what pointed every canonical, og:image and sitemap entry at a
// project that had been deleted. The fallback only applies off Vercel.
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = productionDomain ? `https://${productionDomain}` : "https://wakeymoment.vercel.app";

// Two names, and they are not interchangeable. vibeguard is the service this site
// sells; wakeymoment is the company that runs it. The service leads everywhere a
// visitor is deciding whether to buy, and the company appears where ownership is
// the point: the copyright line and the about page.
export const siteConfig = {
  name: "vibeguard",
  company: "wakeymoment",
  title: "vibeguard — an independent review of your AI-built app",
  description:
    "An independent review of your AI-built or outsourced app, before the next milestone payment. Plain English. Three pages. One decision.",
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
