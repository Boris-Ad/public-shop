import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
  const adminRoutes = '/admin';
  const authRoutes = '/auth';
  const authApiRoutes = '/api/auth';

  const isAdmin = req.auth?.user?.role === 'ADMIN';
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith(adminRoutes);
  const isAuthRoute = req.nextUrl.pathname.startsWith(authRoutes);
  const isApiRoute = req.nextUrl.pathname.startsWith(authApiRoutes);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
