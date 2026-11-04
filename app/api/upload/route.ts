import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

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
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    // Also save to root uploads directory as fallback
    try {
      const rootUploadDir = path.join(process.cwd(), "uploads");
      await mkdir(rootUploadDir, { recursive: true });
      await writeFile(path.join(rootUploadDir, filename), buffer);
    } catch {
      // ignore fallback error
    }

    // Also save to standalone public/uploads if running standalone
    try {
      const standaloneUploadDir = path.join(process.cwd(), ".next/standalone/public/uploads");
      await mkdir(standaloneUploadDir, { recursive: true });
      await writeFile(path.join(standaloneUploadDir, filename), buffer);
    } catch {
      // ignore standalone error
    }
    
    // Return the public URL
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
