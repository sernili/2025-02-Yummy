const nextConfig = {
  distDir: "build",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
