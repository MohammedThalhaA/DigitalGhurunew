"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import BlogCard from "@/components/cards/BlogCard";

/* PLACEHOLDER: Replace with real blog posts */
const blogPosts = [
  {
    title: "The Complete Guide to Digital Marketing in 2024",
    excerpt: "Everything you need to know about digital marketing — from SEO and content marketing to paid advertising and social media strategy.",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    date: "August 15, 2024",
    readTime: "12 min read",
    href: "/blog/complete-guide-digital-marketing-2024",
  },
  {
    title: "How AI is Transforming Digital Marketing",
    excerpt: "Explore the revolutionary impact of artificial intelligence on marketing strategies, from content generation to predictive analytics.",
    coverUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    date: "August 10, 2024",
    readTime: "8 min read",
    href: "/blog/ai-transforming-digital-marketing",
  },
  {
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Forget outdated tactics. These proven SEO strategies will help you rank higher, drive more traffic, and outperform your competitors.",
    coverUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop",
    date: "August 5, 2024",
    readTime: "10 min read",
    href: "/blog/seo-strategies-2024",
  },
  {
    title: "Social Media Marketing: A Beginner's Complete Guide",
    excerpt: "Learn how to build a social media presence from scratch, create engaging content, and grow your audience on every major platform.",
    coverUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
    date: "July 28, 2024",
    readTime: "15 min read",
    href: "/blog/social-media-marketing-guide",
  },
  {
    title: "Google Ads vs Meta Ads: Which is Right for Your Business?",
    excerpt: "A comprehensive comparison of the two biggest advertising platforms to help you decide where to invest your marketing budget.",
    coverUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=450&fit=crop",
    date: "July 20, 2024",
    readTime: "9 min read",
    href: "/blog/google-ads-vs-meta-ads",
  },
  {
    title: "How to Build a Career in Digital Marketing",
    excerpt: "From choosing the right course to landing your first job — a step-by-step roadmap for aspiring digital marketers.",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop",
    date: "July 15, 2024",
    readTime: "11 min read",
    href: "/blog/career-in-digital-marketing",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogIndexPage() {
  return (
    <>
      <HeroSection
        eyebrow="BLOG"
        title="Insights, Guides &"
        titleHighlight="Industry Trends"
        description="Stay updated with the latest in digital marketing, career tips, and in-depth tutorials from our expert team."
      />

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, idx) => (
              <motion.div key={idx} variants={fadeUpItem}>
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>

          {/* PLACEHOLDER: Add real pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <span className="h-10 w-10 rounded-xl bg-brand-blue text-white flex items-center justify-center text-sm font-heading font-semibold">
              1
            </span>
            <span className="h-10 w-10 rounded-xl border border-ink-200 text-ink-500 flex items-center justify-center text-sm font-heading cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-colors">
              2
            </span>
            <span className="h-10 w-10 rounded-xl border border-ink-200 text-ink-500 flex items-center justify-center text-sm font-heading cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-colors">
              3
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
