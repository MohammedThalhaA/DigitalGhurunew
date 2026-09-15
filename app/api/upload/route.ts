import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to avoid overwrites
    const extension = file.name.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;
    
    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    
    // Return the public URL
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
