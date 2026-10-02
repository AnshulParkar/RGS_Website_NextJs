/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/crm',
        destination: 'https://rgs-lead-management-system.vercel.app/dashboard',
        permanent: false,
      },
      {
        source: '/crm/:path*',
        destination: 'https://rgs-lead-management-system.vercel.app/dashboard',
        permanent: false,
      },
    ]
  },
}

export default nextConfig