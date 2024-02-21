/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herza.id",
        port: "",
      },
    ],
  },
};

export default nextConfig;
