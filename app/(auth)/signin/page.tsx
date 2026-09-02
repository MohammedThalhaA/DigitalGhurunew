"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
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
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue" />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-2">Welcome Back</h1>
        <p className="text-ink-600 font-medium text-sm">Sign in to your Digital Ghuru account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 border-t border-ink-100 pt-6">
        <p className="text-xs text-ink-500 font-bold uppercase tracking-wider text-center mb-4">Quick Demo Access</p>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-xs py-2"
            onClick={() => {
              setEmail("student@demo.com");
              setPassword("password123");
            }}
          >
            Demo Student
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-xs py-2"
            onClick={() => {
              setEmail("instructor@demo.com");
              setPassword("password123");
            }}
          >
            Demo Instructor
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-ink-600 font-medium">
          Don&apos;t have an account? <a href="/signup" className="text-brand-blue hover:underline font-bold">Sign up</a>
        </p>
      </div>
    </motion.div>
  );
}
