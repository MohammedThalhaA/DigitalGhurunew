import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ProgramHighlightsProps {
  usps: string[];
  specialHighlights?: {
    title: string;
    points: string[];
  };
}

export default function ProgramHighlights({ usps, specialHighlights }: ProgramHighlightsProps) {
  if (!usps?.length && !specialHighlights) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Program Highlights</h2>
      
      <div className="space-y-10">
        {/* USPs Grid */}
        {usps && usps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {usps.map((usp, idx) => (
              <div key={idx} className="flex items-center gap-4 p-5 border border-ink-100/60 rounded-2xl bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="h-12 w-12 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-full flex items-center justify-center shrink-0 border border-brand-blue/10">
                  <CheckCircle2 className="h-6 w-6 text-brand-blue" strokeWidth={1.5} />
                </div>
                <span className="font-extrabold text-ink-900 text-base">{usp}</span>
              </div>
            ))}
          </div>
        )}

        {/* Special AI Highlights (if available) */}
        {specialHighlights && specialHighlights.points.length > 0 && (
          <div className="bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] border border-brand-blue/10 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,118,255,0.1)]">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <Sparkles className="h-64 w-64 text-brand-blue" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-ink-900 mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-brand-blue/10 rounded-xl">
                  <Sparkles className="h-6 w-6 text-brand-blue" />
                </div>
                {specialHighlights.title}
              </h3>
              
              <ul className="space-y-5">
                {specialHighlights.points.map((point, idx) => {
                  const [title, desc] = point.split("—").map(p => p.trim());
                  return (
                    <li key={idx} className="flex gap-4 items-start bg-white/60 p-4 rounded-2xl border border-white backdrop-blur-sm">
                      <div className="mt-1 h-2.5 w-2.5 bg-gradient-to-br from-brand-blue to-blue-400 rounded-full shrink-0 shadow-sm"></div>
                      <p className="text-base font-medium text-ink-600 leading-relaxed">
                        {title && desc ? (
                          <>
                            <strong className="text-ink-900 font-extrabold">{title} — </strong>
                            {desc}
                          </>
                        ) : (
                          point
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
