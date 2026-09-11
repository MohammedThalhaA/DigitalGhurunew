"use client";

import React, { useState } from "react";
import { ChevronDown, PlayCircle, BookOpen } from "lucide-react";

interface BentoModulesProps {
  curriculum: {
    module: string;
    topics: string[];
  }[];
}

export default function BentoModules({ curriculum }: BentoModulesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ink-900 mb-2 flex items-center gap-3">
            <div className="p-2.5 bg-ink-100/50 rounded-2xl">
              <BookOpen className="h-6 w-6 text-ink-800" />
            </div>
            Course Curriculum
          </h2>
          <p className="text-ink-500 font-medium text-lg">
            {curriculum.length} comprehensive modules designed for practical mastery.
          </p>
        </div>
        <button 
          onClick={() => setExpandedIndex(expandedIndex !== null ? null : 0)}
          className="text-sm font-bold text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 px-5 py-2.5 rounded-full transition-colors"
        >
          {expandedIndex !== null ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-ink-100/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)] overflow-hidden">
        {curriculum.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="border-b border-ink-100/40 last:border-b-0">
              <button
                onClick={() => toggleAccordion(idx)}
                className={`w-full flex items-center justify-between p-6 md:p-8 transition-all duration-300 text-left ${isExpanded ? 'bg-ink-50/30' : 'bg-white hover:bg-ink-50/50'}`}
              >
                <div className="flex items-center gap-5 md:gap-6">
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm ${isExpanded ? 'bg-brand-blue text-white shadow-brand-blue/20' : 'bg-white border border-ink-200 text-ink-400'}`}>
                     <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-brand-blue tracking-wider uppercase block mb-1">Module {idx + 1}</span>
                    <span className="text-xl font-black text-ink-900 leading-tight">{item.module}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-ink-50 px-4 py-1.5 rounded-full border border-ink-100/50">
                  <span className="text-sm font-bold text-ink-600">{item.topics.length} lectures</span>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-4 md:p-6 pt-0 bg-ink-50/30">
                  <div className="bg-white rounded-2xl border border-ink-100/40 shadow-sm overflow-hidden">
                    {item.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-4 p-5 hover:bg-ink-50/50 transition-colors border-b border-ink-100/40 last:border-b-0 group cursor-default">
                        <div className="h-8 w-8 rounded-full bg-ink-50 flex items-center justify-center shrink-0 group-hover:bg-brand-blue/10 transition-colors">
                          <PlayCircle className="h-4 w-4 text-ink-400 group-hover:text-brand-blue transition-colors" />
                        </div>
                        <span className="text-base font-bold text-ink-700 group-hover:text-ink-900 transition-colors mt-1 leading-relaxed">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
