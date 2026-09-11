import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUnreadNotificationCount } from "@/lib/student-data";
import pool from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ streak: 0, unreadNotifications: 0 });
    }

    const userId = parseInt(session.user.id);

    // Fetch streak and notification count in parallel
    const [userRes, unreadCount] = await Promise.all([
      pool.query(`SELECT streak_count FROM users WHERE id = $1`, [userId]),
      getUnreadNotificationCount(userId),
    ]);

    const streak = userRes.rows[0]?.streak_count || 0;

    return NextResponse.json({
      streak,
      unreadNotifications: unreadCount,
    });
  } catch (error) {
    return NextResponse.json({ streak: 0, unreadNotifications: 0 });
  }
}
