import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, mode, course } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    let courseTitle = 'AI-Powered Digital Marketing Course';
    if (course === 'react-js-full-stack-development') {
        courseTitle = 'React JS Full Stack Development Course';
    }

    // Insert into course_leads table
    const res = await pool.query(
      `INSERT INTO course_leads (name, email, phone, "courseTitle") 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, courseTitle]
    );

    return NextResponse.json({ success: true, lead: res.rows[0] });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit form.' },
      { status: 500 }
    );
  }
}
