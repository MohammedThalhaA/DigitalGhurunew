import type { Metadata } from "next";
import { Montserrat, Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DigitalGhuru — Premier Digital Marketing Institute",
    template: "%s | DigitalGhuru",
  },
  description:
    "DigitalGhuru is a premier digital marketing institute offering industry-leading courses with hands-on training, expert mentors, and 100% placement support.",
  keywords: [
    "digital marketing course",
    "digital marketing institute",
    "DigitalGhuru",
    "online marketing training",
    "SEO course",
    "social media marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DigitalGhuru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${montserrat.variable} ${raleway.variable} font-body antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

