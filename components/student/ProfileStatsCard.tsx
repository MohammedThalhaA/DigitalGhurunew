"use client";

import React from "react";
import Image from "next/image";
import { Zap, Star } from "lucide-react";

interface ProfileStatsCardProps {
  name: string;
  image?: string | null;
  profileCompletion: number;
  dailyStreak: number;
  totalPoints: number;
}

export default function ProfileStatsCard({
  name,
  image,
  profileCompletion,
  dailyStreak,
  totalPoints,
}: ProfileStatsCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-ink-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Profile Section */}
      <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-md border-2 border-white relative z-10 overflow-hidden">
            {image ? (
              <Image src={image} alt={name} width={64} height={64} className="object-cover" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          {/* Level indicator badge */}
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm z-20">
            3
          </div>
          {/* Circular Progress (Fake SVG for visual) */}
          <svg className="absolute -inset-1 w-[72px] h-[72px] -rotate-90 pointer-events-none" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="34" fill="none" stroke="#f1f5f9" strokeWidth="2" />
            <circle 
              cx="36" 
              cy="36" 
              r="34" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="2" 
              strokeDasharray="213" 
              strokeDashoffset={213 - (213 * profileCompletion) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-ink-900 tracking-tight">Hey, {name}</h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-32 h-1.5 bg-ink-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-blue rounded-full" style={{ width: `${profileCompletion}%` }} />
            </div>
            <span className="text-xs font-bold text-ink-400">Profile {profileCompletion}% complete</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-3 w-full md:w-auto relative z-10">
        <div className="flex items-center gap-3 bg-white border border-ink-100 rounded-2xl p-2 pr-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-brand-orange flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white fill-white" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-ink-400 uppercase tracking-wider leading-none mb-1">Daily Streak</p>
            <p className="text-sm font-bold text-ink-900 leading-none">{dailyStreak} Day</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white border border-ink-100 rounded-2xl p-2 pr-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center">
              <Star className="h-3.5 w-3.5 text-white fill-white" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-ink-400 uppercase tracking-wider leading-none mb-1">Total Points</p>
            <p className="text-sm font-bold text-ink-900 leading-none">{totalPoints}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
