"use client";

import React from "react";
import Link from "next/link";
import { Star, ChevronRight, Info, Globe, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

interface UdemyStyleHeroProps {
  title: string;
  subtitle: string;
  description: string;
  rating?: string;
  enrolled?: string;
  lastUpdated?: string;
  language?: string;
}

export default function UdemyStyleHero({
  title,
  subtitle,
  description,
  rating = "4.8",
  enrolled = "10,000+",
  lastUpdated = "11/2026",
  language = "English",
}: UdemyStyleHeroProps) {
  return (
    <section className="bg-ink-900 text-white pt-24 pb-12 lg:pt-32 lg:pb-16 relative overflow-hidden">
      {/* Background Dark Gradient/Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ink-800 via-ink-900 to-ink-950"></div>
      
      {/* Content Container */}
      <div className="section-container relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Main content in Hero) */}
        <div className="lg:w-[65%] xl:w-[70%]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-bold text-ink-300 mb-6 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/courses" className="hover:text-brand-blue transition-colors">Courses</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-100">{title.split(" ")[0]}</span>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight mb-4">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-ink-200 mb-6 font-medium max-w-3xl">
              {subtitle}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
              <span className="bg-amber-400 text-amber-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Bestseller
              </span>
              
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="text-lg">{rating}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/30 text-amber-400/30'}`} />
                  ))}
                </div>
                <span className="text-ink-300 text-sm underline hover:text-ink-100 cursor-pointer transition-colors">(3,452 ratings)</span>
              </div>
              
              <span className="text-ink-200 font-medium">{enrolled} students</span>
            </div>

            {/* Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-ink-300">
              <span className="flex items-center gap-2">
                <Info className="h-4 w-4" /> Last updated {lastUpdated}
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> {language}
              </span>
            </div>

            {/* Mobile-only CTA (hidden on desktop because sticky card handles it) */}
            <div className="mt-8 lg:hidden">
               <Link href="/signup" className="block w-full text-center bg-brand-blue hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] text-lg">
                 Enroll Now
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
