import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
