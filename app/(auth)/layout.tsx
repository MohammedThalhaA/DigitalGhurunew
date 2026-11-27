import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Compass, BookOpen } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header with Internal Outlinks */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 group" title="Return to Digital Ghuru Homepage">
          <Image
            src="/logo-final dG.webp"
            alt="Digital Ghuru Logo"
            width={160}
            height={45}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <nav aria-label="Auth header navigation" className="flex items-center gap-5 text-xs sm:text-sm font-heading font-semibold text-ink-600">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand-blue transition-colors">
            <Home className="h-4 w-4 text-ink-400" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/courses/ai-powered-digital-marketing" className="inline-flex items-center gap-1.5 hover:text-brand-blue transition-colors">
            <Compass className="h-4 w-4 text-ink-400" />
            <span>Courses</span>
          </Link>
          <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-brand-blue transition-colors">
            <BookOpen className="h-4 w-4 text-ink-400" />
            <span>Blog</span>
          </Link>
        </nav>
      </header>

      {/* Main Auth Form Container */}
      <main className="flex items-center justify-center py-6">
        {children}
      </main>

      {/* Footer Navigation Bar with Internal Outlinks */}
      <footer className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-ink-200/60 text-xs text-ink-500 font-body">
        <nav aria-label="Auth footer navigation" className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <Link href="/" className="hover:text-brand-blue transition-colors font-medium">
            Digital Ghuru Home
          </Link>
          <Link href="/courses/ai-powered-digital-marketing" className="hover:text-brand-blue transition-colors font-medium">
            AI Digital Marketing
          </Link>
          <Link href="/courses/react-js-full-stack-development" className="hover:text-brand-blue transition-colors font-medium">
            React Full Stack
          </Link>
          <Link href="/blog" className="hover:text-brand-blue transition-colors font-medium">
            Guides &amp; Articles
          </Link>
          <Link href="/contact" className="hover:text-brand-blue transition-colors font-medium">
            Campus Locations
          </Link>
          <Link href="/verify" className="hover:text-brand-blue transition-colors font-medium">
            Verify Certificate
          </Link>
        </nav>
        <div className="text-ink-400 text-center sm:text-right shrink-0">
          &copy; {new Date().getFullYear()} Digital Ghuru. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
