import { absoluteUrl, siteConfig } from "@/config/site";

export type BlogPostingJsonLdInput = {
  author?: string;
  dateModified?: string;
  datePublished: string;
  description: string;
  image?: string;
  title: string;
  url: string;
};

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    // The organization is the company, not the service. Search engines read this
    // as the legal entity behind the site; vibeguard is a thing wakeymoment sells.
    name: siteConfig.company,
    url: siteConfig.url,
  };
}

export function buildBlogPostingJsonLd(input: BlogPostingJsonLdInput) {
  const authorName = input.author ?? "Jaeil Lee";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    // Falls back to the generated card at /posts/<slug>/opengraph-image.
    image: absoluteUrl(input.image ?? `${input.url}/opengraph-image`),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.url,
    },
  };
}
