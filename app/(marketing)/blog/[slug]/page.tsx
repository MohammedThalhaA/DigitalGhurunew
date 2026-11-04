import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Eye,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getBlogBySlug, getPublishedBlogs, getCourseForBlog } from "@/lib/actions/blogs";
import BlogShareBar from "@/components/blog/BlogShareBar";
import BlogCourseSidebar from "@/components/blog/BlogCourseSidebar";
import { renderBlogContentHtml } from "@/lib/blogUtils";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    return {
      title: "Article Not Found | Digital Ghuru",
      description: "The requested article does not exist.",
    };
  }

  const canonicalUrl = `https://digitalghuru.com/blog/${blog.slug}`;

  return {
    title: `${blog.title} | Digital Ghuru`,
    description: blog.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${blog.title} | Digital Ghuru`,
      description: blog.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author_name],
      images: blog.cover_image ? [{ url: blog.cover_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [blog.cover_image] : undefined,
    },
  };
}

/**
 * Format markdown or rich HTML into beautifully styled article blocks
 */
function renderArticleContent(content: string) {
  if (!content) return null;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderBlogContentHtml(content) }}
    />
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog || !blog.is_published) {
    notFound();
  }

  // Fetch related posts
  const allBlogs = await getPublishedBlogs();
  const relatedPosts = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  // Fetch course dynamically related to this specific blog post
  const relatedCourse = await getCourseForBlog(
    blog.related_course_slug,
    blog.category,
    blog.title
  );

  return (
    <div className="bg-ink-50 min-h-screen relative pb-28">
      {/* ── AMBIENT MESH BACKGROUND ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[600px] overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation & Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-blue transition-colors mb-8 group"
          >
            <div className="h-8 w-8 rounded-full bg-white border border-ink-200 flex items-center justify-center group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to All Articles
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="text-xs text-ink-400">•</span>
              <span className="text-xs font-medium text-ink-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {blog.read_time || "5 min read"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-ink-900 tracking-tight leading-[1.15]">
              {blog.title}
            </h1>
          </div>
        </div>

        {/* Featured Cover Image */}
        {blog.cover_image && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="aspect-[21/9] md:aspect-[2.4/1] rounded-3xl overflow-hidden shadow-card border border-white relative group">
              <Image
                src={blog.cover_image}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        )}

        {/* ── 2-COLUMN ARTICLE LAYOUT ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start justify-between">
            {/* LEFT SIDEBAR: Related Course Enrollment Card */}
            <Suspense fallback={<div className="w-full lg:w-[380px] shrink-0 h-96 bg-ink-100/60 rounded-2xl animate-pulse" />}>
              <BlogCourseSidebar course={relatedCourse} />
            </Suspense>

            {/* RIGHT CONTENT AREA: The Blog Article */}
            <article className="w-full flex-1 min-w-0 order-1 lg:order-2">
              {/* Editorial Byline Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-ink-100 shadow-sm mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 text-brand-blue font-bold">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900 leading-tight">
                      {blog.author_name}
                    </p>
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

              {/* Excerpt Callout */}
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-ink-200/80 shadow-sm mb-8">
                <p className="font-heading font-medium text-lg sm:text-xl text-ink-900 leading-relaxed italic">
                  &ldquo;{blog.excerpt}&rdquo;
                </p>
              </div>

              {/* Share Bar */}
              <Suspense fallback={<div className="h-14 my-8" />}>
                <BlogShareBar title={blog.title} slug={blog.slug} />
              </Suspense>

              {/* Body Content */}
              <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 sm:p-10 md:p-12">
                <div className="article-content max-w-none">
                  {renderArticleContent(blog.content)}
                </div>
              </div>

              {/* Author Bio Card at Bottom */}
              <div className="mt-8 p-6 sm:p-8 bg-white rounded-2xl border border-ink-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  DG
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    About The Author
                  </p>
                  <h4 className="font-heading font-bold text-lg text-ink-900">
                    {blog.author_name}
                  </h4>
                  <p className="text-sm font-medium text-ink-500">
                    {blog.author_role} at Digital Ghuru
                  </p>
                  <p className="text-sm text-ink-600 leading-relaxed pt-1">
                    Sharing industry insights, agency workflows, and real-world marketing frameworks to help students and professionals build thriving digital careers.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* ── RELATED ARTICLES ── */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-ink-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  Keep Learning
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink-900">
                  Recommended Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-heading font-bold text-brand-blue hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id || related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-white rounded-3xl border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                >
                  {related.cover_image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={related.cover_image}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8 space-y-3">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                      {related.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-ink-500 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-brand-blue pt-2">
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

      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.excerpt,
            image: blog.cover_image ? [blog.cover_image] : undefined,
            datePublished: blog.created_at,
            dateModified: blog.updated_at,
            author: {
              "@type": "Person",
              name: blog.author_name,
            },
            publisher: {
              "@type": "Organization",
              name: "Digital Ghuru",
              logo: {
                "@type": "ImageObject",
                url: "https://digitalghuru.com/icon.svg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://digitalghuru.com/blog/${blog.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
