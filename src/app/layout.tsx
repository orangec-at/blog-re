import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "wakeymoment",
  description: "React-based portfolio/blog with live demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-zapier-charcoal">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-cream py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
