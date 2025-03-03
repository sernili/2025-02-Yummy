const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  distDir: "./out",
  reactStrictMode: false,
  images: {
    unoptimized: true, // Disable default image optimization
    domains: ["images.unsplash.com"],
  },
  assetPrefix: isProd ? "/2025-02-Yummy/" : "",
  basePath: isProd ? "/2025-02-Yummy" : "",
  webpack(config, options) {
    config.resolve.extensions.push(".ts", ".tsx", ".jsx", ".js");
    return config;
  },
};

export default nextConfig;
