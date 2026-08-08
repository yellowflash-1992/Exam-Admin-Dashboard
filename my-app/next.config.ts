import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Exam-Admin-Dashboard",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;