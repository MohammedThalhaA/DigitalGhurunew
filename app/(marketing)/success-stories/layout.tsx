import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories & Student Placements",
  description:
    "Discover real career transformations and placement records from Digital Ghuru alumni working at top digital marketing agencies and brands.",
  alternates: {
    canonical: "https://digitalghuru.com/success-stories",
  },
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
