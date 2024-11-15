/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'dygjqgtcktjpnlyneqya.supabase.co',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  }
};

export default nextConfig;
