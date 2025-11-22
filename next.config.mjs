/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "torino-back.onrender.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
