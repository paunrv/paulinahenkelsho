import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prefer this package as tracing root when other lockfiles exist higher in the tree
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
