import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, ArrowRight } from "lucide-react";

interface CourseProgressCardProps {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  imageUrl?: string | null;
}

export default function CourseProgressCard({ id, title, subtitle, progress, imageUrl }: CourseProgressCardProps) {
  return (
    <div className="bg-white rounded-[32px] border border-ink-100 hover:border-brand-blue/30 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden h-full">
      
      {/* Thumbnail */}
      <Link href={`/student/courses/${id}`} className="w-full aspect-video relative overflow-hidden bg-gradient-to-br from-brand-blue to-blue-800 shrink-0 group/thumb block border-b border-ink-50">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt={title} fill className="object-cover group-hover/thumb:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-14 w-14 text-white/90 group-hover/thumb:text-white group-hover/thumb:scale-110 transition-all duration-500 drop-shadow-lg" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue to-blue-800">
            <PlayCircle className="h-14 w-14 text-white opacity-80 group-hover/thumb:opacity-100 group-hover/thumb:text-amber-400 group-hover/thumb:scale-110 transition-all duration-500" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col min-w-0 bg-white relative z-10">
        <Link href={`/student/courses/${id}`} className="block mb-6 relative z-10">
          <h3 className="font-display text-base font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">{title}</h3>
          <p className="text-sm font-medium text-ink-500 line-clamp-2 leading-relaxed">{subtitle}</p>
        </Link>
        
        <div className="flex flex-col gap-5 mt-auto">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">Progress</span>
              <span className="font-heading text-xs font-semibold text-amber-500">{progress}%</span>
            </div>
            <div className="w-full bg-ink-100 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-400 to-brand-orange h-full rounded-full transition-all duration-1000 relative" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
              </div>
            </div>
          </div>
          
          <Link href={`/student/learn/${id}`} className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-heading font-semibold transition-all shadow-md hover:shadow-lg uppercase tracking-wide ${
            progress > 0 
              ? "bg-brand-blue text-white hover:bg-blue-800 hover:shadow-brand-blue/30" 
              : "bg-gradient-to-r from-amber-400 to-brand-orange text-white hover:from-amber-500 hover:to-orange-600 hover:shadow-orange-500/30"
          }`}>
            {progress > 0 ? "Continue Learning" : "Start Course"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      
    </div>
  );
}
