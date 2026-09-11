import React from "react";
import { Wrench } from "lucide-react";

interface ToolsMasteredProps {
  tools: string[];
}

export default function ToolsMastered({ tools }: ToolsMasteredProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Tools you will master</h2>
      
      <div className="flex flex-wrap gap-4">
        {tools.map((tool, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 bg-white border border-ink-100/60 px-6 py-3.5 rounded-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-12px_rgba(0,118,255,0.2)] hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
          >
            <div className="bg-ink-50 group-hover:bg-brand-blue/10 p-2 rounded-full transition-colors">
              <Wrench className="h-4 w-4 text-ink-500 group-hover:text-brand-blue transition-colors" strokeWidth={2} />
            </div>
            <span className="font-extrabold text-ink-800 text-base">{tool}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
