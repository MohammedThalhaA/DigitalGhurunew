import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Settings } from "lucide-react";

export default async function CourseIdPage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/signin");
  }

  // Fetch course and verify ownership
  const courseRes = await pool.query(
    `SELECT * FROM courses WHERE id = $1 AND "instructorId" = $2`,
    [parseInt(params.courseId), parseInt(session.user.id)]
  );

  if (courseRes.rows.length === 0) {
    return redirect("/mentor/courses");
  }

  const course = courseRes.rows[0];

  // Fetch modules
  const modulesRes = await pool.query(
    `SELECT * FROM modules WHERE "courseId" = $1 ORDER BY position ASC`,
    [course.id]
  );
  const modules = modulesRes.rows;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/mentor/courses" className="flex items-center text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to courses
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-extrabold text-ink-900">Course Setup</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="primary" size="sm">
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Customize your course */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold text-ink-900">Customize your course</h2>
          </div>

          <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-ink-900">Course title</span>
              <button className="text-sm font-semibold text-brand-blue hover:underline">Edit</button>
            </div>
            <p className="text-ink-600 text-sm">{course.title}</p>
          </div>

          <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-ink-900">Course description</span>
              <button className="text-sm font-semibold text-brand-blue hover:underline">Edit</button>
            </div>
            <p className="text-ink-500 text-sm italic">{course.description || "No description provided"}</p>
          </div>
          
          <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-ink-900">Course price</span>
              <button className="text-sm font-semibold text-brand-blue hover:underline">Edit</button>
            </div>
            <p className="text-ink-600 text-sm">{course.price ? `₹${course.price}` : "Free"}</p>
          </div>
        </div>

        {/* Course modules */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold text-ink-900">Course chapters</h2>
          </div>

          <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-ink-900">Course modules</span>
              <button className="text-sm font-semibold text-brand-blue hover:underline">Add a module</button>
            </div>
            
            {modules.length === 0 ? (
              <p className="text-sm text-ink-500 italic mt-2">No modules have been created yet.</p>
            ) : (
              <div className="space-y-2 mt-4">
                {modules.map((mod: any) => (
                  <div key={mod.id} className="p-3 bg-ink-50 border border-ink-100 rounded-xl flex items-center justify-between">
                    <span className="font-semibold text-ink-800">{mod.title}</span>
                    <button className="text-xs font-bold text-brand-blue">Edit</button>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-xs text-ink-500 mt-6 pt-4 border-t border-ink-100">
              Drag and drop to reorder modules (Coming Soon)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
