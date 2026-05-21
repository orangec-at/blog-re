import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { absoluteUrl, siteConfig } from "@/config/site";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [buildWebsiteJsonLd(), buildOrganizationJsonLd()];

  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-zapier-charcoal">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-cream py-12 pb-28 md:pb-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
