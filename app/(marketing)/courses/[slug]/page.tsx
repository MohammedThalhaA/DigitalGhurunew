import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";
import { courseMap, CourseData } from "@/lib/courseData";

import UdemyStyleHero from "@/components/sections/course-new/UdemyStyleHero";
import StickyEnrollmentCard from "@/components/sections/course-new/StickyEnrollmentCard";
import CourseOverview from "@/components/sections/course-new/CourseOverview";
import ProgramHighlights from "@/components/sections/course-new/ProgramHighlights";
import WhoShouldJoin from "@/components/sections/course-new/WhoShouldJoin";
import CourseModules from "@/components/sections/course-new/CourseModules";
import ToolsMastered from "@/components/sections/course-new/ToolsMastered";
import CourseFAQs from "@/components/sections/course-new/CourseFAQs";

import ModernLinearCourseLayout from "@/components/sections/course-linear/ModernLinearCourseLayout";

export const dynamic = "force-dynamic";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // 1. Fetch from Database First
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

  // 2. Fallback to hardcoded courseMap
  const staticCourse = courseMap[slug];

  if (!dbCourse && !staticCourse) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4 text-[var(--tw-colors-ink-900)]">Course Not Found</h1>
        <p className="body-lg mb-8 text-ink-500">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="bg-brand-blue text-white px-6 py-3 rounded-full font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  // 3. Merge data (DB marketing_data overrides static data if it has keys)
  let finalCourse: CourseData;
  
  if (dbCourse && dbCourse.marketing_data && Object.keys(dbCourse.marketing_data).length > 0) {
    // If we have rich marketing data in DB, use it!
    finalCourse = {
      ...(staticCourse || {}),
      ...dbCourse.marketing_data,
      title: dbCourse.title,
      description: dbCourse.description || dbCourse.marketing_data.description || staticCourse?.description,
    } as CourseData;

    // If curriculum isn't in marketing_data, fetch from modules/chapters tables
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
          finalCourse.curriculum = dbMods.rows.map(r => ({
            module: r.title,
            topics: Array.isArray(r.topics) ? r.topics : (typeof r.topics === 'string' ? JSON.parse(r.topics) : [])
          }));
        }
      } catch (err) {
        console.error("Error fetching curriculum from db:", err);
      }
    }
  } else {
    // Just use static
    finalCourse = staticCourse;
  }

  // Every course uses the unified Modern Linear Layout with all 5 common career & project sections
  return <ModernLinearCourseLayout course={finalCourse} />;

  // Default layout for other courses (Udemy/Coursera 2-column style)
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 relative">
      <UdemyStyleHero 
        title={finalCourse.title}
        subtitle={finalCourse.subtitle}
        description={finalCourse.description}
        lastUpdated="11/2026"
        rating="4.8"
        enrolled="10,000+"
      />

      <div className="section-container relative z-10 flex flex-col xl:flex-row gap-8 pt-12">
        <div className="xl:w-[65%] w-full">
          <CourseOverview description={finalCourse.description} outcomes={finalCourse.outcomes} />
          <ProgramHighlights usps={finalCourse.usps || []} specialHighlights={finalCourse.specialHighlights} />
          <WhoShouldJoin whoIsThisFor={finalCourse.whoIsThisFor} />
          <CourseModules curriculum={finalCourse.curriculum || []} />
          <ToolsMastered tools={finalCourse.tools || []} />
          <CourseFAQs faqs={finalCourse.faqs} />
        </div>

        <div className="xl:w-[35%] w-full">
           <StickyEnrollmentCard 
             originalPrice={finalCourse.originalPrice}
             discountedPrice={finalCourse.discountedPrice}
             imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
           />
        </div>
      </div>
    </main>
  );
}
