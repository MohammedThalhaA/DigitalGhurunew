import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BadgeDollarSign, Plus, Calendar, Book, User, Sparkles } from "lucide-react";

// Helper to get initials
function getInitials(name: string) {
  if (!name) return "U";
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
}

export default async function AdminEnrollmentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "ADMIN") return null;

  // Fetch all enrollments with user and course info
  const res = await pool.query(
    `SELECT e.id, e."pricePaid", e."createdAt", 
            u.name as user_name, u.email as user_email, u.image as user_image,
            c.title as course_title, COALESCE(c.marketing_data->>'cardImage', c.marketing_data->>'thumbnail') as course_image
     FROM enrollments e
     JOIN users u ON e."userId" = u.id
     JOIN courses c ON e."courseId" = c.id
     ORDER BY e."createdAt" DESC`
  );
  
  const enrollments = res.rows;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Enrollments & Transactions</h1>
          <p className="font-body text-base text-ink-500">View student enrollments and track payments.</p>
        </div>
        <Button variant="primary" href="/admin/enrollments/new" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Manual Enrollment
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-brand-blue" />
            Recent Enrollments ({enrollments.length})
          </h2>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="font-display text-lg font-bold text-ink-900 mb-2">No enrollments found</h3>
            <p className="text-ink-500 mb-6">Create manual enrollments to grant access to courses.</p>
            <Button variant="primary" href="/admin/enrollments/new">Manual Enrollment</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink-50/50 border-b border-ink-100">
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Student</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Course</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Price Paid</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-ink-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-ink-200">
                          {enrollment.user_image ? (
                            <Image src={enrollment.user_image} alt={enrollment.user_name || "User"} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs tracking-wider shadow-inner">
                              {getInitials(enrollment.user_name)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-ink-900">
                            {enrollment.user_name || "Unknown"}
                          </span>
                          <span className="text-sm text-ink-500 mt-0.5">
                            {enrollment.user_email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-xl overflow-hidden flex-shrink-0 border border-ink-200">
                          {enrollment.course_image ? (
                            <Image src={enrollment.course_image} alt={enrollment.course_title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 relative">
                              <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                                  backgroundSize: "6px 6px"
                                }}
                              />
                              <Sparkles className="w-4 h-4 text-brand-orange relative z-10" />
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-ink-800">{enrollment.course_title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-display font-bold text-brand-orange">
                        ₹{Number(enrollment.pricePaid || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm text-ink-600">
                      <div className="flex items-center justify-end gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-ink-400" />
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
