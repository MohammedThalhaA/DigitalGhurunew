"use server";

import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Enrolls a user in a course.
 * If the course is paid, this is called after successful payment (Razorpay).
 * For free courses or testing, it enrolls immediately.
 */
export async function enrollInCourse(courseId: number, pricePaid: number = 0) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = parseInt(session.user.id);

  try {
    // Check if course exists
    const courseRes = await pool.query("SELECT * FROM courses WHERE id = $1", [courseId]);
    if (courseRes.rows.length === 0) {
      return { success: false, error: "Course not found" };
    }

    // Insert into enrollments
    await pool.query(`
      INSERT INTO enrollments ("userId", "courseId", "pricePaid")
      VALUES ($1, $2, $3)
      ON CONFLICT ("userId", "courseId") DO NOTHING
    `, [userId, courseId, pricePaid]);

    revalidatePath("/student/dashboard");
    revalidatePath(`/student/courses/${courseId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to enroll in course:", error);
    return { success: false, error: "Database error" };
  }
}
