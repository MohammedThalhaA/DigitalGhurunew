import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await pool.query("SELECT name, image FROM users WHERE email = $1", [session.user.email]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Update the admin user in the database using email (unique & reliable)
    await pool.query(
      `UPDATE users SET name = $1, image = $2 WHERE email = $3`,
      [name, image, session.user.email]
    );

    return NextResponse.json({ success: true, name, image });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
