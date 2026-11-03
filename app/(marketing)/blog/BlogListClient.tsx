"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight, Sparkles, BookOpen, User } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import Button from "@/components/ui/Button";
import type { Blog } from "@/lib/actions/blogs";

interface BlogListClientProps {
  initialBlogs: Blog[];
}

const staggerContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialBlogs]);

  // Filter blogs based on category and search query
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        (blog.category && blog.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  // Featured post: newest post when showing "All" without search filter
  const featuredBlog =
    selectedCategory === "All" && !searchQuery.trim() && filteredBlogs.length > 0
      ? filteredBlogs[0]
      : null;

  // Remaining posts to show in the grid
  const gridBlogs = featuredBlog
    ? filteredBlogs.slice(1)
    : filteredBlogs;

  return (
    <div className="bg-white">
      {/* ── Top Hero Section matching Home Page Typography ── */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-ink-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-heading font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
            <span>Digital Ghuru Learning Hub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink-900 tracking-tight leading-[1.15]"
          >
            Insights, Guides & <br />
            <span className="text-gradient">Growth Playbooks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-base sm:text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl mx-auto"
          >
            Learn actionable performance marketing, AI-driven workflows, SEO frameworks, and career roadmaps straight from our agency practitioners.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 max-w-xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-ink-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keyword, or tool..."
                className="w-full bg-ink-50/80 border border-ink-200 rounded-2xl pl-12 pr-4 py-3.5 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue focus:bg-white transition-all shadow-sm font-body text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-semibold text-ink-400 hover:text-ink-700 bg-ink-200/60 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section className="bg-ink-50/60 border-b border-ink-100 sticky top-[88px] z-20 backdrop-blur-md">
        <div className="section-container py-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "bg-white text-ink-600 hover:text-ink-900 border border-ink-200/80 hover:border-ink-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Articles List Section ── */}
      <section className="section-padding bg-white min-h-[600px]">
        <div className="section-container space-y-12">
          {/* Featured Hero Article */}
          {featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                  Featured Article
                </span>
              </div>

              <Link
                href={`/blog/${featuredBlog.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-ink-50 rounded-3xl border border-ink-100 p-6 md:p-8 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:min-h-[360px] rounded-2xl overflow-hidden">
                  <Image
                    src={
                      featuredBlog.cover_image ||
                      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
                    }
                    alt={featuredBlog.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brand-blue text-xs font-bold uppercase tracking-wider shadow-sm">
                      {featuredBlog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3 text-xs font-medium text-ink-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(featuredBlog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredBlog.read_time || "8 min read"}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200 line-clamp-3">
                    {featuredBlog.title}
                  </h2>

                  <p className="font-body text-ink-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xs">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-ink-800">
                        {featuredBlog.author_name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-brand-blue group-hover:gap-2.5 transition-all duration-200">
                      Read Full Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid of Articles */}
          {gridBlogs.length > 0 ? (
            <div className="space-y-6">
              {featuredBlog && (
                <div className="border-t border-ink-100 pt-8">
                  <h3 className="font-display text-xl font-bold text-ink-900">
                    More Articles & Guides
                  </h3>
                </div>
              )}

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {gridBlogs.map((blog) => (
                  <motion.div key={blog.id || blog.slug} variants={fadeUpItem}>
                    <BlogCard
                      title={blog.title}
                      excerpt={blog.excerpt}
                      coverUrl={blog.cover_image || undefined}
                      date={new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      readTime={blog.read_time}
                      href={`/blog/${blog.slug}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : !featuredBlog ? (
            /* Empty State */
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-ink-100 flex items-center justify-center mx-auto text-ink-400">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink-900">
                No articles found
              </h3>
              <p className="font-body text-sm text-ink-500">
                We couldn&apos;t find any posts matching &quot;{searchQuery || selectedCategory}&quot;. Try adjusting your search or category filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Bottom CTA Card matching Home page aesthetics ── */}
      <section className="bg-ink-50 py-16 border-t border-ink-100">
        <div className="section-container">
          <div className="bg-gradient-to-br from-[#006FFF] to-[#0050B3] rounded-3xl p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-gold text-xs font-bold uppercase tracking-wider">
                Hands-On Agency Training
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Want to Master These Skills With Live Campaigns?
              </h2>

              <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed">
                Join our certified AI-Powered Digital Marketing program. Work on real ₹300 Cr+ client budgets, gain live portfolio proof, and get 100% placement support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  href="/courses/ai-powered-digital-marketing"
                  className="bg-brand-gold hover:bg-yellow-400 text-ink-950 font-bold px-8 py-4 w-full sm:w-auto shadow-lg"
                >
                  Explore Course Curriculum
                </Button>
                <Button
                  variant="outline"
                  href="/contact"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 w-full sm:w-auto"
                >
                  Book Free Demo Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

