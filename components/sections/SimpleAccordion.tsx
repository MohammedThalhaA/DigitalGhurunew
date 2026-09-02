import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function SimpleAccordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-ink-100 last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 py-4 px-6 text-left group hover:bg-ink-50/50 transition-colors"
            >
              <span className="font-heading text-base md:text-sm font-bold text-ink-800 group-hover:text-brand-blue transition-colors">
                {item.question}
              </span>
              <span className="shrink-0 h-6 w-6 rounded-full bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                {isOpen ? <Minus className="h-3 w-3 text-brand-blue" /> : <Plus className="h-3 w-3 text-brand-blue" />}
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-sm text-ink-600 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
