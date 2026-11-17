import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Student Certificate Credential",
  description: "Verify and validate official graduation certificates and credentials issued by Digital Ghuru.",
  alternates: {
    canonical: "https://digitalghuru.com/verify",
  },
  openGraph: {
    title: "Verify Student Certificate Credential | Digital Ghuru",
    description: "Verify and validate official graduation certificates and credentials issued by Digital Ghuru.",
    url: "https://digitalghuru.com/verify",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Verify Student Certificate Credential - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Student Certificate Credential | Digital Ghuru",
    description: "Verify and validate official graduation certificates and credentials issued by Digital Ghuru.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
