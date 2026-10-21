import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog, AI Marketing Guides & Strategies",
  description:
    "Read in-depth guides, search engine optimization tutorials, social media ads strategies, and AI automation workflows from Digital Ghuru mentors.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
