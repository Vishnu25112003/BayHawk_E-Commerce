import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // output: "export",

  // distDir: "out", // Output directory for static export
  // output: "export", // Enable static export  //commanded by Gowtham
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "web-assets.same.dev",
      "asset.cloudinary.com",
      "res.cloudinary.com",
      "tuttobene.in",
      "drive.google.com",
      "images.squarespace-cdn.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web-assets.same.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint warnings during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
};

export default nextConfig;
