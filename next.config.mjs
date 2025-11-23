/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "torino-back.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
