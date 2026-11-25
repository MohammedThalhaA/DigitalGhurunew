import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Ensure NEXTAUTH_URL is consistently set to the canonical production domain
if (process.env.NODE_ENV === "production" || !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "https://digitalghuru.com";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
