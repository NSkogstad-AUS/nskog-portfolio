/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    root: __dirname,
  },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // important if you use next/image
};

module.exports = nextConfig;
