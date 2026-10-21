import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // 1. Enforce canonical apex domain: redirect www.digitalghuru.com to https://digitalghuru.com
  // 2. Redirect legacy .in domains to canonical https://digitalghuru.com
  if (
    host.startsWith('www.digitalghuru.com') ||
    host.includes('digitalghuru.in') ||
    host.startsWith('www.')
  ) {
    const url = request.nextUrl.clone();
    url.host = 'digitalghuru.com';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static chunks)
     * - _next/image (image optimization files)
     * - favicon.ico, site.webmanifest, manifest.json, robots.txt, sitemap.xml
     */
    '/((?!_next/static|_next/image|favicon.ico|site.webmanifest|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};
