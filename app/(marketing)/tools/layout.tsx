import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Digital Marketing Tools & Calculators",
  description:
    "Free marketing calculators for performance marketers and advertisers, including Cost Per Click (CPC) and Return on Investment (ROI) calculators.",
  alternates: {
    canonical: "https://digitalghuru.com/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
