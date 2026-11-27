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
          <h3 className="heading-sm text-ink-900">Verifying...</h3>
          <p className="text-ink-500">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="heading-sm text-ink-900">Account Verified!</h3>
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
          <h3 className="heading-sm text-ink-900">Verification Failed</h3>
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full text-center mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-3 text-center">
          Verify Email Address & Credentials
        </h1>
        <p className="text-sm text-ink-600 max-w-lg mx-auto">
          Confirm your registered email to activate your student learning account and access course portals.
        </p>
      </div>

      <Suspense fallback={
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card max-w-md w-full text-center flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-16 w-16 text-brand-blue animate-spin" />
          <h3 className="heading-sm text-ink-900">Loading verification details...</h3>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>

      {/* Helpful Student Onboarding and Support Information */}
      <div className="mt-8 max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-display text-base font-bold text-ink-900 mb-2">
            Why Verify Your Email?
          </h2>
          <p className="text-xs text-ink-600 leading-relaxed mb-3">
            Confirming your email keeps your account safe. It lets you log in to your student dashboard right away.
          </p>
          <p className="text-xs text-ink-600 leading-relaxed">
            You will also get your class links, mentor notes, and course completion cards on time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-display text-base font-bold text-ink-900 mb-2">
            Need Help with Setup?
          </h3>
          <p className="text-xs text-ink-600 leading-relaxed mb-3">
            If your link has expired, you can request a new one. Be sure to check your spam or promo tabs if you do not see our note.
          </p>
          <p className="text-xs text-ink-600 leading-relaxed">
            You can write to our help team at <span className="font-semibold text-brand-blue">support@digitalghuru.com</span>. We are here to help you get started.
          </p>
        </div>
      </div>
    </div>
  );
}
