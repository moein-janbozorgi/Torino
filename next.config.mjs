/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "torino-back.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/**",
      },
    ],
    // Next.js 16 blocks optimizing images served from local IPs by default.
    // The dev backend runs on http://localhost:6500, so allow it outside production.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
