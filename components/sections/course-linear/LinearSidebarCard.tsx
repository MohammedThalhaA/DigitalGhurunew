"use client";

import React from "react";
import Image from "next/image";
import { PlayCircle, ArrowRight, Heart, ShieldCheck, BookOpen, Clock, MapPin, Award } from "lucide-react";

interface LinearSidebarCardProps {
  originalPrice: string;
  discountedPrice: string;
  moduleCount?: number;
  duration?: string;
  format?: string;
  previewImage?: string;
}

export default function LinearSidebarCard({
  originalPrice,
  discountedPrice,
  moduleCount,
  duration,
  format,
  previewImage,
}: LinearSidebarCardProps) {
  const formatPrice = (price?: string) => {
    if (!price || price === "—" || price.toLowerCase() === "contact us") return price;
    const numericValue = price.replace(/[₹,]/g, '').trim();
    if (isNaN(Number(numericValue)) || numericValue === "") return price;
    return `₹${Number(numericValue).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-ink-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      
      {/* Course Image */}
      <div className="relative w-full aspect-video bg-ink-900 overflow-hidden border-b border-ink-100">
        <img 
          src={previewImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
          alt="Course Preview"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col mb-6">
          <h2 className="font-display text-4xl font-bold text-ink-900 leading-none">{formatPrice(discountedPrice)}</h2>
          {originalPrice !== "—" && (
            <span className="font-body text-lg text-ink-400 font-semibold line-through mt-2">{formatPrice(originalPrice)}</span>
          )}
        </div>

        <button className="w-full py-4 bg-brand-blue hover:bg-blue-700 text-white rounded-lg heading-sm transition-colors flex items-center justify-center gap-2 mb-3 shadow-md">
          Enroll Now <ArrowRight className="h-5 w-5" />
        </button>

        <button className="w-full py-3 bg-white hover:bg-ink-50 text-ink-900 border border-ink-300 rounded-lg font-heading font-bold text-sm transition-colors flex items-center justify-center gap-2 mb-8">
          <Heart className="h-4 w-4" /> Add to Wishlist
        </button>

        <div className="border-t border-ink-100 pt-6">
          <p className="font-heading text-sm font-bold text-ink-900 mb-4">This course includes:</p>
          <ul className="space-y-3.5">
            <li className="flex items-center gap-3 font-body text-ink-700 text-sm font-medium group">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all shadow-2xs">
                <BookOpen className="h-4 w-4 shrink-0" />
              </div>
              <span>{moduleCount ? `${moduleCount} comprehensive modules` : "12 comprehensive modules"}</span>
            </li>
            <li className="flex items-center gap-3 font-body text-ink-700 text-sm font-medium group">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 group-hover:bg-amber-100 transition-all shadow-2xs">
                <Clock className="h-4 w-4 shrink-0" />
              </div>
              <span>{duration || "3 to 6 months"} duration</span>
            </li>
            <li className="flex items-center gap-3 font-body text-ink-700 text-sm font-medium group">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-100 transition-all shadow-2xs">
                <MapPin className="h-4 w-4 shrink-0" />
              </div>
              <span>{format || "Classroom + Online"}</span>
            </li>
            <li className="flex items-center gap-3 font-body text-ink-700 text-sm font-medium group">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 group-hover:bg-purple-100 transition-all shadow-2xs">
                <ShieldCheck className="h-4 w-4 shrink-0" />
              </div>
              <span>Placement assistance</span>
            </li>
            <li className="flex items-center gap-3 font-body text-ink-700 text-sm font-medium group">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 group-hover:bg-rose-100 transition-all shadow-2xs">
                <Award className="h-4 w-4 shrink-0" />
              </div>
              <span>Digital Ghuru + Industry certifications</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
