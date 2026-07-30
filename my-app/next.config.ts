import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Exam-Admin-Dashboard',
};

export default nextConfig;
