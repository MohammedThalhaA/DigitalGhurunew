import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories & Student Placements",
  description: "Discover real career transformations and placement records from Digital Ghuru alumni working at top digital marketing agencies and brands.",
  alternates: {
    canonical: "https://digitalghuru.com/success-stories",
  },
  openGraph: {
    title: "Success Stories & Student Placements | Digital Ghuru",
    description: "Discover real career transformations and placement records from Digital Ghuru alumni working at top digital marketing agencies and brands.",
    url: "https://digitalghuru.com/success-stories",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Success Stories & Student Placements - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories & Student Placements | Digital Ghuru",
    description: "Discover real career transformations and placement records from Digital Ghuru alumni working at top digital marketing agencies and brands.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
