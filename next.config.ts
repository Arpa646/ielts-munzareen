import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disabled to prevent auto-reloading

  images: {
    domains: ['api.10minuteschool.com', 'img.youtube.com', 'i.ytimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1800, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/api/revalidate',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },

  // Enable compression for better performance
  compress: true,

  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;
