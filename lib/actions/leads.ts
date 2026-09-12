"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitLead(data: {
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
}) {
  try {
    await pool.query(
      `INSERT INTO course_leads (name, email, phone, "courseTitle", "createdAt")
       VALUES ($1, $2, $3, $4, NOW())`,
      [data.name, data.email, data.phone, data.courseTitle]
    );
    
    // Revalidate the admin leads page so the new lead shows up
    revalidatePath("/admin/leads");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error submitting lead:", error);
    return { success: false, error: "Failed to submit details. Please try again." };
  }
}
