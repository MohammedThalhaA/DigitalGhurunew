import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { PlayCircle, Clock, Award, BookOpen } from "lucide-react";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  // Fetch enrolled courses for the student using raw SQL
  const enrollmentsRes = await pool.query(
    `
    SELECT c.id, c.title, c."imageUrl", c.description
    FROM courses c
    INNER JOIN enrollments e ON e."courseId" = c.id
    WHERE e."userId" = $1
    ORDER BY e."createdAt" DESC
    LIMIT 3
    `,
    [parseInt(session.user.id)]
  );

  const recentCourses = enrollmentsRes.rows;
  
  // Dummy stats for the dashboard feel
  const stats = {
    enrolledCount: enrollmentsRes.rowCount || 0,
    completedCourses: 0,
    hoursLearned: 12,
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">Welcome back, {session.user.name?.split(' ')[0]}! 👋</h1>
        <p className="text-lg text-ink-500 font-medium">Pick up right where you left off and continue your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Enrolled Courses</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">{stats.enrolledCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">{stats.completedCourses}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Hours Learned</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">{stats.hoursLearned}h</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-black text-ink-900 tracking-tight">Jump back in</h2>
          <Link href="/student/courses" className="text-sm font-bold text-brand-blue hover:underline">
            View all courses
          </Link>
        </div>

        {recentCourses.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-ink-100 p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="mx-auto w-16 h-16 bg-ink-50 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-ink-300" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">No active enrollments</h3>
            <p className="text-ink-500 max-w-md mx-auto mb-6">
              You haven't enrolled in any courses yet. Explore our catalog to start learning.
            </p>
            <Button variant="primary" href="/student/browse">
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <div key={course.id} className="bg-white/90 backdrop-blur-md group border border-ink-100/50 rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="aspect-video bg-ink-50 relative overflow-hidden shrink-0">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-300">
                      <PlayCircle className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-ink-900 mb-1 line-clamp-1">{course.title}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-ink-500 mb-1">
                      <span>Progress</span>
                      <span className="text-brand-blue">24%</span>
                    </div>
                    <div className="w-full bg-ink-100 rounded-full h-1.5">
                      <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <Button variant="primary" size="sm" className="w-full" href={`/student/courses/${course.id}`}>
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
