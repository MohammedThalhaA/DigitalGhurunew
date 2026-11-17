import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Life & Student Experience",
  description: "Take a look inside the Digital Ghuru classroom experience, live agency workshops, masterclasses, and student community events.",
  alternates: {
    canonical: "https://digitalghuru.com/life-at-digitalghuru",
  },
  openGraph: {
    title: "Campus Life & Student Experience | Digital Ghuru",
    description: "Take a look inside the Digital Ghuru classroom experience, live agency workshops, masterclasses, and student community events.",
    url: "https://digitalghuru.com/life-at-digitalghuru",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Campus Life & Student Experience - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Life & Student Experience | Digital Ghuru",
    description: "Take a look inside the Digital Ghuru classroom experience, live agency workshops, masterclasses, and student community events.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function LifeAtDigitalGhuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
