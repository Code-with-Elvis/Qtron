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
      // Your existing domains
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "vye2wc9mk1.ufs.sh",
      },

      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },

      // Pexels
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },

      // Freepik (their CDN serves images from multiple subdomains)
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "freepik.com",
      },
      // Some Freepik assets load from static locations
      {
        protocol: "https",
        hostname: "static.freepik.com",
      },

      // Pixabay
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },

      // Additional domains can be added here
    ],
  },
};

export default nextConfig;
