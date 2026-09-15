import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    const existingUserRes = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (existingUserRes.rows.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, 'STUDENT') RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    // Generate Verification Token
    const token = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await pool.query(
      `INSERT INTO verification_token (identifier, token, expires) VALUES ($1, $2, $3)`,
      [email, token, expires]
    );

    // Send email asynchronously
    sendVerificationEmail(email, token).catch(console.error);

    return NextResponse.json({ message: "User created, verification email sent", user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
