import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ["@electric-sql/pglite"],
  experimental: {
    serverActions: {},
  },
};

export default nextConfig;
