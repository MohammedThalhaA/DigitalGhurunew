import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CPC Calculator - Ad Cost Estimator",
  description: "Calculate Google and Meta Ads Cost Per Click (CPC), CTR, and required campaign budget with our free ad spend calculator.",
  alternates: {
    canonical: "https://digitalghuru.com/tools/cpc-calculator",
  },
  openGraph: {
    title: "Free CPC Calculator - Ad Cost Estimator | Digital Ghuru",
    description: "Calculate Google and Meta Ads Cost Per Click (CPC), CTR, and required campaign budget with our free ad spend calculator.",
    url: "https://digitalghuru.com/tools/cpc-calculator",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Free CPC Calculator - Ad Cost Estimator - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CPC Calculator - Ad Cost Estimator | Digital Ghuru",
    description: "Calculate Google and Meta Ads Cost Per Click (CPC), CTR, and required campaign budget with our free ad spend calculator.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function CPCCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
