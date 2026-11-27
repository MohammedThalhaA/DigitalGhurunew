import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://accounts.google.com https://www.google.com https://maps.google.com https://checkout.razorpay.com https://api.razorpay.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; connect-src 'self' https: wss:; media-src 'self' https: data: blob:; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com https://checkout.razorpay.com https://api.razorpay.com; frame-ancestors 'self';";

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Direct already registered / logged-in users straight to their dashboard when visiting the website root or auth pages
  if (pathname === '/' || pathname === '/signin' || pathname === '/signup') {
    try {
      const isSecure = Boolean(request.cookies.get('__Secure-next-auth.session-token'));
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: isSecure,
      });

      if (token) {
        const dashboardUrl =
          token.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    } catch (err) {
      console.error('Middleware session check error:', err);
    }
  }

  // Enforce apex domain for each respective TLD:
  // www.digitalghuru.com -> digitalghuru.com
  // www.digitalghuru.in -> digitalghuru.in
  if (host.startsWith('www.digitalghuru.com')) {
    const url = request.nextUrl.clone();
    url.host = 'digitalghuru.com';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }
  if (host.startsWith('www.digitalghuru.in')) {
    const url = request.nextUrl.clone();
    url.host = 'digitalghuru.in';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // 3. 301 Permanent Redirects for URLs over 115 characters to short clean addresses
  if (pathname === '/blog/top-skills-you-can-learn-at-digital-marketing-classes-in-anna-nagar-build-a-job-ready-career') {
    return NextResponse.redirect(new URL('/blog/digital-marketing-skills-anna-nagar', request.url), 301);
  }
  if (pathname === '/blog/top-10-skills-you-can-learn-at-digital-marketing-classes-in-chennai-build-a-successful-career') {
    return NextResponse.redirect(new URL('/blog/digital-marketing-skills-chennai', request.url), 301);
  }
  if (pathname === '/blog/digital-marketing-course-in-chennai-with-placement-build-job-ready-skills-and-get-hired') {
    return NextResponse.redirect(new URL('/blog/digital-marketing-chennai-placement', request.url), 301);
  }
  if (pathname === '/blog/instagram-reels-strategy-for-small-businesses-in-tamil-nadu-7-ways-to-get-more-customers') {
    return NextResponse.redirect(new URL('/blog/instagram-reels-strategy-tamil-nadu', request.url), 301);
  }
  if (pathname === '/blog/digital-marketing-course-in-chennai-learn-in-demand-skills-and-build-a-successful-career') {
    return NextResponse.redirect(new URL('/blog/digital-marketing-course-in-chennai', request.url), 301);
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
     * Match all request paths except internal next static chunks & image optimization
     */
    '/((?!_next/static|_next/image).*)',
  ],
};
