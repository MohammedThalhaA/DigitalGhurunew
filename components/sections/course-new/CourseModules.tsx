"use client";

import React, { useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";

interface CourseModulesProps {
  curriculum: {
    module: string;
    topics: string[];
  }[];
}

export default function CourseModules({ curriculum }: CourseModulesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Course Content</h2>
      
      <div className="flex justify-between items-end mb-4">
        <span className="text-sm font-bold text-ink-600">
          {curriculum.length} sections • {curriculum.reduce((acc, curr) => acc + curr.topics.length, 0)} lectures
        </span>
        <button 
          onClick={() => setExpandedIndex(expandedIndex !== null ? null : 0)} // simplified expand/collapse all
          className="text-sm font-bold text-brand-blue hover:text-blue-800"
        >
          {expandedIndex !== null ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>

      <div className="border border-ink-200/60 bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
        {curriculum.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="border-b border-ink-100/60 last:border-b-0">
              <button
                onClick={() => toggleAccordion(idx)}
                className={`w-full flex items-center justify-between p-5 md:p-6 transition-all duration-300 text-left ${isExpanded ? 'bg-brand-blue/5' : 'bg-white hover:bg-ink-50/50'}`}
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-brand-blue text-white' : 'bg-ink-100 text-ink-500'}`}>
                     <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <span className="text-lg font-black text-ink-900 tracking-tight">{item.module}</span>
                </div>
                <span className="text-sm font-bold text-ink-500 hidden sm:flex items-center gap-2 bg-ink-50 px-3 py-1 rounded-full">
                  {item.topics.length} lectures
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-0 bg-white border-t border-ink-100/30">
                  {item.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-4 p-4 pl-16 md:pl-[5.5rem] hover:bg-ink-50/30 transition-colors border-b border-ink-100/40 last:border-b-0 group cursor-pointer">
                      <PlayCircle className="h-5 w-5 text-ink-300 group-hover:text-brand-blue shrink-0 mt-0.5 transition-colors" />
                      <span className="text-base font-medium text-ink-700 group-hover:text-ink-900 transition-colors">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
