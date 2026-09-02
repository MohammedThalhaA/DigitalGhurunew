import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Users, BookOpen, IndianRupee } from "lucide-react";

export default async function InstructorDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  // Fetch basic stats
  const coursesRes = await pool.query(`SELECT COUNT(*) FROM courses WHERE "instructorId" = $1`, [parseInt(session.user.id)]);
  const totalCourses = parseInt(coursesRes.rows[0].count);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-extrabold text-ink-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Total Students</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Total Courses</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">{totalCourses}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <IndianRupee className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">₹0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-ink-100 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-ink-900 mb-2">Quick Actions</h2>
        <p className="text-ink-500 text-sm mb-6">Manage your curriculum and track student progress.</p>
        
        <div className="flex gap-4">
          <Button variant="primary" href="/mentor/courses/new">
            Create a Course
          </Button>
          <Button variant="outline" href="/mentor/courses">
            View All Courses
          </Button>
        </div>
      </div>
    </div>
  );
}

