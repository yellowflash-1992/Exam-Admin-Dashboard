import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next.js in server mode so API routes and runtime data work during deploy.
  basePath:
    process.env.NODE_ENV === "production" ? "/Exam-Admin-Dashboard" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
