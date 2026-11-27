import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/actions/blogs";
import BlogShareBar from "@/components/blog/BlogShareBar";
import { renderBlogContentHtml } from "@/lib/blogUtils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function StudentBlogDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const blog = await getBlogBySlug(params.slug);
  if (!blog || !blog.is_published) {
    notFound();
  }

  const allBlogs = await getPublishedBlogs();
  const relatedPosts = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/student/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-blue transition-colors group"
        >
          <div className="h-8 w-8 rounded-full bg-white border border-ink-200 flex items-center justify-center group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all shadow-sm">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to All Blogs
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="text-xs text-ink-400">•</span>
          <span className="text-xs font-medium text-ink-500 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {blog.read_time || "5 min read"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-ink-900 tracking-tight leading-[1.15]">
          {blog.title}
        </h1>
      </div>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-card border border-ink-100 relative bg-white">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            title={blog.title}
            width={1200}
            height={514}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Byline Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-ink-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 text-brand-blue font-bold">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-900 leading-tight">{blog.author_name}</p>
            <p className="text-xs text-ink-500">{blog.author_role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-ink-400">
          <span className="flex items-center gap-1.5" suppressHydrationWarning>
            <Calendar className="h-3.5 w-3.5" />
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1" suppressHydrationWarning>
            <Eye className="h-3.5 w-3.5 text-brand-blue" />
            {(blog.views || 0).toLocaleString()} reads
          </span>
        </div>
      </div>

      {/* Excerpt */}
      {blog.excerpt && (
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-ink-200/80 shadow-sm">
          <p className="font-heading font-medium text-lg sm:text-xl text-ink-900 leading-relaxed italic">
            &ldquo;{blog.excerpt}&rdquo;
          </p>
        </div>
      )}

      {/* Share Bar */}
      <Suspense fallback={<div className="h-14" />}>
        <BlogShareBar title={blog.title} slug={blog.slug} />
      </Suspense>

      {/* Main Article Body */}
      <article className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 sm:p-10 md:p-12">
        <div
          className="article-content max-w-none"
          dangerouslySetInnerHTML={{ __html: renderBlogContentHtml(blog.content, blog.title) }}
        />
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="pt-10 border-t border-ink-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Keep Reading
              </span>
              <h3 className="text-2xl font-display font-bold text-ink-900">More from the Blog</h3>
            </div>
            <Link
              href="/student/blog"
              className="text-sm font-heading font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id || related.slug}
                href={`/student/blog/${related.slug}`}
                className="group block bg-white rounded-3xl border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                {related.cover_image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={related.cover_image}
                      alt={related.title}
                      title={related.title}
                      width={384}
                      height={216}
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 space-y-2.5">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                    {related.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-ink-500 line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-brand-blue pt-1">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
