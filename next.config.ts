import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return[
        {
            source: '/',
            destination: '/users/home',
            permanent: false,
        },
    ]
  },
//   basePath: "/home",
};

export default nextConfig;
