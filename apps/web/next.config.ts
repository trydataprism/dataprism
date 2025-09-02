import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["better-auth"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
