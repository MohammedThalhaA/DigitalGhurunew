import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Weekly Marketing Hacks & AI Prompts",
  description:
    "Subscribe to Digital Ghuru's weekly newsletter for actionable SEO case studies, prompt engineering frameworks, and agency marketing tactics.",
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
