import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'], // YouTube thumbnails
  },
};

export default nextConfig;
