import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, utrNumber } = await req.json();

    if (!courseId || !utrNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = parseInt(session.user.id);

    // Fetch the course price
    const courseRes = await pool.query(`SELECT id, price FROM courses WHERE id = $1`, [parseInt(courseId)]);
    if (courseRes.rows.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const pricePaid = courseRes.rows[0].price;

    // Check if there's already a pending request
    const existingRes = await pool.query(
      `SELECT id FROM payment_requests WHERE "userId" = $1 AND "courseId" = $2 AND status = 'PENDING'`,
      [userId, parseInt(courseId)]
    );

    if (existingRes.rows.length > 0) {
      return NextResponse.json({ error: "You already have a pending payment review for this course." }, { status: 400 });
    }

    // Check if already enrolled
    const enrolledRes = await pool.query(
      `SELECT id FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
      [userId, parseInt(courseId)]
    );

    if (enrolledRes.rows.length > 0) {
      return NextResponse.json({ error: "You are already enrolled in this course." }, { status: 400 });
    }

    // Create payment request
    await pool.query(
      `INSERT INTO payment_requests ("userId", "courseId", amount, utr_number, status) 
       VALUES ($1, $2, $3, $4, 'PENDING')`,
      [userId, parseInt(courseId), pricePaid, utrNumber]
    );

    return NextResponse.json({ success: true, message: "Payment request submitted successfully." });
  } catch (error: any) {
    console.error("Error submitting manual payment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
