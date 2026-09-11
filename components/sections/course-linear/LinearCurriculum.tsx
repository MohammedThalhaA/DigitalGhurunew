"use client";

import React, { useState } from "react";
import { ChevronDown, PlayCircle, FileText, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LinearCurriculumProps {
  curriculum: {
    module: string;
    topics: string[];
  }[];
}

export default function LinearCurriculum({ curriculum }: LinearCurriculumProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const totalLessons = curriculum.reduce((acc, curr) => acc + curr.topics.length, 0);

  return (
    <div id="curriculum" className="py-10 border-b border-ink-200">
      
      <h2 className="heading-md text-ink-900 mb-2">Course Curriculum</h2>
      
      <div className="flex items-center justify-between mb-6 font-body text-sm font-medium text-ink-500">
        <span>{curriculum.length} sections • {totalLessons} lectures • 20h 30m total length</span>
        <button 
          onClick={() => setExpandedIndex(expandedIndex !== null ? null : 0)}
          className="text-brand-blue font-heading font-bold hover:text-blue-700 transition-colors"
        >
          {expandedIndex !== null ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>
      
      <div className="border border-ink-300 rounded-lg overflow-hidden bg-white">
        {curriculum.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="border-b border-ink-200 last:border-b-0">
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-4 bg-ink-50 hover:bg-ink-100 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <ChevronDown className={`h-5 w-5 text-ink-900 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  <h3 className="font-heading text-base font-bold text-ink-900">
                    Section {idx + 1}: {item.module}
                  </h3>
                </div>
                <span className="font-body text-sm font-medium text-ink-500">
                  {item.topics.length} lectures
                </span>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="px-4 py-2">
                      <div className="space-y-1">
                        {item.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start justify-between p-2.5 hover:bg-blue-50/40 rounded-xl transition-all cursor-pointer group">
                            <div className="flex items-start gap-3">
                              {tIdx % 3 === 0 ? (
                                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110 transition-all shadow-2xs">
                                  <FileText className="h-3.5 w-3.5" />
                                </div>
                              ) : (
                                <div className="p-1.5 rounded-lg bg-blue-50 text-brand-blue group-hover:bg-blue-100 group-hover:scale-110 transition-all shadow-2xs">
                                  <PlayCircle className="h-3.5 w-3.5" />
                                </div>
                              )}
                              <p className="font-body text-sm font-medium text-ink-800 group-hover:text-brand-blue transition-colors line-clamp-1 pt-0.5">{topic}</p>
                            </div>
                            <div className="flex items-center gap-4 pt-1">
                              <span className="font-body text-xs font-medium text-ink-400 group-hover:text-ink-600">{tIdx % 3 === 0 ? '10:00' : '18:45'}</span>
                              {tIdx > 1 && <Lock className="h-3 w-3 text-ink-400 group-hover:text-ink-500" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
