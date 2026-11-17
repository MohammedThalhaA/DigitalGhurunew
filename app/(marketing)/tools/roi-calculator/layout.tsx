import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ROI & ROAS Calculator - Ad Profit",
  description: "Measure and forecast your return on ad spend (ROAS) and marketing investment return (ROI) with Digital Ghuru's free online calculator.",
  alternates: {
    canonical: "https://digitalghuru.com/tools/roi-calculator",
  },
  openGraph: {
    title: "Free ROI & ROAS Calculator - Ad Profit | Digital Ghuru",
    description: "Measure and forecast your return on ad spend (ROAS) and marketing investment return (ROI) with Digital Ghuru's free online calculator.",
    url: "https://digitalghuru.com/tools/roi-calculator",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Free ROI & ROAS Calculator - Ad Profit - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ROI & ROAS Calculator - Ad Profit | Digital Ghuru",
    description: "Measure and forecast your return on ad spend (ROAS) and marketing investment return (ROI) with Digital Ghuru's free online calculator.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
