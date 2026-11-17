import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import { BookOpen, Video, Award, Users, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In to Student Portal",
  description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
  alternates: {
    canonical: "https://digitalghuru.com/signin",
  },
  openGraph: {
    title: "Sign In to Student Portal | Digital Ghuru",
    description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
    url: "https://digitalghuru.com/signin",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Sign In to Student Portal - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In to Student Portal | Digital Ghuru",
    description: "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function SignInPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Sign In Form */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <AuthCard initialMode="signin" />
        </div>

        {/* Right column: Portal Overview & Support Information */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Digital Ghuru Learning Portal
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
            Welcome to Your Career Transformation Dashboard
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Log in with your registered student credentials to access class schedules, hands-on agency assignments, real-time campaign analytics, and dedicated career placement support across our Chennai and Hyderabad centers.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-brand-blue shrink-0 mt-0.5">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Live Classes & HD Replays</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Attend interactive live mentor sessions or catch up with recorded video lectures, practical walkthroughs, and code repositories anytime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Agency-Style Capstone Projects</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Submit real ad campaigns, technical SEO audits, social media calendars, and web apps directly to senior industry mentors for personal feedback.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Placement Assistance & Hiring Partners</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Browse verified hiring opportunities from top partner agencies, schedule mock interview sessions, and connect directly with placement officers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Alumni Network & Community</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Engage in weekly masterclasses, participate in peer coding and marketing challenges, and stay updated with the latest AI trends and algorithms.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
              <span>
                Need help accessing your student portal? Contact our team at{" "}
                <a href="mailto:contact@digitalghuru.com" className="font-semibold text-brand-blue hover:underline">
                  contact@digitalghuru.com
                </a>{" "}
                or call{" "}
                <a href="tel:+918825948859" className="font-semibold text-brand-blue hover:underline">
                  +91 8825948859
                </a>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
