import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await pool.query("SELECT key, value FROM platform_settings");
    
    // Convert array of {key, value} to an object
    const settings = res.rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    // Use a transaction to ensure all updates succeed or fail together
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      for (const [key, value] of Object.entries(updates)) {
        await client.query(
          `INSERT INTO platform_settings (key, value, updated_at) 
           VALUES ($1, $2, CURRENT_TIMESTAMP) 
           ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
          [key, value === null ? "" : String(value)]
        );
      }

      await client.query("COMMIT");
      return NextResponse.json({ success: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
