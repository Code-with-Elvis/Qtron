import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during production builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "vye2wc9mk1.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
