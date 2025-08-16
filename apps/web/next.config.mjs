/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // make monorepo packages work seamlessly
  transpilePackages: ["@lernt/ui", "@lernt/services", "@lernt/utilities"]
};

export default nextConfig;
