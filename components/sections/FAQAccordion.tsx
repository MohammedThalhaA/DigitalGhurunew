"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  eyebrow?: string;
  items: FAQItem[];
}

function AccordionItem({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 px-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-base md:text-lg font-semibold text-ink-800 group-hover:text-brand-blue transition-colors duration-200">
          {item.question}
        </span>
        <span className="shrink-0 h-8 w-8 rounded-full bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors duration-200">
          {isOpen ? (
            <Minus className="h-4 w-4 text-brand-blue" />
          ) : (
            <Plus className="h-4 w-4 text-brand-blue" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm md:text-base text-ink-600 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({
  title = "Frequently Asked Questions",
  eyebrow = "FAQ",
  items,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="heading-lg">{title}</h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-ink-100 shadow-card">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
