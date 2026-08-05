import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prefer this package as tracing root when other lockfiles exist higher in the tree
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/perspectives",
        destination: "/notes",
        permanent: true,
      },
      {
        source: "/perspectives/:slug",
        destination: "/notes/:slug",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Prevent occasional ENOENT errors from webpack persistent cache in dev.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
