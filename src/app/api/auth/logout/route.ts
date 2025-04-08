import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));

  response.cookies.set('auth_token', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}

