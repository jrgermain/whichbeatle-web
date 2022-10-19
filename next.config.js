/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/api",
      destination: "/api/openapi.html",
    },
  ],
  redirects: async () => [
    {
      source: "/api/swagger.json",
      destination: "/api/openapi.json",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
