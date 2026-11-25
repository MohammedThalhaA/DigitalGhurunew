import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest, ctx: any) => {
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost || req.headers.get("host") || "";
  const protocol = req.headers.get("x-forwarded-proto") || (process.env.NODE_ENV === "development" ? "http" : "https");

  if (host.includes("digitalghuru.in")) {
    process.env.NEXTAUTH_URL = `${protocol}://digitalghuru.in`;
  } else if (host.includes("digitalghuru.com")) {
    process.env.NEXTAUTH_URL = `${protocol}://digitalghuru.com`;
  } else if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = `${protocol}://${host || "digitalghuru.com"}`;
  }

  return NextAuth(authOptions)(req, ctx);
};

export { handler as GET, handler as POST };
