import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CPC Calculator - Ad Cost Estimator",
  description:
    "Calculate your Google Ads and Meta Ads Cost Per Click (CPC), click-through rate (CTR), and optimal campaign budget with our free calculator.",
  alternates: {
    canonical: "https://digitalghuru.com/tools/cpc-calculator",
  },
};

export default function CPCCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
