"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, MonitorPlay, FileText, Download, Award, Infinity, Smartphone } from "lucide-react";

interface StickyEnrollmentCardProps {
  originalPrice: string;
  discountedPrice: string;
  imageUrl?: string;
}

export default function StickyEnrollmentCard({ originalPrice, discountedPrice, imageUrl }: StickyEnrollmentCardProps) {
  const [isSticky, setIsSticky] = useState(false);

  // We want the card to only become "fixed" once the user scrolls past the hero section,
  // similar to Udemy. For simplicity in Tailwind, we can use `sticky top-8` on its container,
  // but we can add some styling states based on scroll if needed.
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hidden lg:block w-[340px] xl:w-[380px] bg-white text-ink-900 border border-ink-100/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-3xl absolute top-24 right-4 xl:right-auto z-50 transition-all duration-500 ease-out ${isSticky ? "fixed top-8" : ""}`}>
      
      {/* Video/Image Preview Area */}
      <div className="relative w-full aspect-video bg-ink-950 cursor-pointer group rounded-t-3xl overflow-hidden border-b border-ink-100/50">
        <Image 
          src={imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
          alt="Course Preview" 
          fill 
          className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-ink-900/60 to-transparent">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/20">
            <PlayCircle className="h-8 w-8 text-white drop-shadow-md" strokeWidth={1.5} />
          </div>
          <span className="text-white font-bold mt-3 text-sm drop-shadow-lg tracking-wide">Preview this course</span>
        </div>
      </div>

      <div className="p-7">
        {/* Pricing */}
        <div className="mb-5 flex items-end gap-3">
          <span className="text-[2.5rem] tracking-tight font-black text-ink-900 leading-none drop-shadow-sm">{discountedPrice !== "Contact Us" ? discountedPrice : "Talk to Expert"}</span>
          {originalPrice !== "—" && (
             <span className="text-lg text-ink-400 line-through font-bold leading-none mb-1.5">{originalPrice}</span>
          )}
        </div>
        
        {discountedPrice !== "Contact Us" && (
          <p className="text-rose-500 font-bold text-sm mb-6 flex items-center gap-1.5 bg-rose-50 w-fit px-3 py-1 rounded-full border border-rose-100">
            ⏱️ <span className="pt-0.5">Limited time offer!</span>
          </p>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3.5 mb-7">
          <Link href="/signup" className="block w-full bg-brand-blue hover:bg-blue-600 text-white text-center font-black py-4 text-lg transition-all shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] hover:-translate-y-0.5 rounded-2xl">
            Enroll Now
          </Link>
          <Link href="/contact" className="block w-full bg-white border-2 border-ink-100 hover:border-ink-200 hover:bg-ink-50 text-ink-900 text-center font-black py-3.5 transition-colors rounded-2xl">
            Download Brochure
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 mb-7 bg-ink-50 py-2.5 rounded-xl border border-ink-100/50">
          <Award className="h-4 w-4 text-brand-blue" />
          <p className="text-xs text-ink-600 font-bold tracking-wide uppercase">100% Placement Assistance</p>
        </div>

        {/* This course includes */}
        <div>
          <h4 className="font-bold text-ink-900 mb-4 text-lg">This course includes:</h4>
          <ul className="space-y-3.5 text-sm text-ink-600 font-medium">
            <li className="flex items-center gap-3">
              <MonitorPlay className="h-4 w-4 shrink-0" /> Live & Recorded Sessions
            </li>
            <li className="flex items-center gap-3">
              <FileText className="h-4 w-4 shrink-0" /> Premium Templates & Frameworks
            </li>
            <li className="flex items-center gap-3">
              <Download className="h-4 w-4 shrink-0" /> Downloadable Resources
            </li>
            <li className="flex items-center gap-3">
              <Infinity className="h-4 w-4 shrink-0" /> Lifetime access to materials
            </li>
            <li className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 shrink-0" /> Access on mobile and TV
            </li>
            <li className="flex items-center gap-3">
              <Award className="h-4 w-4 shrink-0" /> Certificate of completion
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
