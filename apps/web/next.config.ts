import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["better-auth"],
};

export default nextConfig;
