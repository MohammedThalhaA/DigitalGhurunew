"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LinearFAQsProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function LinearFAQs({ faqs }: LinearFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div id="faq" className="py-10">
      
      <h2 className="heading-md text-ink-900 mb-6">Frequently Asked Questions</h2>
      
      <div className="border border-ink-200 rounded-lg bg-white overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-ink-200 last:border-b-0 group">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-ink-50 transition-colors"
              >
                <span className="font-heading text-base font-bold text-ink-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-blue' : 'text-ink-400'}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 font-body text-ink-600 font-medium leading-relaxed">
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
  );
}
