import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './src/utils/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const protectedRoutes = ['/admin/dashboard', '/admin/profile'];
  const publicRoutes = ['/admin/login', '/'];

  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (token) {
    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
