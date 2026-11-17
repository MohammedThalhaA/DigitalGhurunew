import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - AI Digital Marketing Institute",
  description:
    "Learn about Digital Ghuru's agency-style training, expert mentors, live client projects, and placement success across Chennai and Hyderabad.",
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
