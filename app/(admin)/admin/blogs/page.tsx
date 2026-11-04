import React from "react";
import Link from "next/link";
import Image from "next/image";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Plus, Newspaper, Calendar, Eye, Clock, CheckCircle2, FileEdit } from "lucide-react";
import BlogActions from "./BlogActions";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function AdminBlogsPage() {
  let blogs: any[] = [];
  try {
    const res = await pool.query(`SELECT * FROM blogs ORDER BY created_at DESC`);
    blogs = res.rows || [];
  } catch (err) {
    console.error("Failed to query admin blogs:", err);
  }

  const publishedCount = blogs.filter((b) => b.is_published).length;
  const draftCount = blogs.length - publishedCount;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-1 flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-brand-blue" />
            Blog Posts
          </h1>
          <p className="font-body text-base text-ink-500">
            Publish and manage educational guides, articles, and industry insights.
          </p>
        </div>
        <Button variant="primary" href="/admin/blogs/new">
          <Plus className="h-4 w-4 mr-2" />
          Write New Blog
        </Button>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
            <Newspaper className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-500">Total Articles</p>
            <p className="text-2xl font-bold text-ink-900">{blogs.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-500">Published Live</p>
            <p className="text-2xl font-bold text-emerald-600">{publishedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-500">Total Views</p>
            <p className="text-2xl font-bold text-purple-600">{totalViews.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ── Blog List Container ── */}
      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <span>All Articles</span>
            <span className="text-xs bg-ink-100 text-ink-600 px-2.5 py-0.5 rounded-full font-bold">
              {blogs.length}
            </span>
          </h2>
          <Link
            href="/blog"
            target="_blank"
            className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
          >
            Visit Public Blog
            <span>→</span>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="p-16 text-center text-ink-500 space-y-4">
            <Newspaper className="h-12 w-12 mx-auto text-ink-300" />
            <p className="text-lg font-heading font-semibold text-ink-700">No blog posts found</p>
            <p className="text-sm text-ink-400 max-w-md mx-auto">
              Get started by publishing your first article to share valuable insights with your students and audience.
            </p>
            <Button variant="primary" href="/admin/blogs/new">
              <Plus className="h-4 w-4 mr-2" />
              Write First Article
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-ink-50/50 transition-colors"
              >
                {/* Left Thumbnail + Info */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {typeof blog.cover_image === "string" && blog.cover_image.trim().length > 0 && (blog.cover_image.startsWith("/") || blog.cover_image.startsWith("http")) ? (
                    <div className="relative h-16 w-24 sm:h-20 sm:w-32 rounded-xl overflow-hidden bg-ink-100 shrink-0 border border-ink-200">
                      <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-24 sm:h-20 sm:w-32 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 flex items-center justify-center text-brand-blue shrink-0 border border-ink-200">
                      <Newspaper className="h-6 w-6" />
                    </div>
                  )}

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          blog.is_published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {blog.is_published ? "Live" : "Draft"}
                      </span>
                      <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full">
                        {blog.category || "General"}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-ink-900 truncate pr-2">
                      {blog.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-ink-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.read_time || "5 min read"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-ink-600 font-semibold">
                        <Eye className="h-3.5 w-3.5 text-brand-blue" />
                        {(blog.views || 0).toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <BlogActions slug={blog.slug} isPublished={blog.is_published} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

