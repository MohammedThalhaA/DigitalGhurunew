import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Home, 
  BookOpen, 
  Calculator, 
  PhoneCall, 
  ArrowRight,
  Compass,
  AlertCircle
} from "lucide-react";

export default function NotFound() {
  const helpfulLinks = [
    {
      title: "Explore Courses",
      description: "Master AI-powered digital marketing and modern tech skills.",
      href: "/#course-grid",
      icon: BookOpen,
      badge: "Popular",
    },
    {
      title: "Free Marketing Tools",
      description: "Calculate CPC, advertising ROI, and optimize your campaign metrics.",
      href: "/tools",
      icon: Calculator,
      badge: "Free Tools",
    },
    {
      title: "Career & Placement",
      description: "Discover our 100% placement support and 50+ hiring agency partners.",
      href: "/success-stories",
      icon: Compass,
      badge: "Placement",
    },
    {
      title: "Talk to Admissions",
      description: "Get in touch with our team for syllabus counseling and demo sessions.",
      href: "/contact",
      icon: PhoneCall,
      badge: "Get Help",
    },
  ];

  return (
    <>
      <title>404 - Page Not Found | Digital Ghuru</title>
      <meta 
        name="description" 
        content="Sorry, the page you requested cannot be found. Browse Digital Ghuru's AI-powered digital marketing courses, free calculators, and student resources." 
      />
      <meta name="robots" content="noindex, follow" />

      <Navbar />

      <main 
        style={{ paddingTop: "88px" }} 
        className="pt-[88px] min-h-screen bg-gradient-to-b from-ink-50/50 via-white to-ink-50/30 flex flex-col justify-between"
      >
        <div className="section-container py-12 md:py-20 flex-1 flex flex-col items-center justify-center text-center">
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Error 404 • Missing Resource</span>
          </div>

          {/* 404 Headline */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-extrabold text-ink-900 tracking-tight leading-none mb-4">
            4<span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">0</span>4
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4 max-w-2xl">
            Lost in the Digital Landscape?
          </h2>

          <p className="text-base sm:text-lg text-ink-600 max-w-xl mx-auto mb-10 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Don&apos;t worry — here are the most popular sections to get you back on track:
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-blue hover:bg-[#005bd6] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-ink-50 text-ink-800 font-semibold rounded-xl border border-ink-200 transition-all duration-200 shadow-sm hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Admissions</span>
            </Link>
          </div>

          {/* Helpful Navigation Cards */}
          <div className="w-full max-w-4xl text-left">
            <p className="text-xs uppercase tracking-wider text-ink-400 font-bold mb-4 text-center sm:text-left">
              Recommended Destinations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helpfulLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group p-5 rounded-2xl bg-white border border-ink-100/80 hover:border-brand-blue/30 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-heading font-bold text-ink-900 group-hover:text-brand-blue transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-ink-100 text-ink-600">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ink-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-200 shrink-0 self-center" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
