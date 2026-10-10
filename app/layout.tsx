import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import { Providers } from "@/components/shared/Providers";
import Script from "next/script";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://digitalghuru.com')
  ),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
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
    siteName: "Digital Ghuru",
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
      <body className={`${inter.variable} ${outfit.variable} font-body antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
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

