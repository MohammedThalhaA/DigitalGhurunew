import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const filename = params.filename;
    
    // Prevent directory traversal attacks
    if (filename.includes("..") || filename.includes("/")) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    
    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";

    let returnBuffer = fileBuffer;
    if (fileBuffer.length > 95 * 1024 && [".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      try {
        const sharp = (await import("sharp")).default;
        let pipeline = sharp(fileBuffer);
        const meta = await pipeline.metadata();
        if (meta.width && meta.width > 1200) {
          pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
        }
        if (ext === ".webp") {
          returnBuffer = await pipeline.webp({ quality: 75 }).toBuffer();
        } else if (ext === ".jpg" || ext === ".jpeg") {
          returnBuffer = await pipeline.jpeg({ quality: 75, mozjpeg: true }).toBuffer();
        } else if (ext === ".png") {
          returnBuffer = await pipeline.png({ quality: 75 }).toBuffer();
        }
      } catch (sharpErr) {
        console.error("Dynamic image compression error:", sharpErr);
      }
    }

    return new NextResponse(returnBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
