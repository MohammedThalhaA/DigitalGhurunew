import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const segments = params.path || [];
    if (!segments.length) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Prevent directory traversal
    for (const segment of segments) {
      if (segment.includes("..") || segment.includes("/") || segment.includes("\\")) {
        return new NextResponse("Invalid file path", { status: 400 });
      }
    }

    const possiblePaths = [
      path.join(process.cwd(), "public", "uploads", ...segments),
      path.join(process.cwd(), "uploads", ...segments),
      path.join(process.cwd(), ".next", "standalone", "public", "uploads", ...segments),
    ];

    let foundPath: string | null = null;
    for (const p of possiblePaths) {
      try {
        await fs.access(p);
        foundPath = p;
        break;
      } catch {
        // try next
      }
    }

    if (!foundPath) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(foundPath);
    const filename = segments[segments.length - 1];
    const ext = path.extname(filename).toLowerCase();

    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".pdf") contentType = "application/pdf";

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
    console.error("Error serving upload:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

