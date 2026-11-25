import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_CLIENT_ID ||
    "520891313576-k0o8k52lliongf8efq6ba30554g1reif.apps.googleusercontent.com";

  return NextResponse.json({ clientId });
}
