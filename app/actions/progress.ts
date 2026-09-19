"use server";

import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { calculateLevel } from "@/lib/activity-logger";

export async function markChapterComplete(chapterId: number, courseId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const userId = parseInt(session.user.id);
  
  try {
    // 1. Check if already completed
    const existingRes = await pool.query(
      `SELECT id FROM user_progress WHERE "userId" = $1 AND "chapterId" = $2`,
      [userId, chapterId]
    );

    if (existingRes.rows.length === 0) {
      // Not completed yet, insert progress
      await pool.query(
        `INSERT INTO user_progress ("userId", "chapterId", "isCompleted", "createdAt", "updatedAt") 
         VALUES ($1, $2, true, NOW(), NOW())`,
        [userId, chapterId]
      );
      
      // Fetch chapter title for activity log
      const chapRes = await pool.query(`SELECT title FROM chapters WHERE id = $1`, [chapterId]);
      const chapterTitle = chapRes.rows[0]?.title || `Lesson ${chapterId}`;
      
      // Record activity
      await pool.query(
        `INSERT INTO activity_log ("userId", type, title, "createdAt") 
         VALUES ($1, 'complete', $2, NOW())`,
        [userId, `Completed lesson: ${chapterTitle}`]
      );
      
      // 2. Grant 10 XP points
      const xpToGrant = 10;
      
      // Update XP
      const xpRes = await pool.query(
        `UPDATE users SET xp_points = COALESCE(xp_points, 0) + $1 WHERE id = $2 RETURNING xp_points, level`,
        [xpToGrant, userId]
      );
      
      const newXp = xpRes.rows[0].xp_points;
      const currentLevel = xpRes.rows[0].level || 1;
      
      // 3. Level Up Logic (Using centralized threshold array)
      const calculatedLevel = calculateLevel(newXp);
      
      let leveledUp = false;
      if (calculatedLevel > currentLevel) {
        await pool.query(`UPDATE users SET level = $1 WHERE id = $2`, [calculatedLevel, userId]);
        leveledUp = true;
      }
      
      // Revalidate course page to refresh progress bars
      revalidatePath(`/student/learn/${courseId}`);
      revalidatePath(`/student/dashboard`);
      
      return {
        success: true,
        xpEarned: xpToGrant,
        newXp,
        leveledUp,
        newLevel: calculatedLevel
      };
    }
    
    return { success: true, xpEarned: 0, message: "Already completed" };
    
  } catch (error) {
    console.error("Failed to mark chapter complete:", error);
    throw new Error("Failed to save progress");
  }
}
