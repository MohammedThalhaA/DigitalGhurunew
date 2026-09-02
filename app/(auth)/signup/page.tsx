"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Automatically log the user in after registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setError("Account created, but failed to log in automatically.");
        setLoading(false);
      } else {
        const session = await getSession();
        const role = (session?.user as { role?: string })?.role;
        
        if (role === "INSTRUCTOR" || role === "ADMIN") {
          window.location.href = "/mentor/dashboard";
        } else {
          window.location.href = "/student/dashboard";
        }
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-ink-200 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-2">Create Account</h1>
        <p className="text-ink-600 font-medium text-sm">Join Digital Ghuru to start learning</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink-900 transition-colors bg-ink-50 focus:bg-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink-900 transition-colors bg-ink-50 focus:bg-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink-900 transition-colors bg-ink-50 focus:bg-white"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-ink-600 font-medium">
          Already have an account? <Link href="/signin" className="text-brand-blue hover:underline font-bold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
