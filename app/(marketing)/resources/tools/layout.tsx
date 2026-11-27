import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Recommended Digital Marketing Tools & Resources",
  description: "Explore curated software, hosting, SEO platforms, AI suites, and graphic tools recommended by Digital Ghuru mentors.",
  alternates: {
    canonical: "https://digitalghuru.com/resources/tools",
  },
  openGraph: {
    title: "Recommended Digital Marketing Tools & Resources | Digital Ghuru",
    description: "Explore curated software, hosting, SEO platforms, AI suites, and graphic tools recommended by Digital Ghuru mentors.",
    url: "https://digitalghuru.com/resources/tools",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Recommended Digital Marketing Tools - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recommended Digital Marketing Tools & Resources | Digital Ghuru",
    description: "Explore curated software, hosting, SEO platforms, AI suites, and graphic tools recommended by Digital Ghuru mentors.",
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
