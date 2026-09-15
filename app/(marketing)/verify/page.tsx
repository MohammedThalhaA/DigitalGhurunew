"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. The link may have expired.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card max-w-md w-full text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-16 w-16 text-brand-blue animate-spin" />
          <h2 className="heading-sm text-ink-900">Verifying...</h2>
          <p className="text-ink-500">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="heading-sm text-ink-900">Account Verified!</h2>
          <p className="text-ink-500 mb-6">{message}</p>
          <Link 
            href="/signin"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-brand-blue hover:bg-blue-700 transition-colors"
          >
            Sign In to Your Account
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="heading-sm text-ink-900">Verification Failed</h2>
          <p className="text-ink-500 mb-6">{message}</p>
          <Link 
            href="/signin"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-ink-700 bg-ink-100 hover:bg-ink-200 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card max-w-md w-full text-center flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-16 w-16 text-brand-blue animate-spin" />
          <h2 className="heading-sm text-ink-900">Loading...</h2>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
