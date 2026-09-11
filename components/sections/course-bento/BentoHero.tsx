"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Star, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface BentoHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  originalPrice: string;
  discountedPrice: string;
}

export default function BentoHero({ 
  title, 
  subtitle, 
  description, 
  imageUrl,
  originalPrice,
  discountedPrice
}: BentoHeroProps) {
  return (
    <section className="relative w-full pt-32 pb-16 overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-blue/10 via-brand-blue/5 to-transparent -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[120px] -z-10" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px] -z-10" />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-[55%] flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-blue/10 shadow-[0_4px_20px_-10px_rgba(0,118,255,0.15)] mb-8">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-sm font-bold text-ink-700 tracking-wide uppercase">New & Updated Curriculum</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-black text-ink-900 leading-[1.1] tracking-tight mb-6">
              {title.split(" ").map((word, idx) => (
                <span key={idx} className={word.toLowerCase() === "marketing" || word.toLowerCase() === "ai" ? "text-brand-blue" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            
            <p className="text-xl md:text-2xl text-ink-500 font-medium leading-relaxed mb-10 max-w-2xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-white rounded-3xl font-black text-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_-12px_rgba(0,118,255,0.4)] flex items-center justify-center gap-2"
              >
                Enroll Now <span className="font-medium opacity-80 pl-2 border-l border-white/20">{discountedPrice}</span>
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-5 bg-white text-ink-900 rounded-3xl font-bold text-lg hover:bg-ink-50 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-ink-100/50 flex items-center justify-center"
              >
                Download Brochure
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm font-bold text-ink-500">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-ink-800">4.9/5</span> Rating
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-ink-400" />
                <span className="text-ink-800">12k+</span> Enrolled
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-ink-800">100%</span> Placement
              </div>
            </div>
          </motion.div>

          {/* Right Video / Visual Area (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-[45%] relative w-full"
          >
            {/* The Glass Container */}
            <div className="relative p-3 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:rounded-[2.5rem] before:-z-10 group cursor-pointer overflow-hidden">
              
              <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-ink-950 shadow-inner">
                <Image 
                  src={imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
                  alt="Course Preview" 
                  fill 
                  className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-ink-900/60 via-transparent to-transparent">
                  <div className="h-20 w-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/30">
                    <PlayCircle className="h-10 w-10 text-white drop-shadow-md" strokeWidth={1.5} />
                  </div>
                  <span className="text-white font-extrabold mt-4 text-sm tracking-widest uppercase drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">Watch Trailer</span>
                </div>
              </div>
              
              {/* Floating badges on the video */}
              <div className="absolute -left-6 top-12 bg-white p-4 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white flex flex-col gap-1 items-center justify-center animate-bounce-slow">
                <span className="text-3xl font-black text-brand-blue">12</span>
                <span className="text-xs font-bold text-ink-500 uppercase tracking-wide">Modules</span>
              </div>
              
              <div className="absolute -right-6 bottom-12 bg-white px-5 py-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white flex items-center gap-3">
                <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-ink-800">Live & Recorded</span>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
