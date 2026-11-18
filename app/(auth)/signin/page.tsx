import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign In to Student Portal",
  description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://digitalghuru.com/signin",
  },
  openGraph: {
    title: "Sign In to Student Portal | Digital Ghuru",
    description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
    url: "https://digitalghuru.com/signin",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Sign In to Student Portal - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In to Student Portal | Digital Ghuru",
    description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function SignInPage() {
  return <AuthCard initialMode="signin" />;
}
