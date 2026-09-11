import React from "react";
import { Wrench } from "lucide-react";

interface BentoToolsProps {
  tools: string[];
}

export default function BentoTools({ tools }: BentoToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-ink-100/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-ink-900 mb-8 flex items-center gap-3">
            <div className="p-3 bg-amber-100/50 rounded-2xl">
              <Wrench className="h-6 w-6 text-amber-600" />
            </div>
            Tools You Will Master
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {tools.map((tool, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 bg-white border border-ink-200/50 px-6 py-4 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_-15px_rgba(0,118,255,0.15)] hover:border-brand-blue/30 hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="h-10 w-10 bg-ink-50 group-hover:bg-brand-blue/10 rounded-xl flex items-center justify-center transition-colors shadow-inner">
                  <span className="text-brand-blue font-black text-lg group-hover:scale-110 transition-transform">#</span>
                </div>
                <span className="font-extrabold text-ink-800 text-lg">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
