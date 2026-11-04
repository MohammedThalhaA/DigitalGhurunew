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

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving upload:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
