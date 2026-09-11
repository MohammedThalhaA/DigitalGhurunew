import React from "react";
import { CheckCircle2, Target, Trophy, Sparkles } from "lucide-react";

interface BentoGridProps {
  outcomes: string[];
  usps: string[];
  specialHighlights?: {
    title: string;
    points: string[];
  };
}

export default function BentoGrid({ outcomes, usps, specialHighlights }: BentoGridProps) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Large Block - Outcomes */}
        <div className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 border border-ink-100/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:bg-brand-blue/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-ink-900 mb-8 flex items-center gap-3">
              <div className="p-3 bg-brand-blue/10 rounded-2xl">
                <Target className="h-6 w-6 text-brand-blue" />
              </div>
              What you'll master
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-ink-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-ink-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-bold text-ink-700 leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Small Block - USPs */}
        <div className="md:col-span-1 bg-ink-950 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>
            Why this course?
          </h3>

          <ul className="space-y-5 relative z-10 flex-grow flex flex-col justify-center">
            {usps.slice(0, 4).map((usp, idx) => (
              <li key={idx} className="flex items-start gap-4 group">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-blue group-hover:scale-150 transition-transform duration-300" />
                <span className="text-base font-bold text-ink-200 group-hover:text-white transition-colors">{usp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Width Block - Special AI Highlights (if any) */}
        {specialHighlights && specialHighlights.points.length > 0 && (
          <div className="md:col-span-3 bg-gradient-to-r from-brand-blue to-blue-600 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,118,255,0.3)]">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-white/10 skew-x-12 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 p-8 opacity-20 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
              <Sparkles className="h-64 w-64 text-white" />
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">
              <div className="lg:w-1/3">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                  {specialHighlights.title}
                </h3>
                <p className="text-blue-100 font-medium text-lg">
                  Integrate cutting-edge AI tools directly into your marketing workflows.
                </p>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialHighlights.points.map((point, idx) => {
                  const [title, desc] = point.split("—").map(p => p.trim());
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hover:bg-white/20 transition-colors duration-300">
                      <p className="text-sm font-medium text-blue-50 leading-relaxed">
                        {title && desc ? (
                          <>
                            <strong className="text-white font-black block mb-1 text-base">{title}</strong>
                            {desc}
                          </>
                        ) : (
                          point
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
