import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return[
        {
            source: '/',
            destination: '/store/home',
            permanent: false,
        },
        {
            source: '/store',
            destination: '/store/home',
            permanent: false,
        },
    ]
  },
};

export default nextConfig;
