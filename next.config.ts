import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized local images as placeholders
    unoptimized: true,
  },
};

export default nextConfig;
