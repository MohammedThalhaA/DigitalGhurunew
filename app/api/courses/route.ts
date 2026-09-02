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

    const { title } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO courses (title, "instructorId") VALUES ($1, $2) RETURNING id`,
      [title, parseInt(session.user.id)]
    );

    return NextResponse.json({ course: result.rows[0] });
  } catch (error) {
    console.error("[COURSES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
