import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-25fe010d-4495-41d2-a738-81ab32521956.space-z.ai",
  ],
};

export default nextConfig;
