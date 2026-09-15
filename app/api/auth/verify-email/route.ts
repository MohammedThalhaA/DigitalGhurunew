import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }

    const tokenRes = await pool.query("SELECT * FROM verification_token WHERE token = $1", [token]);
    
    if (tokenRes.rows.length === 0) {
      return NextResponse.json({ message: "Invalid or expired verification token" }, { status: 400 });
    }

    const verificationToken = tokenRes.rows[0];

    if (new Date(verificationToken.expires) < new Date()) {
      await pool.query("DELETE FROM verification_token WHERE token = $1", [token]);
      return NextResponse.json({ message: "Token has expired. Please request a new one." }, { status: 400 });
    }

    // Update user's emailVerified status
    const updateRes = await pool.query(
      `UPDATE users SET "emailVerified" = NOW() WHERE email = $1 RETURNING id`,
      [verificationToken.identifier]
    );

    if (updateRes.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete the used token
    await pool.query("DELETE FROM verification_token WHERE token = $1", [token]);

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
