import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import { Providers } from "@/components/shared/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && !envUrl.includes("digitalghuru.in") && !envUrl.includes("www.digitalghuru.com")) {
    return envUrl;
  }
  return "https://digitalghuru.com";
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: "https://digitalghuru.com",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: {
    default: "Digital Ghuru — Premier Digital Marketing Institute",
    template: "%s | Digital Ghuru",
  },
  description:
    "Digital Ghuru is a premier digital marketing institute offering industry-leading courses with hands-on training, expert mentors, and 100% placement support.",
  keywords: [
    "AI-Powered digital marketing course",
    "digital marketing institute",
    "Digital Ghuru",
    "online marketing training",
    "SEO course",
    "social media marketing",
    "AI powered digital marketing in chennai",
    "best ai powered digital marketing in chennai",
    "AI powered digital marketing in hyderabad",
    "AI digital marketing institute in chennai",
    "digital marketing course in chennai",
    "digital marketing course in hyderabad",
    "AI digital marketing training in hyderabad",
    "best AI digital marketing course",
    "learn AI marketing online",
    "ai empowered training",
    "digital marketing course",
    "kids course",
    "ai kids course"
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://digitalghuru.com",
    siteName: "Digital Ghuru",
    title: "Digital Ghuru — Premier Digital Marketing Institute",
    description:
      "Digital Ghuru is a premier digital marketing institute offering industry-leading courses with hands-on training, expert mentors, and 100% placement support.",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 1200,
        alt: "Digital Ghuru - Premier Digital Marketing Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Ghuru — Premier Digital Marketing Institute",
    description:
      "Digital Ghuru is a premier digital marketing institute offering industry-leading courses with hands-on training, expert mentors, and 100% placement support.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
  verification: {
    google: [
      "sWZnDRqXj6ys5_qrgitJDx4uuZJGhsNMZFk8ol3yC7c",
      "j-TCAkG3DX-r6XrsUqtBwR2PDlXflZ5NygYi1lBLD1U"
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Critical CSS for layout stability and responsive design media queries */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
              main { padding-top: 88px; }
              .fixed { position: fixed; }
              .pt-\\[88px\\] { padding-top: 88px; }

              /* Mobile-First Responsive Breakpoints */
              @media (max-width: 639px) {
                .section-container { padding-left: 1rem; padding-right: 1rem; }
              }
              @media (min-width: 640px) {
                .section-container { padding-left: 1.5rem; padding-right: 1.5rem; }
              }
              @media (min-width: 768px) {
                .section-container { padding-left: 2rem; padding-right: 2rem; }
              }
              @media (min-width: 1024px) {
                .section-container { max-width: 1280px; margin-left: auto; margin-right: auto; padding-left: 2rem; padding-right: 2rem; }
              }
              @media (min-width: 1280px) {
                .section-container { max-width: 1400px; }
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-body antialiased`}>
        {/* Google Analytics 4 (GA4) - Non-blocking async loading */}
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-DGHRU20261";
          return (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="lazyOnload"
              />
              <Script id="google-analytics" strategy="lazyOnload">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          );
        })()}
        <Providers>
          <SmoothScrollProvider>
            {children}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "EducationalOrganization",
                  "name": "Digital Ghuru",
                  "url": "https://digitalghuru.com",
                  "logo": "https://digitalghuru.com/icon.svg",
                  "sameAs": [
                    "https://www.facebook.com/digitalghuru",
                    "https://www.instagram.com/digitalghuru",
                    "https://www.linkedin.com/company/digitalghuru"
                  ]
                })
              }}
            />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}

