import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other config options here (if any)
  eslint: {
    // This option prevents builds from failing on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This option prevents builds from failing on type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
