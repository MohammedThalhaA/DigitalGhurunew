"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createEnrollment(data: FormData) {
  try {
    const userId = parseInt(data.get("userId") as string);
    const courseId = parseInt(data.get("courseId") as string);
    const pricePaid = parseFloat(data.get("pricePaid") as string);

    if (isNaN(userId) || isNaN(courseId)) {
      return { success: false, error: "Invalid user or course selection." };
    }

    // Check if enrollment already exists
    const existing = await pool.query(
      `SELECT id FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
      [userId, courseId]
    );

    if (existing.rows.length > 0) {
      return { success: false, error: "User is already enrolled in this course." };
    }

    await pool.query(
      `INSERT INTO enrollments ("userId", "courseId", "pricePaid") VALUES ($1, $2, $3)`,
      [userId, courseId, isNaN(pricePaid) ? 0 : pricePaid]
    );

    revalidatePath("/admin/enrollments");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return { success: false, error: "Failed to create enrollment." };
  }
}
