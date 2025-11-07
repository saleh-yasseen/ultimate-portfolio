import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["i.ibb.co", "assets.aceternity.com"],
  },
};

export default nextConfig;
