import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - AI Digital Marketing Institute",
  description: "Learn about Digital Ghuru's agency-style training, expert mentors, live client projects, and placement success across Chennai and Hyderabad.",
  alternates: {
    canonical: "https://digitalghuru.com/about-us",
  },
  openGraph: {
    title: "About Us - AI Digital Marketing Institute | Digital Ghuru",
    description: "Learn about Digital Ghuru's agency-style training, expert mentors, live client projects, and placement success across Chennai and Hyderabad.",
    url: "https://digitalghuru.com/about-us",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "About Us - AI Digital Marketing Institute - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - AI Digital Marketing Institute | Digital Ghuru",
    description: "Learn about Digital Ghuru's agency-style training, expert mentors, live client projects, and placement success across Chennai and Hyderabad.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
