import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";
import { CourseData, courseMap } from "@/lib/courseData";
import { ArrowLeft } from "lucide-react";

import ModernLinearCourseLayout from "@/components/sections/course-linear/ModernLinearCourseLayout";

export const dynamic = "force-dynamic";

export default async function StudentCourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // 1. Fetch from Database
  let dbCourse = null;
  try {
    const res = await pool.query(
      `SELECT * FROM courses WHERE id = $1 AND "isPublished" = true`,
      [parseInt(id)]
    );
    if (res.rows.length > 0) {
      dbCourse = res.rows[0];
    }
  } catch (error) {
    console.error("DB Error fetching course:", error);
  }

  if (!dbCourse) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4 text-ink-900">Course Not Found</h1>
        <p className="body-lg mb-8 text-ink-500">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/student/dashboard" className="bg-brand-blue text-white px-6 py-3 rounded-full font-bold">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // 2. Fetch static fallback based on slug if needed
  const staticCourse = courseMap[dbCourse.slug];

  // 3. Merge data
  const finalCourse: CourseData = {
    ...(staticCourse || {}),
    ...dbCourse.marketing_data,
    title: dbCourse.title,
    description: dbCourse.description || dbCourse.marketing_data?.description || staticCourse?.description,
  } as CourseData;

  // 4. Fetch curriculum if not in marketing_data
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

  return (
    <div className="relative rounded-[32px] overflow-hidden bg-white shadow-card border border-ink-100">
       <div className="bg-white border-b border-ink-100 py-4 px-6 md:px-12">
          <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-brand-blue font-bold text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
       </div>
       <ModernLinearCourseLayout course={finalCourse} />
    </div>
  );
}
