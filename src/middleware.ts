import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

const PROTECTED_ROUTES = ['/dashboard', '/recommendations', '/compare', '/chat'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the route is not protected, continue
  if (!PROTECTED_ROUTES.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    initializeAdminApp();
    await getAuth().verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    // Session cookie is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};