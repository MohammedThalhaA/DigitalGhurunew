"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumFAQsProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function PremiumFAQs({ faqs }: PremiumFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column - Text & Illustration */}
          <div className="col-span-1 lg:col-span-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center font-black text-[#4f46e5]">06</div>
              <span className="text-sm font-bold text-[#4f46e5] tracking-widest uppercase">Frequently Asked Questions</span>
            </div>
            
            <p className="text-[#52627A] font-medium leading-relaxed mb-12 text-lg max-w-md">
              Find quick answers to the most common questions about this course.
            </p>

            {/* Floating Speech Bubbles Illustration */}
            <div className="relative w-48 h-48">
              <div className="absolute top-0 right-0 bg-[#4f46e5] rounded-3xl rounded-tr-sm p-6 shadow-xl animate-bounce-slow">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-100 rounded-3xl rounded-bl-sm p-5 shadow-lg">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#4f46e5] animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-[#4f46e5] animate-pulse delay-75" />
                  <div className="h-2 w-2 rounded-full bg-[#4f46e5] animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="col-span-1 lg:col-span-7">
            <div className="border-t border-gray-100">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-gray-100 group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-6 text-left"
                    >
                      <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${isOpen ? 'text-[#4f46e5]' : 'text-[#0B1730] group-hover:text-[#4f46e5]'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#4f46e5]' : 'text-[#8793A5]'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 text-[#52627A] font-medium leading-relaxed max-w-3xl">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
