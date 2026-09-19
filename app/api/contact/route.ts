import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Send email using Nodemailer
    await sendContactEmail(name, email, phone, subject, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
