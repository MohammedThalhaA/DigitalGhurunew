import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Digital Marketing Tools & Calculators",
  description: "Free marketing calculators for advertisers, including Cost Per Click (CPC) and Return on Investment (ROI) estimation tools.",
  alternates: {
    canonical: "https://digitalghuru.com/tools",
  },
  openGraph: {
    title: "Free Digital Marketing Tools & Calculators | Digital Ghuru",
    description: "Free marketing calculators for advertisers, including Cost Per Click (CPC) and Return on Investment (ROI) estimation tools.",
    url: "https://digitalghuru.com/tools",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Free Digital Marketing Tools & Calculators - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Digital Marketing Tools & Calculators | Digital Ghuru",
    description: "Free marketing calculators for advertisers, including Cost Per Click (CPC) and Return on Investment (ROI) estimation tools.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
