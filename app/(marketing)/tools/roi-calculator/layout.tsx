import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing ROI & ROAS Calculator - Free Campaign Profit Estimator",
  description:
    "Measure and forecast your return on ad spend (ROAS) and marketing investment return (ROI) with Digital Ghuru's free online calculator.",
  alternates: {
    canonical: "https://digitalghuru.com/tools/roi-calculator",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
