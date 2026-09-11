"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlayCircle, FileText, ChevronDown, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumCurriculumProps {
  curriculum: {
    module: string;
    topics: string[];
  }[];
}

export default function PremiumCurriculum({ curriculum }: PremiumCurriculumProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="modules" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Sticky Info Card */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 z-10">
            <div className="bg-[#0a1024] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-[#1476FF]/20">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1476FF]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4f46e5]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-white border border-white/10 backdrop-blur-md">04</div>
                  <span className="text-sm font-bold text-white tracking-widest uppercase">Course Curriculum</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.1] mb-12">
                  Structured learning for real-world results.
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-16 border-t border-b border-white/10 py-8">
                  <div className="text-center">
                    <p className="text-3xl font-black text-white mb-1">12</p>
                    <p className="text-xs font-bold text-[#8793A5] uppercase tracking-wider">Modules</p>
                  </div>
                  <div className="text-center border-l border-r border-white/10">
                    <p className="text-3xl font-black text-white mb-1">48</p>
                    <p className="text-xs font-bold text-[#8793A5] uppercase tracking-wider">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-white mb-1">20+</p>
                    <p className="text-xs font-bold text-[#8793A5] uppercase tracking-wider">Hours</p>
                  </div>
                </div>

                <div className="relative h-24 w-40 opacity-80 mt-10">
                  {/* Handwritten SVG or simple decorative text - using CSS for now */}
                  <div className="text-[#8bafff] font-handwriting text-2xl -rotate-6">Start learning<br/>step by step →</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion & Preview Card */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Accordion List */}
            <div className="col-span-1 xl:col-span-7">
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setExpandedIndex(expandedIndex !== null ? null : 0)}
                  className="text-sm font-bold text-[#4f46e5] hover:text-[#4338ca] transition-colors"
                >
                  {expandedIndex !== null ? "Collapse all" : "Expand all"}
                </button>
              </div>

              <div className="space-y-4">
                {curriculum.map((item, idx) => {
                  const isExpanded = expandedIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`rounded-2xl transition-all duration-300 ${isExpanded ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#1476FF]/20' : 'bg-[#F6F8FC] border border-transparent hover:border-gray-200'}`}
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 shrink-0 ${isExpanded ? 'border-[#4f46e5] bg-[#4f46e5]/10' : 'border-gray-300 bg-white'}`}>
                            <div className={`h-3 w-3 rounded-full ${isExpanded ? 'bg-[#4f46e5]' : 'bg-transparent'}`} />
                          </div>
                          <div>
                            <h3 className={`text-base md:text-lg font-bold ${isExpanded ? 'text-[#0B1730]' : 'text-[#52627A]'}`}>
                              Module {idx + 1}: {item.module}
                            </h3>
                            <p className="text-xs font-semibold text-[#8793A5] mt-1">{item.topics.length} lessons • ~2h 10m</p>
                          </div>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-[#8793A5] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-2 pl-16">
                              <div className="space-y-3">
                                {item.topics.map((topic, tIdx) => (
                                  <div key={tIdx} className="group flex items-start justify-between p-3 rounded-xl hover:bg-[#F6F8FC] transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                                    <div className="flex items-start gap-3">
                                      <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-[#4f46e5]/30">
                                        {tIdx % 3 === 0 ? <FileText className="h-4 w-4 text-[#8793A5] group-hover:text-[#4f46e5]" /> : <PlayCircle className="h-4 w-4 text-[#8793A5] group-hover:text-[#4f46e5]" />}
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-[#0B1730] leading-tight">{topic}</p>
                                        <p className="text-xs font-medium text-[#8793A5] mt-1">{tIdx % 3 === 0 ? 'Article • 10m' : 'Video • 18m'}</p>
                                      </div>
                                    </div>
                                    {tIdx === 0 ? (
                                      <CheckCircle2 className="h-5 w-5 text-[#19B47A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                      <Lock className="h-4 w-4 text-[#8793A5] opacity-50" />
                                    )}
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

            {/* Preview Course Promo Box */}
            <div className="col-span-1 xl:col-span-5 h-fit sticky top-32">
              <div className="bg-[#5E4DFF] rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl border border-[#4d3ecc]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <PlayCircle className="h-6 w-6 text-white/80" />
                  <span className="text-sm font-bold text-white/80 tracking-wide uppercase">Preview this course</span>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4 relative z-10 leading-tight">
                  Your Future in Digital Marketing Starts Here
                </h3>
                
                <p className="text-indigo-100 font-medium text-sm mb-8 relative z-10">
                  Join 10,000+ learners and get industry-ready with Digital Ghuru.
                </p>
                
                <button className="w-full py-4 bg-white text-[#5E4DFF] rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.3)] mt-2 mb-6 relative z-10 hover:bg-gray-50">
                  Enroll Now <ArrowRight className="h-5 w-5" />
                </button>

                <div className="relative mt-auto h-40 w-full rounded-xl overflow-hidden border border-white/20 shadow-inner z-10">
                   <Image 
                     src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" 
                     alt="Course Preview Thumbnail" 
                     fill 
                     className="object-cover opacity-60 mix-blend-overlay"
                   />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
