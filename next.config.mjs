/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    serverComponentsExternalPackages: ["ws"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cacttus.education" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "uploadthing.com" },
    ],
  },
};

export default nextConfig;
