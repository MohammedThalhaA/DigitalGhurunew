import pool from "@/lib/db";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams.token as string | undefined;

  let success = false;
  let message = "";

  if (!token) {
    message = "Invalid or missing verification token.";
  } else {
    try {
      // Find the token
      const tokenRes = await pool.query(
        `SELECT identifier, expires FROM verification_token WHERE token = $1`,
        [token]
      );

      if (tokenRes.rows.length === 0) {
        message = "Verification token is invalid or has already been used.";
      } else {
        const { identifier: email, expires } = tokenRes.rows[0];

        if (new Date(expires) < new Date()) {
          message = "Verification link has expired. Please sign in to request a new one.";
        } else {
          // Update the user
          await pool.query(
            `UPDATE users SET "emailVerified" = NOW() WHERE email = $1`,
            [email]
          );

          // Delete the token
          await pool.query(
            `DELETE FROM verification_token WHERE token = $1`,
            [token]
          );

          success = true;
          message = "Your email address has been successfully verified!";
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      message = "An error occurred during verification. Please try again later.";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
        
        {/* Blue Header Banner with Logo */}
        <div className="bg-[#006FFF] px-8 py-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/20 pointer-events-none" />
          <Image 
            src="/logo-final dG.webp" 
            alt="Digital Ghuru" 
            width={200} 
            height={60} 
            className="object-contain h-14 w-auto relative z-10" 
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {success ? (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-5 border border-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Email Verified!</h1>
              <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
              <Link
                href="/signin"
                className="w-full bg-[#006FFF] text-white rounded-xl py-3.5 px-4 font-semibold hover:bg-blue-700 transition-colors block text-center shadow-md hover:shadow-lg"
              >
                Sign In to Your Account
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Verification Failed</h1>
              <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
              <Link
                href="/signin"
                className="w-full bg-slate-100 text-slate-700 rounded-xl py-3.5 px-4 font-semibold hover:bg-slate-200 transition-colors block text-center"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
