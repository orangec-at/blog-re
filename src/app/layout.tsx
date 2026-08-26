import type { Metadata } from "next";
import { Newsreader, Noto_Serif_KR, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileFloatingAppbar } from "@/components/layout/mobile-floating-appbar";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/structured-data";

// next/font downloads these at build time and serves them from our own origin,
// so there is no render-blocking request to fonts.googleapis.com and no FOUT.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const fontVariables = `${newsreader.variable} ${notoSerifKr.variable} ${sourceSans.variable}`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [buildWebsiteJsonLd(), buildOrganizationJsonLd()];

  return (
    <html className={fontVariables} lang="en">
      <body className="min-h-screen bg-paper text-ink">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-paper py-12">{children}</main>
          <Footer />
          <MobileFloatingAppbar />
        </div>
      </body>
    </html>
  );
}
