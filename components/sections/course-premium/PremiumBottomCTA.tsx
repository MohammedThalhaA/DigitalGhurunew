"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Clock, Award, Users } from "lucide-react";

interface PremiumBottomCTAProps {
  courseTitle: string;
}

export default function PremiumBottomCTA({ courseTitle }: PremiumBottomCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the hero section (roughly 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a1024]/95 backdrop-blur-xl border-t border-white/10 z-50 transform transition-transform duration-500 ease-in-out">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 lg:py-4 flex items-center justify-between">
        
        {/* Left: Course Info (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-12 w-16 relative rounded-md overflow-hidden border border-white/10">
            <Image 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200" 
              alt="Course Thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">{courseTitle}</h4>
            <div className="flex items-center gap-3 text-xs font-medium text-blue-200 mt-0.5">
              <span>★ 4.9 (2,482 reviews)</span>
              <span>•</span>
              <span>10,000+ students</span>
            </div>
          </div>
        </div>

        {/* Middle: Features (Hidden on tablet/mobile) */}
        <div className="hidden xl:flex items-center gap-8 text-sm font-medium text-blue-200">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Lifetime access</div>
          <div className="flex items-center gap-2"><Award className="h-4 w-4" /> Certificate included</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Community support</div>
        </div>

        {/* Right: CTA (Visible everywhere) */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-6">
          {/* On mobile, show price here since info is hidden */}
          <div className="lg:hidden flex flex-col">
            <span className="text-white font-bold text-lg leading-none">₹4,999</span>
            <span className="text-blue-300 text-xs line-through">₹7,999</span>
          </div>
          
          <button className="px-8 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Enroll Now <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
