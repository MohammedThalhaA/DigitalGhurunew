import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import { Sparkles, CheckCircle2, ShieldCheck, GraduationCap, Briefcase, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Student Account",
  description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
  alternates: {
    canonical: "https://digitalghuru.com/signup",
  },
  openGraph: {
    title: "Create Student Account | Digital Ghuru",
    description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
    url: "https://digitalghuru.com/signup",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Create Student Account - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Student Account | Digital Ghuru",
    description: "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function SignUpPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-ink-900 tracking-tight">
          Create Your Student Learning Account
        </h1>
        <p className="text-sm text-ink-500 mt-2 max-w-lg mx-auto">
          Join Digital Ghuru to master practical AI digital marketing and tech careers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Sign Up Form */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <AuthCard initialMode="signup" />
        </div>

        {/* Right column: Enrollment Benefits & Advisory */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Join Digital Ghuru
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
            Start Your Practical Tech & AI Career Journey
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Create your account to unlock industry-accredited courses in AI-Powered Digital Marketing and Full Stack Web Development. Learn through agency simulations, live budget campaigns, and dedicated placement support.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-brand-blue shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Practical, Live-Budget Curriculum</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Work on real client campaigns with real ad spend across Google Ads, Meta Ads Manager, GA4, SEMrush, and next-generation AI marketing tools.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">100% Placement & Career Coaching</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Get personalized resume crafting, LinkedIn optimization, mock interviews with agency heads, and direct referrals to hiring partners in India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Recognized Industry Certifications</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Earn accredited credentials including Digital Ghuru Graduate, Google Certified Professional, Meta Certified Digital Associate, and HubSpot Academy diplomas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Offline & Online Flexibility</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Study at our modern campuses in Anna Nagar, Chennai and Ameerpet, Hyderabad or join interactive online weekend and weekday batches.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
              <span>
                Already registered for classroom training? Sign up using your admission email address or call{" "}
                <a href="tel:+918825948859" className="font-semibold text-brand-blue hover:underline">
                  +91 8825948859
                </a>{" "}
                to instantly link your offline batch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
