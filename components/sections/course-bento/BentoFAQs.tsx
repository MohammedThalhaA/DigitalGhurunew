"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface BentoFAQsProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export default function BentoFAQs({ faqs }: BentoFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-ink-100/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)] relative overflow-hidden">
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-ink-900 mb-8 flex items-center gap-3">
            <div className="p-3 bg-purple-100/50 rounded-2xl">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border border-ink-100/60 bg-ink-50/30 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors ${isOpen ? 'bg-white' : 'hover:bg-white'}`}
                  >
                    <span className="text-lg font-extrabold text-ink-900 pr-8">{faq.question}</span>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${isOpen ? 'bg-brand-blue text-white shadow-brand-blue/20' : 'bg-white border border-ink-200 text-ink-400'}`}>
                       <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out bg-white ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-base text-ink-600 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
