/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "d2c0db5b8fb27c1c9887-9b32efc83a6b298bb22e7a1df0837426.ssl.cf2.rackcdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
