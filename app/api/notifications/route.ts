import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ notifications: [] });
    }

    const userId = parseInt(session.user.id);
    
    // Fetch top 20 recent notifications
    const res = await pool.query(
      `SELECT id, type, title, message, "relatedUrl", "isRead", "createdAt" 
       FROM notifications 
       WHERE "userId" = $1 
       ORDER BY "createdAt" DESC 
       LIMIT 20`,
      [userId]
    );

    const unreadCountRes = await pool.query(
      `SELECT COUNT(*) FROM notifications WHERE "userId" = $1 AND "isRead" = false`,
      [userId]
    );

    return NextResponse.json({ 
      notifications: res.rows,
      unreadCount: parseInt(unreadCountRes.rows[0].count)
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ notifications: [], unreadCount: 0 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();
    const { notificationId } = body;

    if (notificationId) {
      // Mark specific notification as read
      await pool.query(
        `UPDATE notifications SET "isRead" = true WHERE id = $1 AND "userId" = $2`,
        [notificationId, userId]
      );
    } else {
      // Mark all as read
      await pool.query(
        `UPDATE notifications SET "isRead" = true WHERE "userId" = $1 AND "isRead" = false`,
        [userId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating notifications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
