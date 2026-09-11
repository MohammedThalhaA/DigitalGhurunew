"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CourseFAQsProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export default function CourseFAQs({ faqs }: CourseFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-ink-100/60 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-shadow">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-ink-50/50 transition-colors"
              >
                <span className="text-lg font-extrabold text-ink-900 pr-8">{faq.question}</span>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-brand-blue/10 text-brand-blue' : 'bg-ink-50 text-ink-500'}`}>
                   <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-base text-ink-600 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
