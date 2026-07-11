const config = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      // Files uploaded into Notion are served from signed S3 URLs. The bucket
      // host is `prod-files-secure.s3.<region>.amazonaws.com`, which does not
      // match `s3.**.amazonaws.com` — that pattern requires the host to start
      // with `s3.` — so uploads need their own entry.
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.**.amazonaws.com',
      },
      // Notion's newer file/CDN hosts.
      {
        protocol: 'https',
        hostname: '**.notion.so',
      },
      {
        protocol: 'https',
        hostname: '**.notionusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/notes/:slug*',
        permanent: true,
      },
    ];
  },
};

export default config;
