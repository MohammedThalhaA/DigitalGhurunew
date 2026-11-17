import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Tools Curriculum",
  description: "Master 50+ cutting-edge digital marketing and AI tools in our courses, including ChatGPT, Midjourney, SEMrush, Meta Ads, and GA4.",
  alternates: {
    canonical: "https://digitalghuru.com/resources/tools",
  },
  openGraph: {
    title: "AI Marketing Tools Curriculum | Digital Ghuru",
    description: "Master 50+ cutting-edge digital marketing and AI tools in our courses, including ChatGPT, Midjourney, SEMrush, Meta Ads, and GA4.",
    url: "https://digitalghuru.com/resources/tools",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "AI Marketing Tools Curriculum - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Tools Curriculum | Digital Ghuru",
    description: "Master 50+ cutting-edge digital marketing and AI tools in our courses, including ChatGPT, Midjourney, SEMrush, Meta Ads, and GA4.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function ResourcesToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
