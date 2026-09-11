import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Plus, BookOpen, Edit, Settings } from "lucide-react";

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  // Fetch all courses for admins
  const res = await pool.query(
    `SELECT * FROM courses ORDER BY "createdAt" DESC`
  );
  const courses = res.rows;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Manage Courses</h1>
          <p className="font-body text-base text-ink-500">Create new courses and upload recorded modules.</p>
        </div>
        <Button variant="primary" href="/admin/courses/new" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-blue" />
            Your Courses
          </h2>
        </div>

        {courses.length === 0 ? (
          <div className="p-12 text-center">
            <div className="h-16 w-16 bg-ink-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-ink-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-ink-900 mb-2">No courses yet</h3>
            <p className="font-body text-ink-500 mb-6">Create your first course to start uploading modules.</p>
            <Button variant="primary" href="/admin/courses/new">Create Course</Button>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {courses.map((course) => (
              <div key={course.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-ink-50/50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-blue/10 to-purple-500/10 border border-brand-blue/20 flex items-center justify-center shrink-0 overflow-hidden">
                    {course.marketing_data?.cardImage || course.marketing_data?.thumbnail ? (
                      <img 
                        src={course.marketing_data?.cardImage || course.marketing_data?.thumbnail} 
                        alt={course.title} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <BookOpen className="h-5 w-5 text-brand-blue" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-900 mb-1 group-hover:text-brand-blue transition-colors">{course.title}</h3>
                    <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">
                      Created {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/admin/courses/${course.id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-ink-50 border border-ink-200 text-ink-700 hover:text-brand-blue font-heading text-sm font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    <Edit className="h-4 w-4" />
                    Manage Content
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
