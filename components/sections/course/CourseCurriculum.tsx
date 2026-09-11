"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  CheckCircle2,
  BookOpen
} from "lucide-react";
import Image from "next/image";

export default function CourseCurriculum({ course }: { course?: any }) {
  const [activeModule, setActiveModule] = useState<number | null>(0);

  if (!course || !course.curriculum) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden" id="curriculum">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-blue/5 to-purple-500/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-white border border-ink-200 text-ink-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            Curriculum & Tools
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 mb-6 tracking-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">Syllabus</span>
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            Learn exactly what you need to succeed with our structured, industry-aligned modules.
          </p>
        </div>

        {/* Tools Section */}
        {course.tools && course.tools.length > 0 && (
          <div className="mb-20">
            <h3 className="text-sm font-bold text-ink-500 mb-8 text-center uppercase tracking-wider">Tools Covered in this Course</h3>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {course.tools.map((tool: string, idx: number) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    className="bg-white border border-ink-100 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl hover:border-ink-200 transition-all cursor-default min-w-[160px]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                    <span className="font-bold text-ink-900 text-sm">{tool}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Modules Accordion */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Cutout Books Image */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute -left-20 lg:-left-32 -top-10 lg:-top-16 w-40 h-40 lg:w-56 lg:h-56 z-30 pointer-events-none"
          >
            <Image
              src="/resources/curriculum-books.png"
              alt="Curriculum Books"
              fill
              className="object-contain drop-shadow-xl pointer-events-auto"
            />
          </motion.div>

          <div className="bg-white rounded-3xl border border-ink-200 shadow-xl overflow-hidden relative z-20">
            <div className="p-6 md:p-8 border-b border-ink-100 bg-ink-50/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-ink-200 flex items-center justify-center shadow-sm">
                <BookOpen className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-ink-900">Module Breakdown</h3>
                <p className="text-sm text-ink-500 font-medium">{course.curriculum.length} Core Modules</p>
              </div>
            </div>
            
            <div className="divide-y divide-ink-100">
              {course.curriculum.map((module: any, idx: number) => (
                <div key={idx} className="group">
                  <button
                    onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors ${activeModule === idx ? 'bg-brand-blue/5' : 'hover:bg-ink-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-bold w-12 text-center ${activeModule === idx ? 'text-brand-blue' : 'text-ink-400'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-heading font-bold text-lg md:text-xl transition-colors ${activeModule === idx ? 'text-brand-blue' : 'text-ink-900'}`}>
                        {module.module}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-ink-400 transition-transform duration-300 ${activeModule === idx ? 'rotate-180 text-brand-blue' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeModule === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="p-6 md:p-8 pt-0 pl-24 text-ink-700">
                          <ul className="space-y-3">
                            {module.topics.map((topic: string, tIdx: number) => (
                              <li key={tIdx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 mt-2 shrink-0" />
                                <span className="leading-relaxed">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
