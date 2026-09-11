"use client";

import React from "react";
import { Star, Users, GraduationCap, Globe, Clock, ShieldCheck, ChevronRight, Image as ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";

interface LinearHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  bannerImage?: string;
}

export default function LinearHero({
  title,
  subtitle,
  description,
  bannerImage,
}: LinearHeroProps) {
  return (
    <section className="relative w-full bg-surface-dark pt-16 pb-32 border-b border-white/10 overflow-hidden">
      {/* ─── 1. Background Banner Image or High-Tech Placeholder ─── */}
      {bannerImage ? (
        <div className="absolute inset-0 z-0 bg-surface-dark">
          <img
            src={bannerImage}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />
        </div>
      ) : (
        /* High-Tech Banner Placeholder Backdrop */
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Subtle Radial Glows */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-brand-blue/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />

          {/* Blueprint Grid Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>
      )}

      {/* ─── 2. Hero Content ─── */}
      <div className="section-container relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-body font-medium text-ink-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/#course-grid" className="hover:text-white transition-colors">Courses</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white line-clamp-1">{title}</span>
        </nav>

        {/* Banner Placeholder Status Badge */}
        {!bannerImage && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-heading font-semibold text-blue-300 backdrop-blur-md mb-6 shadow-sm">
            <ImageIcon className="w-4 h-4 text-brand-gold animate-pulse" />
            <span>Course Detail Banner Slot</span>
            <span className="text-ink-400">•</span>
            <span className="text-ink-300 font-medium text-[11px]">Recommended: 1920x600 • Replace in Admin Portal</span>
          </div>
        )}

        {/* 70% width to leave room for the right sidebar on desktop */}
        <div className="lg:w-[65%]">
          <h1 className="heading-xl text-white leading-[1.15] mb-6 tracking-tight">
            {title}
          </h1>
          
          <p className="font-body text-lg text-ink-300 font-medium leading-relaxed mb-8">
            {description || subtitle || "Master the exact strategies used by top brands to generate traffic, convert leads, and grow revenue in 2026."}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-body font-medium text-ink-300">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="h-4 w-4 text-brand-blue" />
              <span>3 to 6 Months</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Globe className="h-4 w-4 text-brand-blue" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="h-4 w-4 text-brand-blue" />
              <span>Classroom + Online</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
