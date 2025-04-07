import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ['/admin/dashboard/:path*', '/admin/:path*', '/admin/profile/:path*']
};

export default nextConfig;
