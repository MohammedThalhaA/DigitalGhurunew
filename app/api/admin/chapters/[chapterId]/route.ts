import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoUrl } = await request.json();
    const chapterId = parseInt(params.chapterId);

    if (isNaN(chapterId)) {
      return NextResponse.json({ error: "Invalid chapter ID" }, { status: 400 });
    }

    // Update the videoUrl for the chapter
    await pool.query(
      `UPDATE chapters SET "videoUrl" = $1, "updatedAt" = NOW() WHERE id = $2`,
      [videoUrl, chapterId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating chapter video:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}
