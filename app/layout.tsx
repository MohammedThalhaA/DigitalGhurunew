import type { Metadata } from "next";
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

export const metadata: Metadata = {
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
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Digital Ghuru",
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
        <Providers>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}

