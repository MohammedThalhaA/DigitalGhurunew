"use client";

import React from "react";
import Image from "next/image";
import { Star, Users, GraduationCap, Clock, Globe, ShieldCheck, PlayCircle, Heart, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PremiumHeroProps {
  title: string;
  subtitle: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
}

export default function PremiumHero({
  title,
  subtitle,
  description,
  originalPrice,
  discountedPrice
}: PremiumHeroProps) {
  // Parsing the title to highlight "AI" or "Marketing" based on the design
  const renderTitle = () => {
    const words = title.split(" ");
    return words.map((word, idx) => {
      const isHighlight = word.toLowerCase().includes("ai") || word.toLowerCase().includes("mastery");
      return (
        <span key={idx} className={isHighlight ? "text-[#8bafff]" : "text-white"}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <section className="relative w-full bg-[#050A1A] pt-24 pb-32 lg:pb-48 overflow-visible font-sans z-10">
      {/* Background ambient glows - exactly matching the image's vibrant backdrop */}
      <div className="absolute top-0 left-[30%] w-[600px] h-[600px] bg-[#1476FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] bg-[#5E4DFF]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start relative">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-5 flex flex-col items-start pt-4 lg:pt-12"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-200 tracking-wide">Digital Marketing</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-[56px] font-bold leading-[1.1] tracking-tight mb-6">
              {renderTitle()}
            </h1>
            
            <p className="text-base md:text-lg text-[#94a3b8] font-medium leading-relaxed mb-8">
              {description || "Learn how to grow your brand, attract the right audience, and use AI tools to work smarter, not harder."}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-[#cbd5e1] mb-6">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-[#fbbf24] fill-[#fbbf24]" />
                <span className="text-white font-bold">4.9</span>
                <span className="text-[#64748b]">(2,482 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#94a3b8]">
                <Users className="h-4 w-4" />
                <span>10,000+ students</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#94a3b8]">
                <GraduationCap className="h-4 w-4" />
                <span>Beginner to Advanced</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-[#94a3b8] mb-10 border-t border-white/10 pt-6 w-full">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>12 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Lifetime access</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#5E4DFF] hover:bg-[#4d3ecc] text-white rounded-[14px] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(94,77,255,0.5)]">
                Enroll Now <ArrowRight className="h-4 w-4" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-[14px] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2">
                <PlayCircle className="h-5 w-5" /> Watch Preview
              </button>
            </div>
          </motion.div>

          {/* Center Column: Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="col-span-1 lg:col-span-4 relative mt-8 lg:mt-16 z-10 lg:-ml-4 xl:-ml-8"
          >
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="Students learning" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-bold text-white/90 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 bg-blue-400 rounded-full"/> Learn</span>
                <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 bg-purple-400 rounded-full"/> Build</span>
                <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 bg-emerald-400 rounded-full"/> Grow</span>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-5 -left-5 bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl flex items-center gap-3 shadow-2xl">
              <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-300" />
              </div>
              <div className="pr-2">
                <p className="text-white font-bold text-sm leading-tight">10K+</p>
                <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wider">Learners</p>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2 shadow-2xl">
              <ShieldCheck className="h-5 w-5 text-purple-300" />
              <p className="text-white text-xs font-bold leading-tight">Certificate<br/>Included</p>
            </div>

            <div className="absolute -bottom-5 -right-5 bg-white/10 backdrop-blur-md border border-white/20 pl-5 pr-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl">
              <div className="h-10 w-10 bg-[#5E4DFF] rounded-full flex items-center justify-center shadow-lg">
                <PlayCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xl leading-none">48</p>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mt-1">Lessons</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sticky Enrollment Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 lg:col-span-3 lg:mt-8 relative z-30"
          >
            {/* The sticky wrapper */}
            <div className="lg:sticky lg:top-32 bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col w-full">
              <div className="bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-md self-start mb-5">
                Most Popular
              </div>

              <div className="flex items-end gap-3 mb-6">
                <h2 className="text-4xl font-black text-[#0B1730]">{discountedPrice}</h2>
                {originalPrice !== "—" && (
                  <span className="text-base text-[#8793A5] font-bold line-through pb-1">{originalPrice}</span>
                )}
              </div>

              <button className="w-full py-4 bg-[#5E4DFF] hover:bg-[#4d3ecc] text-white rounded-[14px] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(94,77,255,0.5)] mb-3">
                Enroll Now <ArrowRight className="h-4 w-4" />
              </button>

              <button className="w-full py-3 bg-transparent hover:bg-gray-50 text-[#52627A] border border-gray-200 rounded-[14px] font-bold text-sm transition-colors flex items-center justify-center gap-2 mb-8">
                <Heart className="h-4 w-4" /> Add to Wishlist
              </button>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm font-bold text-[#0B1730] mb-4">This course includes:</p>
                <ul className="space-y-4">
                  {[
                    "48 video lessons",
                    "Lifetime access",
                    "Certificate of completion",
                    "Downloadable resources",
                    "Community support"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#52627A] text-sm font-medium">
                      <Check className="h-5 w-5 text-[#5E4DFF] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
