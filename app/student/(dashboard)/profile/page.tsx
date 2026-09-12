import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import ProfileClient from "@/components/student/ProfileClient";
import pool from "@/lib/db";
import { getEnrolledCourses } from "@/lib/student-data";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return null;

  const userId = parseInt(session.user.id);
  
  // Fetch full user data
  const userRes = await pool.query(`
    SELECT id, name, email, image, bio, 
           notification_course_announcements, 
           notification_community_mentions, 
           notification_marketing_emails, 
           two_factor_enabled
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
}
