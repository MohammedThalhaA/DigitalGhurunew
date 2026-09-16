import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { status } = await req.json(); // APPROVED or REJECTED
    const paymentId = parseInt(params.id);

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const adminId = parseInt(session.user.id);

    // 1. Get the payment request
    const reqRes = await pool.query(
      `SELECT * FROM payment_requests WHERE id = $1 AND status = 'PENDING'`,
      [paymentId]
    );

    if (reqRes.rows.length === 0) {
      return NextResponse.json({ error: "Payment request not found or already processed." }, { status: 404 });
    }

    const paymentRequest = reqRes.rows[0];

    // 2. Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update status
      await client.query(
        `UPDATE payment_requests 
         SET status = $1, "reviewedAt" = NOW(), "reviewedBy" = $2 
         WHERE id = $3`,
        [status, adminId, paymentId]
      );

      // If approved, create enrollment
      if (status === "APPROVED") {
        await client.query(
          `INSERT INTO enrollments ("userId", "courseId", "pricePaid") 
           VALUES ($1, $2, $3) 
           ON CONFLICT DO NOTHING`,
          [paymentRequest.userId, paymentRequest.courseId, paymentRequest.amount]
        );
      }

      await client.query('COMMIT');
      return NextResponse.json({ success: true });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error("Error processing payment request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
