import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export const dynamic = 'force-dynamic';

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

    const userRes = await pool.query(`SELECT upi_id FROM users WHERE id = $1`, [parseInt(session.user.id)]);
    const upiId = userRes.rows[0]?.upi_id;

    return NextResponse.json({ 
      enrolled: res.rows.length > 0,
      hasPendingRequest: pendingRes.rows.length > 0,
      upiId: upiId
    });
  } catch (error: any) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json({ enrolled: false, hasPendingRequest: false });
  }
}
