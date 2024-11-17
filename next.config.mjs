/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'intheknowyyc.ca',
            port: '',
            pathname: '/api/files/download/**',
          },
        ],
      },
};

export default nextConfig;
