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

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";

const ADMIN_EMAIL = "contact@digitalghuru.in";

export const authOptions: NextAuthOptions = {
  adapter: {
    async createUser(user: any) {
      const cleanEmail = user.email ? user.email.toLowerCase().trim() : user.email;
      if (cleanEmail === ADMIN_EMAIL) {
        throw new Error("Admin account cannot be created via OAuth.");
      }
      const { rows } = await pool.query(
        'INSERT INTO users (name, email, "emailVerified", image, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user.name || "Student", cleanEmail, user.emailVerified || new Date(), user.image, 'STUDENT']
      );
      return { ...rows[0], id: rows[0].id.toString() };
    },
    async getUser(id: string) {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (!rows[0]) return null;
      return { ...rows[0], id: rows[0].id.toString() };
    },
    async getUserByEmail(email: string) {
      if (!email) return null;
      const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email.trim()]);
      if (!rows[0]) return null;
      return { ...rows[0], id: rows[0].id.toString() };
    },
    async getUserByAccount({ providerAccountId, provider }: any) {
      const { rows } = await pool.query(
        `SELECT u.* FROM users u JOIN accounts a ON u.id = a."userId" 
         WHERE a.provider = $1 AND a."providerAccountId" = $2`,
        [provider, providerAccountId]
      );
      if (!rows[0]) return null;
      if (rows[0].role === "ADMIN" || rows[0].email?.toLowerCase().trim() === ADMIN_EMAIL) {
        return null;
      }
      return { ...rows[0], id: rows[0].id.toString() };
    },
    async linkAccount(account: any) {
      const userCheck = await pool.query('SELECT role, email FROM users WHERE id = $1', [Number(account.userId)]);
      const targetUser = userCheck.rows[0];
      if (targetUser && (targetUser.role === "ADMIN" || targetUser.email?.toLowerCase().trim() === ADMIN_EMAIL)) {
        throw new Error("Admin accounts cannot be linked to OAuth providers.");
      }
      await pool.query(
        `INSERT INTO accounts (
          "userId", type, provider, "providerAccountId", access_token, token_type, id_token, refresh_token, scope, expires_at, session_state
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (provider, "providerAccountId") DO UPDATE SET
          access_token = EXCLUDED.access_token,
          token_type = EXCLUDED.token_type,
          id_token = EXCLUDED.id_token,
          refresh_token = COALESCE(EXCLUDED.refresh_token, accounts.refresh_token),
          scope = EXCLUDED.scope,
          expires_at = EXCLUDED.expires_at,
          session_state = EXCLUDED.session_state`,
        [
          Number(account.userId),
          account.type,
          account.provider,
          account.providerAccountId,
          account.access_token,
          account.token_type,
          account.id_token,
          account.refresh_token,
          account.scope,
          account.expires_at,
          account.session_state
        ]
      );
      return account;
    },
    async updateUser(user: any) {
      const updates = [];
      const values = [];
      let i = 1;
      for (const [key, value] of Object.entries(user)) {
        if (key === 'id') continue;
        updates.push(`"${key}" = $${i}`);
        values.push(value);
        i++;
      }
      if (updates.length === 0) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [user.id]);
        return rows[0] ? { ...rows[0], id: rows[0].id.toString() } : null;
      }
      values.push(user.id);
      const { rows } = await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${i} RETURNING *`,
        values
      );
      return { ...rows[0], id: rows[0].id.toString() };
    }
  } as Adapter,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        allowDangerousEmailAccountLinking: true,
        authorization: {
          params: {
            prompt: "select_account",
            access_type: "offline",
            response_type: "code",
          },
        },
      })
    ] : []),
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

        try {
          const res = await pool.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [credentials.email.trim()]);
          const user = res.rows[0];

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          if (user.role === "ADMIN" && user.email?.toLowerCase().trim() !== ADMIN_EMAIL) {
            throw new Error("Invalid credentials");
          }

          if (user.isBlocked) {
            throw new Error("Your account has been blocked. Please contact support.");
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
        } catch (error: any) {
          console.error("Database error during authorization:", error);
          throw new Error(error.message || "Invalid credentials or Database Unreachable");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  useSecureCookies: process.env.NODE_ENV === "production" || process.env.NEXTAUTH_URL?.startsWith("https://"),
  callbacks: {
    async signIn({ user, account, profile }) {
      const emailToCheck = ((profile as any)?.email || user?.email || "").toLowerCase().trim();
      if (account?.provider !== "credentials") {
        // Admin portal login is strictly email & password only (contact@digitalghuru.in)
        if (emailToCheck === ADMIN_EMAIL || (user as any)?.role === "ADMIN") {
          return "/signin?error=AdminOAuthDisabled";
        }
        if (emailToCheck) {
          const { rows } = await pool.query(
            'SELECT role, "isBlocked" FROM users WHERE LOWER(email) = LOWER($1)',
            [emailToCheck]
          );
          if (rows[0]?.role === "ADMIN") {
            return "/signin?error=AdminOAuthDisabled";
          }
          if (rows[0]?.isBlocked) {
            return "/signin?error=AccountBlocked";
          }
        }
      }
      if ((user as any)?.isBlocked) {
        return "/signin?error=AccountBlocked";
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const userEmail = (user.email || token.email || "").toString().toLowerCase().trim();
        token.role = (user as any).role === "ADMIN" && userEmail === ADMIN_EMAIL ? "ADMIN" : "STUDENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        const sessionEmail = (session.user.email || "").toLowerCase().trim();
        (session.user as any).role = token.role === "ADMIN" && sessionEmail === ADMIN_EMAIL ? "ADMIN" : "STUDENT";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (
          parsed.hostname.endsWith("digitalghuru.com") ||
          parsed.hostname.endsWith("digitalghuru.in") ||
          parsed.hostname === "localhost"
        ) {
          return url;
        }
      } catch {
        // Fallback to baseUrl
      }
      return baseUrl;
    }
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
