import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Imagens dentro do corpo dos posts vêm da CDN do Sanity. Sem liberar
        // o host aqui, o next/image recusa a URL.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
