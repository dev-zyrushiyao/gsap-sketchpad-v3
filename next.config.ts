import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gsap-sketchpad-v3",
  assetPrefix: "/gsap-sketchpad-v3/",
  images: { unoptimized: true },
};

export default nextConfig;
