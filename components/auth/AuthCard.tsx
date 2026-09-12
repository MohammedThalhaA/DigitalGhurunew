"use client";

import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthCardProps {
  initialMode: "signin" | "signup";
}

export default function AuthCard({ initialMode }: AuthCardProps) {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(initialMode === "signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Update URL without reload when switching modes
  useEffect(() => {
    window.history.pushState(null, "", isSignIn ? "/signin" : "/signup");
  }, [isSignIn]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: signInEmail,
      password: signInPassword,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      const session = await getSession();
      const role = (session?.user as { role?: string })?.role;
      if (role === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/student/dashboard";
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signUpName, email: signUpEmail, password: signUpPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      const loginRes = await signIn("credentials", {
        email: signUpEmail,
        password: signUpPassword,
        redirect: false,
      });

      if (loginRes?.error) {
        setError("Account created, but failed to log in automatically.");
        setLoading(false);
      } else {
        const session = await getSession();
        const role = (session?.user as { role?: string })?.role;
        if (role === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/student/dashboard";
        }
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // Sliding panel variants
  const panelVariants = {
    signin: { x: "100%", borderRadius: "24px 0 0 24px" },
    signup: { x: "0%", borderRadius: "0 24px 24px 0" }
  };

  return (
    <div className="w-full max-w-[900px] h-auto md:h-[600px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-ink-100 relative overflow-hidden flex flex-col md:block">
      
      {/* ─── MOBILE VIEW (Stack) ─── */}
      <div className="md:hidden flex flex-col h-full">
        <div className="p-8 bg-[#006FFF] text-white text-center">
          <h2 className="font-display text-3xl font-bold mb-2">
            {isSignIn ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="font-body text-sm text-white/90 mb-6">
            {isSignIn 
              ? "Enter your personal details and start your journey with us."
              : "To keep connected with us please login with your personal info."}
          </p>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-brand-blue"
            onClick={() => { setError(""); setIsSignIn(!isSignIn); }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </div>
        <div className="p-8 bg-white flex-1">
          {isSignIn ? (
            <SignInForm 
              email={signInEmail} setEmail={setSignInEmail}
              password={signInPassword} setPassword={setSignInPassword}
              onSubmit={handleSignIn} error={error} loading={loading}
            />
          ) : (
            <SignUpForm
              name={signUpName} setName={setSignUpName}
              email={signUpEmail} setEmail={setSignUpEmail}
              password={signUpPassword} setPassword={setSignUpPassword}
              onSubmit={handleSignUp} error={error} loading={loading}
            />
          )}
        </div>
      </div>

      {/* ─── DESKTOP VIEW (Sliding Panel) ─── */}
      <div className="hidden md:block w-full h-full relative">
        
        {/* Left Side: Sign In Form (Static position) */}
        <div className="absolute top-0 left-0 w-1/2 h-full p-12 flex flex-col justify-center items-center bg-white z-10">
          <SignInForm 
            email={signInEmail} setEmail={setSignInEmail}
            password={signInPassword} setPassword={setSignInPassword}
            onSubmit={handleSignIn} error={error} loading={loading}
          />
        </div>

        {/* Right Side: Sign Up Form (Static position) */}
        <div className="absolute top-0 right-0 w-1/2 h-full p-12 flex flex-col justify-center items-center bg-white z-10">
          <SignUpForm
            name={signUpName} setName={setSignUpName}
            email={signUpEmail} setEmail={setSignUpEmail}
            password={signUpPassword} setPassword={setSignUpPassword}
            onSubmit={handleSignUp} error={error} loading={loading}
          />
        </div>

        {/* The Sliding Overlay Panel */}
        <motion.div
          initial={false}
          animate={isSignIn ? "signin" : "signup"}
          variants={panelVariants}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-0 left-0 w-1/2 h-full z-20 bg-[#006FFF] shadow-2xl flex flex-col justify-center items-center text-center p-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div
                key="signin-overlay"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <Image 
                  src="/logo-final dG.webp" 
                  alt="Digital Ghuru" 
                  width={280} 
                  height={70} 
                  className="mb-10 object-contain h-20 w-auto"
                />
                <h2 className="font-display text-4xl font-bold text-white mb-6">New Here?</h2>
                <p className="font-body text-base text-white/90 mb-10 max-w-[280px] leading-relaxed">
                  Sign up and unlock access to our premium digital marketing courses, tools, and resources.
                </p>
                <button 
                  onClick={() => { setError(""); setIsSignIn(false); }}
                  className="px-10 py-3 rounded-full border-2 border-white text-white font-heading text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-brand-blue transition-colors"
                >
                  Sign Up
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="signup-overlay"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <Image 
                  src="/logo-final dG.webp" 
                  alt="Digital Ghuru" 
                  width={280} 
                  height={70} 
                  className="mb-10 object-contain h-20 w-auto"
                />
                <h2 className="font-display text-4xl font-bold text-white mb-6">Welcome Back!</h2>
                <p className="font-body text-base text-white/90 mb-10 max-w-[280px] leading-relaxed">
                  Already a Digital Ghuru learner? Sign in to continue your learning journey.
                </p>
                <button 
                  onClick={() => { setError(""); setIsSignIn(true); }}
                  className="px-10 py-3 rounded-full border-2 border-white text-white font-heading text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-brand-blue transition-colors"
                >
                  Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

// ─── Subcomponents for the forms to keep it clean ───

function SocialButtons() {
  return (
    <div className="flex items-center justify-center gap-4 mb-6 w-full">
      <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-brand-blue hover:text-brand-blue transition-all font-heading font-medium text-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

function SignInForm({ email, setEmail, password, setPassword, onSubmit, error, loading }: any) {
  return (
    <div className="w-full max-w-xs mx-auto animate-fade-in">
      <h1 className="heading-md text-ink-900 mb-6 font-bold text-center">Sign in</h1>
      <SocialButtons />
      <p className="text-xs text-ink-400 font-body mb-6 text-center">or use your account</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-ink-400" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-50 border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 text-ink-900 transition-all font-body text-sm"
            placeholder="Email"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-ink-400" />
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-50 border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 text-ink-900 transition-all font-body text-sm"
            placeholder="Password"
          />
        </div>

        <div className="text-center pt-2">
          <a href="#" className="text-xs text-ink-500 font-body hover:text-brand-blue transition-colors">
            Forgot your password?
          </a>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}

        <div className="pt-4 flex justify-center">
          <Button type="submit" variant="primary" className="px-10 rounded-full font-heading uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-ink-100 pt-6 w-full">
        <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider text-center mb-4">Quick Demo</p>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-[10px] py-1.5 px-0 rounded-lg whitespace-nowrap"
            onClick={() => { setEmail("student@demo.com"); setPassword("password123"); }}
          >
            Demo Student
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-[10px] py-1.5 px-0 rounded-lg whitespace-nowrap"
            onClick={() => { setEmail("admin@demo.com"); setPassword("password123"); }}
          >
            Super Admin
          </Button>
        </div>
      </div>
    </div>
  );
}

function SignUpForm({ name, setName, email, setEmail, password, setPassword, onSubmit, error, loading }: any) {
  return (
    <div className="w-full max-w-xs mx-auto animate-fade-in">
      <h1 className="heading-md text-ink-900 mb-6 font-bold text-center">Create Account</h1>
      <SocialButtons />
      <p className="text-xs text-ink-400 font-body mb-6 text-center">or use your email for registration</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-ink-400" />
          </div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-50 border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 text-ink-900 transition-all font-body text-sm"
            placeholder="Name"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-ink-400" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-50 border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 text-ink-900 transition-all font-body text-sm"
            placeholder="Email"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-ink-400" />
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-50 border-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 text-ink-900 transition-all font-body text-sm"
            placeholder="Password"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-semibold text-center pt-2">{error}</p>}

        <div className="pt-6 flex justify-center">
          <Button type="submit" variant="primary" className="px-10 rounded-full font-heading uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
}
