import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseEditor from "@/components/admin/CourseEditor";

import { courseMap } from "@/lib/courseData";

export default async function AdminCourseContentPage({
  params
}: {
  params: { courseId: string }
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  // Verify course exists
  const courseRes = await pool.query(
    `SELECT * FROM courses WHERE id = $1`,
    [params.courseId]
  );

  if (courseRes.rows.length === 0) {
    redirect("/admin/courses");
  }

  const course = courseRes.rows[0];
  const staticCourseFallback = courseMap[course.slug] || {};

  // Fetch modules and chapters
  const modulesRes = await pool.query(
    `SELECT * FROM modules WHERE "courseId" = $1 ORDER BY position ASC`,
    [params.courseId]
  );
  const modules = modulesRes.rows;

  const chaptersRes = await pool.query(
    `SELECT * FROM chapters WHERE "moduleId" IN (SELECT id FROM modules WHERE "courseId" = $1) ORDER BY position ASC`,
    [params.courseId]
  );
  const chapters = chaptersRes.rows;

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/courses"
          className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition-colors shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="font-heading text-xs font-semibold text-brand-blue uppercase tracking-[0.15em] mb-1">Course Editor</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900">{course.title}</h1>
        </div>
      </div>

      <CourseEditor 
        course={course}
        initialModules={modules}
        initialChapters={chapters}
      />
    </div>
  );
}
