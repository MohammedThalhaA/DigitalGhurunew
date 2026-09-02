import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || ((session.user as any).role !== "INSTRUCTOR" && (session.user as any).role !== "ADMIN")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, moduleId, courseId, videoUrl } = await req.json();

    if (!title || !moduleId) {
      return new NextResponse("Title and moduleId are required", { status: 400 });
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
      `SELECT position FROM chapters WHERE "moduleId" = $1 ORDER BY position DESC LIMIT 1`,
      [moduleId]
    );
    const newPosition = positionRes.rows.length > 0 ? positionRes.rows[0].position + 1 : 1;

    const result = await pool.query(
      `INSERT INTO chapters (title, "moduleId", position, "videoUrl") VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, moduleId, newPosition, videoUrl || null]
    );

    return NextResponse.json({ chapter: result.rows[0] });
  } catch (error) {
    console.error("[CHAPTERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
