import type { Metadata } from "next";

const blogTitles: Record<string, string> = {
  "complete-guide-digital-marketing-2024": "The Complete Guide to Digital Marketing in 2024",
  "ai-transforming-digital-marketing": "How AI is Transforming Digital Marketing",
  "top-10-seo-strategies-2024": "Top 10 SEO Strategies That Actually Work in 2024",
  "meta-ads-vs-google-ads": "Meta Ads vs Google Ads: Which is Better for Your Business?",
  "content-marketing-strategy-beginners": "Content Marketing Strategy: A Beginner's Playbook",
  "digital-marketing-career-roadmap": "Digital Marketing Career Roadmap: From Beginner to Pro",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const title = blogTitles[params.slug] || "Blog Post";
  return {
    title,
    description: `Read "${title}" and discover actionable digital marketing & AI strategies from Digital Ghuru mentors.`,
    alternates: {
      canonical: `https://digitalghuru.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
