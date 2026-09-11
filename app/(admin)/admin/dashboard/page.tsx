import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Users, BookOpen, Video, Plus, IndianRupee, Calendar, Activity } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  // Fetch basic stats (mocked some for now as admin can see across the platform)
  const coursesRes = await pool.query(`SELECT COUNT(*) FROM courses`);
  const totalCourses = parseInt(coursesRes.rows[0].count);
  
  const usersRes = await pool.query(`SELECT COUNT(*) FROM users WHERE role = 'STUDENT'`);
  const totalStudents = parseInt(usersRes.rows[0].count);

  const revenueRes = await pool.query(`SELECT SUM("pricePaid") as total FROM enrollments`);
  const totalRevenue = parseFloat(revenueRes.rows[0].total || 0);

  const recentUsersRes = await pool.query(`SELECT id, name, email, "createdAt" FROM users ORDER BY "createdAt" DESC LIMIT 5`);
  const recentUsers = recentUsersRes.rows;

  const recentEnrollmentsRes = await pool.query(`
    SELECT e.id, e."pricePaid", e."createdAt", u.name as user_name, c.title as course_title
    FROM enrollments e
    JOIN users u ON e."userId" = u.id
    JOIN courses c ON e."courseId" = c.id
    ORDER BY e."createdAt" DESC LIMIT 5
  `);
  const recentEnrollments = recentEnrollmentsRes.rows;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Admin Dashboard</h1>
          <p className="font-body text-base text-ink-500">Manage courses, modules, and platform statistics.</p>
        </div>
        <Button variant="primary" href="/admin/courses/new" className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-2" />
          Upload Video Module
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-brand-blue transition-colors duration-200">Total Students</p>
              <p className="font-display text-2xl font-bold text-ink-900">{totalStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-amber-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-amber-600 transition-colors duration-200">Total Courses</p>
              <p className="font-display text-2xl font-bold text-ink-900">{totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-green-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <IndianRupee className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-green-600 transition-colors duration-200">Total Revenue</p>
              <p className="font-display text-2xl font-bold text-ink-900">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
          <div className="p-6 border-b border-ink-100 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-blue" />
              Recent Enrollments
            </h2>
            <Button variant="outline" size="sm" href="/admin/enrollments">View All</Button>
          </div>
          {recentEnrollments.length === 0 ? (
            <div className="p-8 text-center text-ink-500 text-sm">No recent enrollments</div>
          ) : (
            <div className="divide-y divide-ink-100">
              {recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="p-4 flex items-center justify-between hover:bg-ink-50/50 transition-colors">
                  <div>
                    <p className="font-bold text-ink-900 text-sm">{enrollment.user_name}</p>
                    <p className="text-xs text-ink-500 line-clamp-1">{enrollment.course_title}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">₹{Number(enrollment.pricePaid || 0).toLocaleString()}</p>
                    <p className="text-xs text-ink-400 flex items-center justify-end gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Signups */}
        <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
          <div className="p-6 border-b border-ink-100 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-blue" />
              Recent Signups
            </h2>
            <Button variant="outline" size="sm" href="/admin/users">View All</Button>
          </div>
          {recentUsers.length === 0 ? (
            <div className="p-8 text-center text-ink-500 text-sm">No recent users</div>
          ) : (
            <div className="divide-y divide-ink-100">
              {recentUsers.map((user) => (
                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-ink-50/50 transition-colors">
                  <div>
                    <p className="font-bold text-ink-900 text-sm">{user.name || "Unknown"}</p>
                    <p className="text-xs text-ink-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-400 flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.createdAt || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-ink-100 shadow-card">
        <h2 className="font-display text-lg font-bold text-ink-900 mb-2">Quick Actions</h2>
        <p className="font-body text-ink-500 text-sm mb-6">Manage your curriculum and track student progress.</p>
        
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="/admin/courses/new">
            Upload Video Module
          </Button>
          <Button variant="outline" href="/admin/courses">
            Manage Courses
          </Button>
        </div>
      </div>
    </div>
  );
}
