import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  turbopack: {},
};

export default withContentlayer(nextConfig);
