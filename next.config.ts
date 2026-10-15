import type { NextConfig } from "next";
const apiUrl = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async rewrites() {
    return [
      { source: "/api/catalog/:path*", destination: `${apiUrl}/api/catalog/:path*` },
      { source: "/work/:path*", destination: `${apiUrl}/work/:path*` },
    ];
  },
};
export default nextConfig;
