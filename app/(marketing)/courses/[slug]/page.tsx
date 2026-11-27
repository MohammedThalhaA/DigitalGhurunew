import React, { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import pool from "@/lib/db";
import { courseMap, CourseData } from "@/lib/courseData";

import ModernLinearCourseLayout from "@/components/sections/course-linear/ModernLinearCourseLayout";

export const revalidate = 60;

const getCourseData = cache(async (slug: string): Promise<CourseData | null> => {
  let dbCourse = null;
  try {
    const res = await pool.query(
      `SELECT * FROM courses WHERE slug = $1 AND "isPublished" = true`,
      [slug]
    );
    if (res.rows.length > 0) {
      dbCourse = res.rows[0];
    }
  } catch (error) {
    console.error("DB Error fetching course:", error);
  }

  const staticCourse = courseMap[slug];

  if (!dbCourse && !staticCourse) {
    return null;
  }

  let finalCourse: CourseData;
  
  if (dbCourse && dbCourse.marketing_data && Object.keys(dbCourse.marketing_data).length > 0) {
    finalCourse = {
      ...(staticCourse || {}),
      ...dbCourse.marketing_data,
      title: dbCourse.title,
      description: dbCourse.description || dbCourse.marketing_data.description || staticCourse?.description,
      id: dbCourse.id,
    } as CourseData;

    if (!finalCourse.curriculum || finalCourse.curriculum.length === 0) {
      try {
        const dbMods = await pool.query(
          `SELECT m.id, m.title, 
            COALESCE(json_agg(c.title ORDER BY c.position ASC) FILTER (WHERE c.id IS NOT NULL), '[]') as topics
           FROM modules m
           LEFT JOIN chapters c ON c."moduleId" = m.id
           WHERE m."courseId" = $1
           GROUP BY m.id, m.title, m.position
           ORDER BY m.position ASC`,
          [dbCourse.id]
        );
        if (dbMods.rows.length > 0) {
          finalCourse.curriculum = dbMods.rows.map((r: any) => ({
            module: r.title,
            topics: Array.isArray(r.topics) ? r.topics : (typeof r.topics === 'string' ? JSON.parse(r.topics) : [])
          }));
        }
      } catch (err) {
        console.error("Error fetching curriculum from db:", err);
      }
    }
  } else {
    finalCourse = staticCourse;
  }

  return finalCourse;
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = await getCourseData(params.slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  const pageUrl = `https://digitalghuru.com/courses/${params.slug}`;
  const isReact = params.slug.includes("react");

  const metaDesc = (course as any).metaDescription || (isReact
    ? "Master React JS full stack development with Node.js, Express, MongoDB, live capstone projects, and placement support at Digital Ghuru."
    : "Master AI digital marketing with live campaigns, SEO, ads, automation, and 100% placement support at Digital Ghuru.");

  const ogDesc = (course as any).ogDescription || (isReact
    ? "Build production-ready web apps with React JS, Node.js, Express, and MongoDB with 1-on-1 mentorship at Digital Ghuru."
    : "Explore our AI digital marketing course with live campaigns, modern AI tools, and placement support at Digital Ghuru.");

  const twitterDesc = (course as any).twitterDescription || (isReact
    ? "Learn React JS full stack development with live projects, modern web frameworks, and career placement help at Digital Ghuru."
    : "Learn AI digital marketing with live ad campaigns, SEO, automations, and placement support at Digital Ghuru.");

  const imgUrl = (course as any).cardImage || "https://digitalghuru.com/images/Hero Image.webp";

  return {
    title: course.title,
    description: metaDesc,
    alternates: {
      canonical: pageUrl,
    },
    keywords: isReact
      ? [
          course.title,
          "React JS full stack development in chennai",
          "React JS developer course",
          "full stack web development institute in chennai",
          "MERN stack training",
          "Node JS Express MongoDB course",
        ]
      : [
          course.title,
          "AI powered digital marketing in chennai",
          "AI powered digital marketing in hyderabad",
          "AI digital marketing institute in chennai",
          "AI digital marketing training in hyderabad",
          "best AI digital marketing course",
          "learn AI marketing online",
        ],
    openGraph: {
      title: `${course.title} | Digital Ghuru`,
      description: ogDesc,
      url: pageUrl,
      siteName: "Digital Ghuru",
      type: "website",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Digital Ghuru`,
      description: twitterDesc,
      images: [imgUrl],
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const finalCourse = await getCourseData(slug);

  if (!finalCourse) {
    return (
      <div className="section-container section-padding text-center">
        <h3 className="heading-lg mb-4 text-[var(--tw-colors-ink-900)]">Course Not Found</h3>
        <p className="body-lg mb-8 text-ink-500">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="bg-brand-blue text-white px-6 py-3 rounded-full font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  // Generate JSON-LD Structured Data for Course
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": finalCourse.title,
    "description": finalCourse.description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Ghuru",
      "sameAs": "https://digitalghuru.com"
    }
  };

  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Every course uses the unified Modern Linear Layout */}
      <ModernLinearCourseLayout course={finalCourse} />
    </>
  );
}
