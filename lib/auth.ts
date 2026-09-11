import { NextAuthOptions, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
  }
}
import PostgresAdapter from "@auth/pg-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PostgresAdapter(pool) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Offline/Demo fallback to allow UI work even if Neon DB is unreachable
        if (credentials.email === "student@demo.com" && credentials.password === "password123") {
          return {
            id: "1",
            name: "Demo Student",
            email: "student@demo.com",
            role: "STUDENT",
          };
        }
        
        if (credentials.email === "admin@demo.com" && credentials.password === "password123") {
          return {
            id: "2",
            name: "Demo Admin",
            email: "admin@demo.com",
            role: "ADMIN",
          };
        }

        try {
          const res = await pool.query("SELECT * FROM users WHERE email = $1", [credentials.email]);
          const user = res.rows[0];

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          // Update last_login to track real user activity
          await pool.query("UPDATE users SET last_login = NOW() WHERE id = $1", [user.id]);

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Database error during authorization:", error);
          throw new Error("Invalid credentials or Database Unreachable");
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
