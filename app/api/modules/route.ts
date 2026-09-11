import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, courseId } = await req.json();

    if (!title || !courseId) {
      return new NextResponse("Title and courseId are required", { status: 400 });
    }

    // Verify course ownership
    const courseOwnerRes = await pool.query(
      `SELECT id FROM courses WHERE id = $1 AND "instructorId" = $2`,
      [courseId, parseInt(session.user.id)]
    );

    if (courseOwnerRes.rows.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get highest position
    const positionRes = await pool.query(
      `SELECT position FROM modules WHERE "courseId" = $1 ORDER BY position DESC LIMIT 1`,
      [courseId]
    );
    const newPosition = positionRes.rows.length > 0 ? positionRes.rows[0].position + 1 : 1;

    const result = await pool.query(
      `INSERT INTO modules (title, "courseId", position) VALUES ($1, $2, $3) RETURNING id`,
      [title, courseId, newPosition]
    );

    return NextResponse.json({ module: result.rows[0] });
  } catch (error) {
    console.error("[MODULES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
