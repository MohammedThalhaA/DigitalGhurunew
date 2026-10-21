import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools & Marketing Tech Stack Curriculum",
  description:
    "Master the 50+ cutting-edge digital marketing and generative AI tools covered in our courses, including ChatGPT, Midjourney, SEMrush, Meta Ads, and GA4.",
};

export default function ResourcesToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
