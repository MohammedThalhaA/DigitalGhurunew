"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Calendar, ArrowRight, BookOpen, User, Sparkles } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import type { Blog } from "@/lib/actions/blogs";

interface StudentBlogListClientProps {
  initialBlogs: Blog[];
}

export default function StudentBlogListClient({ initialBlogs }: StudentBlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialBlogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialBlogs.filter((blog) => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        (blog.category && blog.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  const featuredBlog =
    selectedCategory === "All" && !searchQuery.trim() && filteredBlogs.length > 0
      ? filteredBlogs[0]
      : null;

  const gridBlogs = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Learning Hub &amp; Guides</span>
          </div>
          <h1 className="heading-md text-ink-900 tracking-tight mb-2">Blogs &amp; Articles</h1>
          <p className="body-md text-ink-500">
            Explore marketing playbooks, AI workflows, and career insights directly inside your portal.
          </p>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white border border-ink-200 rounded-2xl pl-10 pr-16 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-500 hover:text-ink-900 bg-ink-100 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white text-ink-600 hover:text-ink-900 border border-ink-200 hover:border-ink-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Featured Latest Article */}
      {featuredBlog && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
              Featured Article
            </span>
          </div>
          <Link
            href={`/student/blog/${featuredBlog.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white rounded-3xl border border-ink-100 p-5 md:p-7 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 overflow-hidden"
          >
            <div className="lg:col-span-6 relative aspect-[16/9] lg:aspect-auto lg:min-h-[300px] rounded-2xl overflow-hidden bg-ink-50">
              <Image
                src={
                  featuredBlog.cover_image ||
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
                }
                alt={featuredBlog.title}
                title={featuredBlog.title}
                width={700}
                height={394}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {featuredBlog.category && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-blue text-xs font-bold uppercase tracking-wider shadow-sm">
                    {featuredBlog.category}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3 text-xs font-medium text-ink-400">
                <span className="flex items-center gap-1.5" suppressHydrationWarning>
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
                  {featuredBlog.read_time || "5 min read"}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors line-clamp-3">
                {featuredBlog.title}
              </h2>

              <p className="font-body text-ink-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                {featuredBlog.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-ink-800">{featuredBlog.author_name}</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-brand-blue group-hover:gap-2.5 transition-all">
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Articles Grid */}
      {gridBlogs.length > 0 ? (
        <div className="space-y-5">
          {featuredBlog && (
            <h2 className="font-display text-xl font-bold text-ink-900">More Articles &amp; Guides</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridBlogs.map((blog) => (
              <BlogCard
                key={blog.id || blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                coverUrl={blog.cover_image || undefined}
                date={new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                readTime={blog.read_time}
                href={`/student/blog/${blog.slug}`}
              />
            ))}
          </div>
        </div>
      ) : !featuredBlog ? (
        <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="h-14 w-14 rounded-2xl bg-ink-50 flex items-center justify-center mx-auto text-ink-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="font-display text-xl font-bold text-ink-900">No articles found</h3>
          <p className="font-body text-sm text-ink-500">
            {initialBlogs.length === 0
              ? "No blog articles have been published yet. Check back soon!"
              : `No articles matched "${searchQuery || selectedCategory}". Try clearing your filters.`}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue text-white font-heading font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
