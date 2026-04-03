import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the corner dev indicator. Does not remove the error overlay, but reduces extra dev UI.
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
