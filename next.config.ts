import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com", protocol: "https" },
      { hostname: "i.ibb.co", protocol: "https" },
    ],
  },
};

export default nextConfig;
