"use server";

import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return parseInt(session.user.id);
}

export async function updateGeneralProfile(name: string, bio: string, image: string | null) {
  const userId = await getUserId();
  await pool.query(
    `UPDATE users SET name = $1, bio = $2, image = $3 WHERE id = $4`,
    [name, bio, image, userId]
  );
  revalidatePath('/student/profile');
  return { success: true };
}

export async function updatePassword(currentPass: string, newPass: string) {
  const userId = await getUserId();
  
  const res = await pool.query(`SELECT password FROM users WHERE id = $1`, [userId]);
  if (res.rows.length === 0) throw new Error("User not found");
  
  const user = res.rows[0];
  const isCorrect = await bcrypt.compare(currentPass, user.password);
  
  if (!isCorrect) {
    return { success: false, error: "Incorrect current password" };
  }
  
  const hashedNew = await bcrypt.hash(newPass, 10);
  await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedNew, userId]);
  
  return { success: true };
}

export async function updateNotificationPreferences(courseAnnouncements: boolean, communityMentions: boolean, marketingEmails: boolean) {
  const userId = await getUserId();
  await pool.query(
    `UPDATE users SET 
      notification_course_announcements = $1, 
      notification_community_mentions = $2, 
      notification_marketing_emails = $3 
    WHERE id = $4`,
    [courseAnnouncements, communityMentions, marketingEmails, userId]
  );
  revalidatePath('/student/profile');
  return { success: true };
}

export async function toggleTwoFactor(enable: boolean) {
  const userId = await getUserId();
  await pool.query(`UPDATE users SET two_factor_enabled = $1 WHERE id = $2`, [enable, userId]);
  revalidatePath('/student/profile');
  return { success: true, enabled: enable };
}

export async function uploadLocalImage(formData: FormData) {
  const userId = await getUserId();
  const file = formData.get("file") as File;
  
  if (!file) throw new Error("No file uploaded");
  
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
  
  // Create a unique filename
  const filename = `avatar_${userId}_${Date.now()}${path.extname(file.name)}`;
  const filePath = path.join(uploadsDir, filename);
  
  await fs.writeFile(filePath, buffer);
  
  const url = `/uploads/${filename}`;
  return { success: true, url };
}

export async function saveUpiId(upiId: string) {
  const userId = await getUserId();
  await pool.query(`UPDATE users SET upi_id = $1 WHERE id = $2`, [upiId, userId]);
  revalidatePath('/student/profile');
  return { success: true };
}

export async function removeUpiId() {
  const userId = await getUserId();
  await pool.query(`UPDATE users SET upi_id = NULL WHERE id = $1`, [userId]);
  revalidatePath('/student/profile');
  return { success: true };
}
