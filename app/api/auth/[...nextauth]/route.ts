import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest, ctx: any) => {
  const host = req.headers.get("host");
  if (host) {
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    process.env.NEXTAUTH_URL = `${protocol}://${host}`;
  }
  return NextAuth(authOptions)(req, ctx);
};

export { handler as GET, handler as POST };
