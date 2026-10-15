import type { NextConfig } from "next";
const apiUrl = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async redirects() {
    // Preserve public WordPress links when this site replaces the old website.
    const oldPages: Record<string,string> = {
      "/about-us": "/about", "/contact-us": "/contact", "/quote-form": "/book",
      "/rental-service": "/rental", "/split-a-c": "/services/split-ac",
      "/tower-a-c": "/services/tower-ac", "/ahu-fcu-a-c": "/services/ahu-fcu-ac",
      "/ducteble-a-c": "/services/ductable-ac", "/cassette-a-c": "/services/cassette-ac",
      "/ac-underground-fitting": "/services/underground-fitting", "/package-ac": "/services/package-ac",
      "/vrv-ac": "/services/vrv-ac", "/chiller-ac": "/services/chiller-ac",
      "/cold-unit-ac": "/services/cold-unit-ac", "/window-ac": "/rental",
    };
    return Object.entries(oldPages).map(([source,destination]) => ({source,destination,permanent:true}));
  },
  async rewrites() {
    return [
      { source: "/api/catalog/:path*", destination: `${apiUrl}/api/catalog/:path*` },
      { source: "/work/:path*", destination: `${apiUrl}/work/:path*` },
    ];
  },
};
export default nextConfig;
