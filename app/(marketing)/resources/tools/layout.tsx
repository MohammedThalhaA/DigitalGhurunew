import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools & Marketing Tech Stack Curriculum",
  description:
    "Master 50+ cutting-edge digital marketing and AI tools in our courses, including ChatGPT, Midjourney, SEMrush, Meta Ads, and GA4.",
  alternates: {
    canonical: "https://digitalghuru.com/resources/tools",
  },
};

export default function ResourcesToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
