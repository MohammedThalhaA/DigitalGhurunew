import { MetadataRoute } from 'next';
import pool from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the canonical production URL as base
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  const baseUrl = (envUrl && !envUrl.includes("digitalghuru.in") && !envUrl.includes("www.digitalghuru.com"))
    ? envUrl
    : 'https://digitalghuru.com';

  // 1. Fetch dynamic courses from the database
  let courseUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await pool.query(`SELECT slug, "updatedAt" FROM courses WHERE "isPublished" = true`);
    courseUrls = res.rows.map((course: any) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: course.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  // 2. Define static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/careers',
    '/contact',
    '/blog',
    '/tools',
    '/tools/cpc-calculator',
    '/tools/roi-calculator',
    '/resources/tools',
    '/newsletter',
    '/life-at-digitalghuru',
    '/success-stories',
    '/verify',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : (route.startsWith('/tools') ? 0.9 : 0.8),
  }));

  return [...staticRoutes, ...courseUrls];
}
