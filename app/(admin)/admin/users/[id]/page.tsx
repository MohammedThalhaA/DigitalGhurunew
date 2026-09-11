import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, User, Mail, Calendar, ShieldCheck, ShieldAlert, Activity, Book, Flame, MailCheck, MailWarning } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AdminUserDetailsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "ADMIN") return null;

  const userId = parseInt(params.id);
  if (isNaN(userId)) return notFound();

  // Fetch user details
  const userRes = await pool.query(
    `SELECT id, name, email, role, "isBlocked", "emailVerified", "createdAt", streak_count, last_login 
     FROM users WHERE id = $1`,
    [userId]
  );

  if (userRes.rows.length === 0) return notFound();
  
  const user = userRes.rows[0];

  // Fetch user enrollments
  const enrollmentsRes = await pool.query(
    `SELECT e.id, e."pricePaid", e."createdAt", c.title as course_title, c.id as course_id
     FROM enrollments e
     JOIN courses c ON e."courseId" = c.id
     WHERE e."userId" = $1
     ORDER BY e."createdAt" DESC`,
    [userId]
  );
  
  const enrollments = enrollmentsRes.rows;

  return (
    <div className="w-full space-y-6 pb-24">
      <Link 
        href="/admin/users" 
        className="inline-flex items-center text-sm font-medium text-ink-500 hover:text-brand-blue transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Users
      </Link>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-8 border-b border-ink-100 flex items-start justify-between bg-ink-50/30">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center text-white font-display text-4xl shadow-md border-4 border-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-ink-900 flex items-center gap-3">
                {user.name || "Unknown User"}
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-widest uppercase ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                  user.role === 'INSTRUCTOR' ? 'bg-brand-blue/10 text-brand-blue' :
                  'bg-ink-200 text-ink-700'
                }`}>
                  {user.role || 'STUDENT'}
                </span>
              </h1>
              <p className="text-ink-500 flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             {user.isBlocked ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                  <ShieldAlert className="h-4 w-4" /> Account Blocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                  <ShieldCheck className="h-4 w-4" /> Account Active
                </span>
              )}
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Details */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink-900 border-b border-ink-100 pb-2">Account Details</h2>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-xs font-heading font-semibold text-ink-400 uppercase tracking-widest mb-1">Joined Date</p>
                <p className="font-medium text-ink-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-blue" />
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-ink-400 uppercase tracking-widest mb-1">Last Login</p>
                <p className="font-medium text-ink-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-brand-orange" />
                  {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}
                </p>
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-ink-400 uppercase tracking-widest mb-1">Learning Streak</p>
                <p className="font-display font-bold text-ink-900 text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-brand-orange" />
                  {user.streak_count || 0} days
                </p>
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-ink-400 uppercase tracking-widest mb-1">Email Status</p>
                <p className="font-medium text-ink-900 flex items-center gap-2">
                  {user.emailVerified ? <MailCheck className="h-4 w-4 text-green-600" /> : <MailWarning className="h-4 w-4 text-amber-500" />}
                  {user.emailVerified ? "Verified" : "Unverified"}
                </p>
              </div>
            </div>
          </div>

          {/* Enrollments */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-ink-900 border-b border-ink-100 pb-2 flex items-center justify-between">
              Course Enrollments
              <span className="bg-ink-100 text-ink-700 text-xs px-2 py-1 rounded-full">{enrollments.length}</span>
            </h2>
            
            {enrollments.length === 0 ? (
              <p className="text-sm text-ink-500 italic bg-ink-50 p-4 rounded-xl text-center">
                This user is not enrolled in any courses yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {enrollments.map(enrollment => (
                  <li key={enrollment.id} className="p-4 rounded-xl border border-ink-200 hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-ink-900 flex items-center gap-2">
                          <Book className="h-4 w-4 text-brand-blue" />
                          {enrollment.course_title}
                        </p>
                        <p className="text-xs text-ink-500 mt-1">
                          Enrolled on {new Date(enrollment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="font-bold text-green-600 text-sm bg-green-50 px-2 py-1 rounded-md">
                        ₹{Number(enrollment.pricePaid || 0).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
