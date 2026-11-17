import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Growth Newsletter",
  description: "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, AI prompt frameworks, and agency growth tactics.",
  alternates: {
    canonical: "https://digitalghuru.com/newsletter",
  },
  openGraph: {
    title: "AI Growth Newsletter | Digital Ghuru",
    description: "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, AI prompt frameworks, and agency growth tactics.",
    url: "https://digitalghuru.com/newsletter",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "AI Growth Newsletter - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Growth Newsletter | Digital Ghuru",
    description: "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, AI prompt frameworks, and agency growth tactics.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
