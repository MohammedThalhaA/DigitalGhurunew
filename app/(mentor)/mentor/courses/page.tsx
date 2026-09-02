import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { PlusCircle, Edit3 } from "lucide-react";

export default async function InstructorCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  // Fetch courses created by this instructor
  const coursesRes = await pool.query(
    `SELECT * FROM courses WHERE "instructorId" = $1 ORDER BY "createdAt" DESC`,
    [parseInt(session.user.id)]
  );
  
  const courses = coursesRes.rows;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-ink-100 min-h-[500px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-ink-900 mb-1">Manage Courses</h1>
          <p className="text-ink-500 text-sm">Create and edit your course catalog.</p>
        </div>
        <Button variant="primary" href="/mentor/courses/new" className="shrink-0 flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16 bg-ink-50 rounded-2xl border border-ink-100 border-dashed">
          <h2 className="text-lg font-bold text-ink-900 mb-2">No courses yet</h2>
          <p className="text-ink-500 max-w-sm mx-auto mb-6">
            You haven't created any courses. Click the button above to start building your curriculum!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-ink-100 hover:border-brand-orange/50 hover:shadow-card transition-all gap-4 group">
              <div className="flex items-center gap-5 flex-1">
                <div className="h-16 w-24 bg-ink-100 rounded-lg overflow-hidden shrink-0">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-300 font-bold text-xs">NO IMG</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-ink-900 text-lg line-clamp-1">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${course.isPublished ? "bg-green-100 text-green-700" : "bg-ink-100 text-ink-600"}`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                    <span className="text-sm font-semibold text-brand-orange">
                      {course.price ? `₹${course.price}` : "Free"}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" href={`/mentor/courses/${course.id}`} className="shrink-0">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Course
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

