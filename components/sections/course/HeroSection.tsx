"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  { icon: Award, title: "10+ Recognised Certificates" },
  { icon: Briefcase, title: "100% Placement Assistance" },
  { icon: GraduationCap, title: "Dual Certification (Digital Marketing + AI)" },
  { icon: Sparkles, title: "AI-Integrated Training" },
];

export default function HeroSection({ course }: { course?: any }) {
  // Use fallback if course is not provided (for older implementations)
  const title = course?.title || "AI-Powered Digital Marketing Course Online & Offline";
  const desc = course?.description || "Digital Ghuru offers the best AI-Powered digital marketing course with agency-style AI training, real brand campaigns, dual certification & 100% job support.";
  
  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 bg-[#FAFAFA] overflow-hidden">
      {/* Premium glowing background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] opacity-70 translate-x-1/3 pointer-events-none" />
      
      {/* Subtle Dotted Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl relative"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-blue/20 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Top Rated</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-black text-ink-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              {title}
            </h1>
            
            <p className="text-sm font-semibold text-ink-500 italic mb-8 border-l-4 border-orange-200 pl-4">
              Last updated: Aug 2026 by the Digital Ghuru Team.
            </p>
            
            <div className="space-y-6 text-base text-ink-700 leading-relaxed mb-8">
              <p className="font-bold text-lg text-ink-900 bg-white/50 p-4 rounded-xl border border-ink-100 shadow-sm backdrop-blur-sm">
                {desc}
              </p>
              {course?.outcomes ? (
                <ul className="space-y-2 mt-4">
                  {course.outcomes.map((outcome: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <p>
                    Most AI-Powered digital marketing courses hand you slides and a certificate. Digital Ghuru works differently.
                  </p>
                  <p>
                    You join an actual agency (Digital Ghuru Agency, which manages ₹1+ crore in ad spend) and work on live campaigns for real brands like top national brands and startups. Every strategy in this digital marketing training program was tested on a real account last week, not written into a textbook five years ago.
                  </p>
                  <p>
                    Over 4 months, you cover SEO, Meta Ads, Google Ads, AI agents, content, and automation. You graduate with a dual certification in Digital Marketing + AI Marketing, 10+ certifications, and a portfolio of real campaign results, the kind hiring managers actually ask for.
                  </p>
                </>
              )}
              <div className="flex items-center gap-2 text-ink-900 font-bold bg-amber-50 inline-flex px-4 py-2 rounded-lg border border-amber-100">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>150+ Google reviews. 4.7 stars. 500+ students trained.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image & Features */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6 relative"
          >
            {/* Main Cutout Image */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-end justify-center z-20">
                <Image 
                  src="/resources/hero-student.png" 
                  alt="Digital Marketing Student"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
            </div>

            {/* Feature Grid underneath image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform cursor-default">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-ink-800 leading-tight">{feature.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
