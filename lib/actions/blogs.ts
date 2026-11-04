"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author_name: string;
  author_role: string;
  author_image: string | null;
  read_time: string;
  is_published: boolean;
  views: number;
  related_course_slug?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseSummary {
  id?: number;
  slug: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  moduleCount?: number;
  duration?: string;
  format?: string;
  previewImage?: string;
  brochureUrl?: string;
  showCareerFeatures?: boolean;
}

const DEFAULT_COURSES: Record<string, CourseSummary> = {
  "ai-powered-digital-marketing": {
    id: 1,
    slug: "ai-powered-digital-marketing",
    title: "AI-Powered Digital Marketing Course",
    originalPrice: "30000",
    discountedPrice: "25000",
    moduleCount: 12,
    duration: "3 to 6 Months",
    format: "Classroom + Online",
    previewImage: "/uploads/courses/1789123754349-ai-powered-digital-marketing-course-card.png",
    brochureUrl: "/Courses/AI Powered Digital Marketing Course.pdf",
    showCareerFeatures: true,
  },
  "react-js-full-stack-development": {
    id: 2,
    slug: "react-js-full-stack-development",
    title: "React JS Full Stack Development Course",
    originalPrice: "25000",
    discountedPrice: "20000",
    moduleCount: 7,
    duration: "4 to 6 Months",
    format: "Classroom + Online",
    previewImage: "/uploads/courses/1789124003189-react-js-full-stack-developer-course-card.png",
    brochureUrl: "/Courses/React JS Full Stack Development.pdf",
    showCareerFeatures: true,
  },
};

function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all published blogs for public pages.
 */
let hasEnsuredTable = false;

export async function ensureBlogsTable() {
  if (hasEnsuredTable) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image VARCHAR(1000),
        category VARCHAR(100) DEFAULT 'General',
        author_name VARCHAR(255) DEFAULT 'Digital Ghuru Mentors',
        author_role VARCHAR(255) DEFAULT 'Senior Marketing Strategist',
        author_image VARCHAR(1000) DEFAULT '/logo-final dG.webp',
        read_time VARCHAR(50) DEFAULT '5 min read',
        is_published BOOLEAN DEFAULT true,
        views INTEGER DEFAULT 0,
        related_course_slug VARCHAR(255) DEFAULT 'ai-powered-digital-marketing',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
      CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);
      CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

      ALTER TABLE blogs ADD COLUMN IF NOT EXISTS related_course_slug VARCHAR(255) DEFAULT 'ai-powered-digital-marketing';
      ALTER TABLE blogs ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
      ALTER TABLE blogs ADD COLUMN IF NOT EXISTS read_time VARCHAR(50) DEFAULT '5 min read';
    `);
    hasEnsuredTable = true;
  } catch (err) {
    console.error("ensureBlogsTable error:", err);
  }
}

export async function getPublishedBlogs(category?: string): Promise<Blog[]> {
  await ensureBlogsTable();
  try {
    let query = `
      SELECT id, slug, title, excerpt, content, cover_image, category,
             author_name, author_role, author_image, read_time,
             is_published, views, related_course_slug, created_at, updated_at
      FROM blogs
      WHERE is_published = true
    `;
    const params: any[] = [];

    if (category && category !== "All") {
      params.push(category);
      query += ` AND category = $1`;
    }

    query += ` ORDER BY created_at DESC`;

    const res = await pool.query(query, params);
    return res.rows;
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }
}

/**
 * Fetch a single blog by its slug and increment views.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  await ensureBlogsTable();
  try {
    const res = await pool.query(
      `SELECT * FROM blogs WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (res.rows.length === 0) return null;

    // Increment views asynchronously in the background
    pool.query(`UPDATE blogs SET views = views + 1 WHERE slug = $1`, [slug]).catch((err) =>
      console.error("Failed to increment views:", err)
    );

    return res.rows[0];
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Fetch all blogs for the admin dashboard.
 */
export async function getAllBlogsAdmin(): Promise<Blog[]> {
  await ensureBlogsTable();
  try {
    await ensureBlogsTable();
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return [];
    }

    const res = await pool.query(
      `SELECT * FROM blogs ORDER BY created_at DESC`
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    return [];
  }
}

/**
 * Fetch list of published courses for dropdown selectors.
 */
export async function getAvailableCourseOptions(): Promise<Array<{ slug: string; title: string }>> {
  try {
    const res = await pool.query(
      `SELECT slug, title FROM courses ORDER BY id ASC`
    );
    if (res.rows.length > 0) {
      return res.rows;
    }
  } catch (err) {
    console.error("Error fetching course options:", err);
  }

  return [
    { slug: "ai-powered-digital-marketing", title: "AI-Powered Digital Marketing Course" },
    { slug: "react-js-full-stack-development", title: "React JS Full Stack Development Course" },
  ];
}

/**
 * Fetch the exact course data needed to render the LinearSidebarCard for a blog.
 * Intelligently falls back if a blog does not have an explicit course set.
 */
export async function getCourseForBlog(
  courseSlug?: string | null,
  category?: string,
  title?: string
): Promise<CourseSummary> {
  let targetSlug = (courseSlug || "").trim();

  // Automatic semantic detection if no course slug is explicitly configured
  if (!targetSlug) {
    const text = `${category || ""} ${title || ""}`.toLowerCase();
    if (
      text.includes("react") ||
      text.includes("stack") ||
      text.includes("code") ||
      text.includes("web") ||
      text.includes("developer") ||
      text.includes("javascript") ||
      text.includes("frontend") ||
      text.includes("backend")
    ) {
      targetSlug = "react-js-full-stack-development";
    } else if (text.includes("kid") || text.includes("innovator") || text.includes("school")) {
      targetSlug = "ai-super-kids";
    } else {
      targetSlug = "ai-powered-digital-marketing";
    }
  }

  const fallback =
    DEFAULT_COURSES[targetSlug] ||
    DEFAULT_COURSES["ai-powered-digital-marketing"];

  try {
    const res = await pool.query(
      `SELECT id, slug, title, price, marketing_data FROM courses WHERE slug = $1 LIMIT 1`,
      [targetSlug]
    );

    if (res.rows.length === 0) {
      return fallback;
    }

    const db = res.rows[0];
    const m = db.marketing_data || {};

    const discountedPrice =
      m.discountedPrice ||
      (db.price ? String(parseInt(db.price, 10)) : null) ||
      fallback.discountedPrice;

    const originalPrice = m.originalPrice || fallback.originalPrice;

    const previewImage =
      m.cardImage ||
      (targetSlug === "react-js-full-stack-development"
        ? "/uploads/courses/1789124003189-react-js-full-stack-developer-course-card.png"
        : "/uploads/courses/1789123754349-ai-powered-digital-marketing-course-card.png");

    const brochureUrl =
      m.brochureUrl ||
      fallback.brochureUrl ||
      (targetSlug === "react-js-full-stack-development"
        ? "/Courses/React JS Full Stack Development.pdf"
        : "/Courses/AI Powered Digital Marketing Course.pdf");

    const moduleCount =
      Array.isArray(m.curriculum) && m.curriculum.length > 0
        ? m.curriculum.length
        : fallback.moduleCount;

    return {
      id: db.id || fallback.id,
      slug: db.slug || targetSlug,
      title: db.title || fallback.title,
      originalPrice,
      discountedPrice,
      moduleCount,
      duration: m.duration || fallback.duration,
      format: m.format || fallback.format,
      previewImage,
      brochureUrl,
      showCareerFeatures: fallback.showCareerFeatures ?? true,
    };
  } catch (err) {
    console.error("Error fetching course for blog:", err);
    return fallback;
  }
}

/**
 * Create or update a blog post.
 */
export async function upsertBlog(data: {

  slug?: string;
  originalSlug?: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category?: string;
  author_name?: string;
  author_role?: string;
  author_image?: string;
  read_time?: string;
  related_course_slug?: string;
  is_published?: boolean;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const finalSlug = (data.slug && data.slug.trim()) || generateSlug(data.title);
    const finalReadTime = (data.read_time && data.read_time.trim()) || calculateReadTime(data.content);
    const category = data.category || "General";
    const authorName = data.author_name || "Digital Ghuru Mentors";
    const authorRole = data.author_role || "Senior Marketing Strategist";
    const authorImage = data.author_image || "/logo-final dG.webp";
    const isPublished = data.is_published ?? true;
    const coverImage = data.cover_image || null;
    const relatedCourseSlug =
      (data.related_course_slug && data.related_course_slug.trim()) ||
      "ai-powered-digital-marketing";

    if (data.originalSlug && data.originalSlug !== finalSlug) {
      // Slug was changed during edit: update existing record with new slug
      await pool.query(
        `UPDATE blogs
         SET slug = $1, title = $2, excerpt = $3, content = $4, cover_image = $5,
             category = $6, author_name = $7, author_role = $8, author_image = $9,
             read_time = $10, is_published = $11, related_course_slug = $12, updated_at = NOW()
         WHERE slug = $13`,
        [
          finalSlug,
          data.title,
          data.excerpt,
          data.content,
          coverImage,
          category,
          authorName,
          authorRole,
          authorImage,
          finalReadTime,
          isPublished,
          relatedCourseSlug,
          data.originalSlug,
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO blogs (slug, title, excerpt, content, cover_image, category,
                            author_name, author_role, author_image, read_time, is_published,
                            related_course_slug, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           excerpt = EXCLUDED.excerpt,
           content = EXCLUDED.content,
           cover_image = EXCLUDED.cover_image,
           category = EXCLUDED.category,
           author_name = EXCLUDED.author_name,
           author_role = EXCLUDED.author_role,
           author_image = EXCLUDED.author_image,
           read_time = EXCLUDED.read_time,
           is_published = EXCLUDED.is_published,
           related_course_slug = EXCLUDED.related_course_slug,
           updated_at = NOW()`,
        [
          finalSlug,
          data.title,
          data.excerpt,
          data.content,
          coverImage,
          category,
          authorName,
          authorRole,
          authorImage,
          finalReadTime,
          isPublished,
          relatedCourseSlug,
        ]
      );
    }

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${finalSlug}`);
      if (data.originalSlug && data.originalSlug !== finalSlug) {
        revalidatePath(`/blog/${data.originalSlug}`);
      }
      revalidatePath("/admin/blogs");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidation error:", e);
    }

    return { success: true, slug: finalSlug };
  } catch (error: any) {
    console.error("Error upserting blog:", error);
    return { success: false, error: error?.message || "Failed to save blog post." };
  }
}

/**
 * Delete a blog post.
 */
export async function deleteBlog(slug: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await pool.query(`DELETE FROM blogs WHERE slug = $1`, [slug]);

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/admin/blogs");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidation error:", e);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog." };
  }
}

/**
 * Quick toggle published status of a blog post.
 */
export async function toggleBlogPublish(slug: string, isPublished: boolean) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await pool.query(
      `UPDATE blogs SET is_published = $1, updated_at = NOW() WHERE slug = $2`,
      [isPublished, slug]
    );

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/admin/blogs");
    } catch (e) {
      console.error("Revalidation error:", e);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error toggling blog status:", error);
    return { success: false, error: "Failed to toggle status." };
  }
}
