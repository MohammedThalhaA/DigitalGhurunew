import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, UserPlus, Book } from "lucide-react";
import ManualEnrollmentForm from "./ManualEnrollmentForm";

export default async function NewEnrollmentPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "ADMIN") return null;

  // Fetch all users to select from
  const usersRes = await pool.query(`SELECT id, name, email FROM users ORDER BY name ASC`);
  const users = usersRes.rows;

  // Fetch all courses to select from
  const coursesRes = await pool.query(`SELECT id, title, price FROM courses ORDER BY title ASC`);
  const courses = coursesRes.rows;

  return (
    <div className="w-full space-y-6 pb-24">
      <Link 
        href="/admin/enrollments" 
        className="inline-flex items-center text-sm font-medium text-ink-500 hover:text-brand-blue transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Enrollments
      </Link>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 bg-ink-50/30">
          <h1 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-2">
            <Book className="h-6 w-6 text-brand-blue" />
            Manual Enrollment
          </h1>
          <p className="font-body text-ink-500 mt-1">Grant a student access to a specific course.</p>
        </div>

        <div className="p-8">
          <ManualEnrollmentForm users={users} courses={courses} />
        </div>
      </div>
    </div>
  );
}
