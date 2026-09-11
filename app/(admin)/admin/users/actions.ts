"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { hash } from "bcrypt";

export async function toggleBlockUser(userId: number, currentStatus: boolean) {
  try {
    await pool.query('UPDATE users SET "isBlocked" = $1 WHERE id = $2', [!currentStatus, userId]);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error toggling block user:", error);
    return { success: false, error: "Failed to toggle user block status." };
  }
}

export async function deleteUser(userId: number) {
  try {
    // Delete cascading is handled by DB foreign keys for accounts, sessions, etc.
    // However, make sure any other relations not cascaded are handled.
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user." };
  }
}

export async function createUser(data: FormData) {
  try {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as string;

    if (!name || !email || !password || !role) {
      return { success: false, error: "All fields are required." };
    }

    // Check if email exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return { success: false, error: "A user with this email already exists." };
    }

    const hashedPassword = await hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, role]
    );

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user." };
  }
}
