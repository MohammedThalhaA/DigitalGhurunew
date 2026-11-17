import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com https://maps.google.com https://checkout.razorpay.com https://api.razorpay.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; connect-src 'self' https: wss:; media-src 'self' https: data: blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';";

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

  const response = NextResponse.next();
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
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
