import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Create Student Account",
  description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
  alternates: {
    canonical: "https://digitalghuru.com/signup",
  },
  openGraph: {
    title: "Create Student Account | Digital Ghuru",
    description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
    url: "https://digitalghuru.com/signup",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Create Student Account - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Student Account | Digital Ghuru",
    description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function SignUpPage() {
  return <AuthCard initialMode="signup" />;
}
