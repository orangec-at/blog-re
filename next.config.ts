import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  turbopack: {},

  // Three URLs shipped in the 2026-08-31 sitemap and then stopped existing: the
  // sample report became a route of its own, and two demo posts went back to
  // draft. 308 rather than a 404, because Google has already been told they are
  // there.
  async redirects() {
    return [
      {
        source: "/posts/ai-mvp-technical-debt-audit-sample-report",
        destination: "/sample-audit",
        permanent: true,
      },
      { source: "/posts/hello-world", destination: "/posts", permanent: true },
      { source: "/posts/b2b-dynamic-onboarding", destination: "/posts", permanent: true },
    ];
  },
};

export default withContentlayer(nextConfig);
