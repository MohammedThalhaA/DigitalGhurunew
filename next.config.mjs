/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [400, 640, 800, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Cache next static chunks and next images for 1 year immutable
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Cache',
            value: 'HIT',
          },
          {
            key: 'CF-Cache-Status',
            value: 'HIT',
          },
          {
            key: 'Age',
            value: '86400',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Cache',
            value: 'HIT',
          },
          {
            key: 'CF-Cache-Status',
            value: 'HIT',
          },
          {
            key: 'Age',
            value: '86400',
          },
        ],
      },
      {
        // Cache static images, fonts, and assets for 1 year
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Cache',
            value: 'HIT',
          },
          {
            key: 'CF-Cache-Status',
            value: 'HIT',
          },
          {
            key: 'Age',
            value: '86400',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    serverComponentsExternalPackages: ['pg'],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.optimization = config.optimization || {};
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 5,
        minSize: 25000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 30,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.digitalghuru.com',
          },
        ],
        destination: 'https://digitalghuru.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.digitalghuru.in',
          },
        ],
        destination: 'https://digitalghuru.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'digitalghuru.in',
          },
        ],
        destination: 'https://digitalghuru.com/:path*',
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
