"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// Application Submission
export async function submitApplication(data: {
  name: string;
  email: string;
  phone: string;
  category: string;
  bio: string;
}) {
  try {
    await pool.query(
      `INSERT INTO job_applications ("careerSlug", name, email, phone, bio, status, "createdAt")
       VALUES ($1, $2, $3, $4, $5, 'PENDING', NOW())`,
      [data.category, data.name, data.email, data.phone, data.bio]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}

// Update Application Status
export async function updateApplicationStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'REJECTED' | 'ACCEPTED') {
  try {
    await pool.query(
      `UPDATE job_applications SET status = $1 WHERE id = $2`,
      [status, id]
    );
    revalidatePath("/admin/applications");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating application status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

// Career Creation/Updating
export async function upsertCareer(data: {
  slug: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
}) {
  try {
    await pool.query(
      `INSERT INTO careers (slug, title, department, experience, location, type, description, responsibilities, requirements, "isActive", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
       ON CONFLICT (slug) DO UPDATE SET 
         title = EXCLUDED.title,
         department = EXCLUDED.department,
         experience = EXCLUDED.experience,
         location = EXCLUDED.location,
         type = EXCLUDED.type,
         description = EXCLUDED.description,
         responsibilities = EXCLUDED.responsibilities,
         requirements = EXCLUDED.requirements,
         "isActive" = EXCLUDED."isActive",
         "updatedAt" = NOW()`,
      [
        data.slug, 
        data.title, 
        data.department, 
        data.experience, 
        data.location, 
        data.type, 
        data.description, 
        JSON.stringify(data.responsibilities), 
        JSON.stringify(data.requirements), 
        data.isActive
      ]
    );
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: any) {
    console.error("Error upserting career:", error);
    return { success: false, error: "Failed to save career." };
  }
}

export async function deleteCareer(slug: string) {
  try {
    await pool.query(`DELETE FROM careers WHERE slug = $1`, [slug]);
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting career:", error);
    return { success: false, error: "Failed to delete career." };
  }
}
