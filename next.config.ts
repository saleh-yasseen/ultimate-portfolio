import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com", protocol: "https" },
      { hostname: "i.ibb.co", protocol: "https" },
      { hostname: "cdn.hashnode.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
