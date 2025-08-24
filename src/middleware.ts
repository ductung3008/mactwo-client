import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';

  if (host === 'admin.mactwo.click') {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*|admin).*)',
};
