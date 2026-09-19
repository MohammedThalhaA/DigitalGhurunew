import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import ProfileClient from "@/components/student/ProfileClient";
import pool from "@/lib/db";
import { getEnrolledCourses } from "@/lib/student-data";

export default async function StudentProfilePage() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) return null;

    const userId = parseInt(session.user.id);
    // Fetch full user data
    const userRes = await pool.query(`
      SELECT id, name, email, image, bio, 
             notification_course_announcements, 
             notification_community_mentions, 
             notification_marketing_emails, 
             two_factor_enabled,
             upi_id
      FROM users 
      WHERE id = $1
    `, [userId]);
    
    const fullUser = userRes.rows[0] || session.user;
    
    // Fetch enrollments (for billing history)
    const enrollmentsRes = await pool.query(`
      SELECT e.id, e."pricePaid", e."createdAt", c.title
      FROM enrollments e
      JOIN courses c ON e."courseId" = c.id
      WHERE e."userId" = $1
      ORDER BY e."createdAt" DESC
    `, [userId]);
    const enrollments = enrollmentsRes.rows;

    return (
      <RightSidebarWrapper>
        <div className="mb-8">
          <h1 className="heading-md text-ink-900 tracking-tight mb-2">Settings & Profile</h1>
          <p className="body-md">Manage your personal information, preferences, and security.</p>
        </div>

        <ProfileClient user={fullUser} enrollments={enrollments} />
        
      </RightSidebarWrapper>
    );
  } catch (error: any) {
    return (
      <RightSidebarWrapper>
        <div className="p-8 bg-red-50 text-red-600 rounded-2xl border border-red-200 shadow-sm max-w-3xl mt-12 mx-auto">
          <h1 className="font-bold text-xl mb-4">Database Error in Profile Page</h1>
          <p className="font-mono text-sm break-words whitespace-pre-wrap">{error.message || String(error)}</p>
          <p className="mt-4 text-sm font-medium">This usually happens if a column (like upi_id) is missing from the Vercel database but exists locally.</p>
        </div>
      </RightSidebarWrapper>
    );
  }
}
