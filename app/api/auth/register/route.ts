import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

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

    return NextResponse.json({ message: "User created", user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
