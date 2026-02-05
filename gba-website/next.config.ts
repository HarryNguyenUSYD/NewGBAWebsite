import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2yndv297cln6r.cloudfront.net",
      },
    ],
  }
};

export default nextConfig;
