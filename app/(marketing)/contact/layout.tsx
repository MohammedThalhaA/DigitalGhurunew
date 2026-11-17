import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Chennai & Hyderabad Campuses",
  description: "Contact Digital Ghuru admissions. Visit our branches in Anna Nagar, Chennai and Ameerpet, Hyderabad or book a free demo class today.",
  alternates: {
    canonical: "https://digitalghuru.com/contact",
  },
  openGraph: {
    title: "Contact Us - Chennai & Hyderabad Campuses | Digital Ghuru",
    description: "Contact Digital Ghuru admissions. Visit our branches in Anna Nagar, Chennai and Ameerpet, Hyderabad or book a free demo class today.",
    url: "https://digitalghuru.com/contact",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Contact Us - Chennai & Hyderabad Campuses - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Chennai & Hyderabad Campuses | Digital Ghuru",
    description: "Contact Digital Ghuru admissions. Visit our branches in Anna Nagar, Chennai and Ameerpet, Hyderabad or book a free demo class today.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
