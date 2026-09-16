import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ enrolled: false });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const res = await pool.query(
      `SELECT id FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
      [parseInt(session.user.id), parseInt(courseId)]
    );

    const pendingRes = await pool.query(
      `SELECT id FROM payment_requests WHERE "userId" = $1 AND "courseId" = $2 AND status = 'PENDING'`,
      [parseInt(session.user.id), parseInt(courseId)]
    );

    return NextResponse.json({ 
      enrolled: res.rows.length > 0,
      hasPendingRequest: pendingRes.rows.length > 0
    });
  } catch (error: any) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json({ enrolled: false, hasPendingRequest: false });
  }
}
