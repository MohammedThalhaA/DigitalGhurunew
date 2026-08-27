"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Send } from "lucide-react";
import Button from "@/components/ui/Button";

/* ─── Mock Blog Post Data Store ─── */
interface BlogPost {
  title: string;
  excerpt: string;
  coverUrl: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
  category: string;
}

const blogPostsMap: Record<string, BlogPost> = {
  "complete-guide-digital-marketing-2024": {
    title: "The Complete Guide to Digital Marketing in 2024",
    excerpt: "Everything you need to know about digital marketing — from SEO and content marketing to paid advertising and social media strategy.",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
    date: "August 15, 2024",
    readTime: "12 min read",
    author: "Rishi Jain",
    category: "Guides",
    content: [
      "Digital marketing is changing faster than ever. In 2024, search engine algorithm updates, the integration of artificial intelligence (AI), and changing consumer preferences are reshaping how brands communicate with their audiences.",
      "To succeed this year, you need a holistic marketing strategy that integrates multiple channels seamlessly. In this guide, we will break down the essential components of a modern digital marketing campaign.",
      "Search Engine Optimization (SEO) remains the backbone of organic discovery. High-quality, original content written for humans (not just search engines) is vital. Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) guidelines are more critical than ever.",
      "Social media has moved beyond simple posting. Platforms like TikTok, Instagram, and LinkedIn require native, engaging vertical video content. Engaging your community through comments, direct messages, and interactive features is key to building brand loyalty.",
      "Paid Ads (Google Search, Meta, and LinkedIn) require precise targeting and compelling creative copy. Incorporating AI automation and personalization tools can significantly improve your Return on Ad Spend (ROAS).",
    ],
  },
  "ai-transforming-digital-marketing": {
    title: "How AI is Transforming Digital Marketing",
    excerpt: "Explore the revolutionary impact of artificial intelligence on marketing strategies, from content generation to predictive analytics.",
    coverUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    date: "August 10, 2024",
    readTime: "8 min read",
    author: "Rishi Jain",
    category: "Artificial Intelligence",
    content: [
      "Artificial Intelligence (AI) is no longer a futuristic concept — it is actively reshaping the marketing industry today. Marketers who learn to leverage AI are seeing massive improvements in productivity, creativity, and campaign results.",
      "From writing copy with ChatGPT to generating visual assets with Midjourney, generative AI tools are speeding up the content creation process. However, the human element of strategic oversight, branding consistency, and editing remains essential.",
      "Beyond content generation, AI is revolutionizing data analytics and decision-making. Predictive analytics algorithms can analyze vast customer datasets to forecast future buying patterns, optimize pricing, and target ads to users most likely to convert.",
      "Smart chatbots and conversational AI are providing 24/7 customer service, guiding leads through the marketing funnel, and answering common queries instantly. This frees up human agents to handle complex customer challenges.",
    ],
  },
  "seo-strategies-2024": {
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Forget outdated tactics. These proven SEO strategies will help you rank higher, drive more traffic, and outperform your competitors.",
    coverUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop",
    date: "August 5, 2024",
    readTime: "10 min read",
    author: "Rishi Jain",
    category: "SEO",
    content: [
      "Is SEO dead? Absolutely not. But the old strategies of keyword stuffing, spam link-building, and thin content are definitely obsolete. Today's search engines are incredibly smart.",
      "To rank in 2024, you need to understand Search Intent. Every search query has a specific goal: informational, transactional, navigational, or commercial. Your content must answer that query directly and thoroughly.",
      "User Experience (UX) signals like page load speed (Core Web Vitals), mobile responsiveness, and clean navigation are direct ranking factors. If users land on your site and bounce immediately due to poor design, your rankings will drop.",
      "Focus on topical authority. Instead of writing isolated blog posts, build content clusters. Write a comprehensive pillar page about a main topic, then write supporting articles that link back to the pillar. This shows search engines that you are an authority in that space.",
    ],
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsMap[slug];

  if (!post) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4">Post Not Found</h1>
        <p className="body-lg mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button variant="primary" href="/blog">
          Back to Blog
        </Button>
      </div>
    );
  }

  // Get related posts (exclude current)
  const relatedPosts = Object.entries(blogPostsMap)
    .filter(([key]) => key !== slug)
    .slice(0, 2);

  return (
    <article className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="section-container pt-8 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <div className="section-container pb-8 max-w-4xl">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/5 text-brand-blue text-xs font-heading font-semibold uppercase tracking-wider mb-4">
          {post.category}
        </span>
        <h1 className="heading-lg mb-6 text-ink-900">{post.title}</h1>

        {/* Byline */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-ink-500 pb-6 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-brand-blue" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-blue" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-blue" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="section-container max-w-5xl mb-12">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-md">
          <img
            src={post.coverUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Post Content */}
      <div className="section-container max-w-3xl pb-16">
        <div className="prose prose-ink max-w-none space-y-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="body-lg text-ink-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-ink-50 py-16 border-t border-ink-100">
          <div className="section-container">
            <h2 className="heading-md mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map(([key, related]) => (
                <Link
                  key={key}
                  href={`/blog/${key}`}
                  className="group block bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={related.coverUrl}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-heading font-semibold text-brand-blue uppercase tracking-wider mb-2 block">
                      {related.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue/90 py-16 text-white text-center">
        <div className="section-container max-w-2xl">
          <h2 className="heading-md mb-4 text-white">Subscribe to Our Newsletter</h2>
          <p className="body-md text-white/80 mb-8">
            Get the latest marketing insights, tutorials, and exclusive offers delivered straight to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              required
            />
            <Button variant="accent" type="submit" className="flex items-center justify-center gap-2">
              Subscribe
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </article>
  );
}
