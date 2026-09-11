"use server";

import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Updates the user's progress for a specific chapter/lesson.
 */
export async function updateProgress(chapterId: number, isCompleted: boolean = true) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = parseInt(session.user.id);

  try {
    // Upsert user progress
    await pool.query(`
      INSERT INTO user_progress ("userId", "chapterId", "isCompleted")
      VALUES ($1, $2, $3)
      ON CONFLICT ("userId", "chapterId") 
      DO UPDATE SET "isCompleted" = EXCLUDED."isCompleted", "updatedAt" = NOW()
    `, [userId, chapterId, isCompleted]);

    revalidatePath("/student/dashboard");
    revalidatePath(`/student/learn/[courseId]`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update progress:", error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Posts a new discussion comment in a course.
 */
export async function postDiscussion(courseId: number, content: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = parseInt(session.user.id);

  try {
    await pool.query(`
      INSERT INTO discussions ("userId", "courseId", content)
      VALUES ($1, $2, $3)
    `, [userId, courseId, content]);

    revalidatePath(`/student/learn/${courseId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to post discussion:", error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Submits a new support ticket.
 */
export async function createSupportTicket(subject: string, message: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = parseInt(session.user.id);

  try {
    await pool.query(`
      INSERT INTO support_tickets ("userId", subject, message)
      VALUES ($1, $2, $3)
    `, [userId, subject, message]);

    revalidatePath("/student/support");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to create support ticket:", error);
    return { success: false, error: "Database error" };
  }
}
