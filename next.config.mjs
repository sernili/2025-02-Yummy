/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./build", // Changes the build output directory to `./build`.
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
  crossOrigin: "anonymous",
};

export default nextConfig;
