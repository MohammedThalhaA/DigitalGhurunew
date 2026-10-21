import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Leading AI-Powered Digital Marketing Institute",
  description:
    "Learn about Digital Ghuru's mission, expert mentors, agency-style practical training methodology, and placement success across Chennai and Hyderabad.",
  alternates: {
    canonical: "https://digitalghuru.com/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
