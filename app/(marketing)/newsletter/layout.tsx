import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Newsletter - AI Growth Prompts",
  description: "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, AI prompt frameworks, and agency growth tactics.",
  alternates: {
    canonical: "https://digitalghuru.com/newsletter",
  },
  openGraph: {
    title: "Marketing Newsletter - AI Growth Prompts | Digital Ghuru",
    description: "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, AI prompt frameworks, and agency growth tactics.",
    url: "https://digitalghuru.com/newsletter",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Marketing Newsletter - AI Growth Prompts - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Newsletter - AI Growth Prompts | Digital Ghuru",
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
