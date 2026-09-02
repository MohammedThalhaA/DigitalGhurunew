"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonRow {
  feature: string;
  us: boolean;
  others: boolean;
}

interface ComparisonTableProps {
  title?: string;
  eyebrow?: string;
  usLabel?: string;
  othersLabel?: string;
  rows: ComparisonRow[];
}

export default function ComparisonTable({
  title = "Why Choose Digital Ghuru?",
  eyebrow = "COMPARISON",
  usLabel = "Digital Ghuru",
  othersLabel = "Others",
  rows,
}: ComparisonTableProps) {
  return (
    <section className="section-padding bg-ink-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="heading-lg">{title}</h2>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden border border-ink-100"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1fr,120px,120px] bg-ink-900 text-white">
            <div className="px-6 py-4 font-heading font-semibold text-sm">
              Feature
            </div>
            <div className="px-4 py-4 text-center font-heading font-semibold text-sm text-brand-gold">
              {usLabel}
            </div>
            <div className="px-4 py-4 text-center font-heading font-semibold text-sm text-ink-400">
              {othersLabel}
            </div>
          </div>

          {/* Table Rows */}
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-[1fr,120px,120px] items-center ${
                idx % 2 === 0 ? "bg-white" : "bg-ink-50/50"
              } ${idx !== rows.length - 1 ? "border-b border-ink-100" : ""}`}
            >
              <div className="px-6 py-4 text-sm text-ink-700 font-body">
                {row.feature}
              </div>
              <div className="px-4 py-4 flex justify-center">
                {row.us ? (
                  <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="h-7 w-7 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-400" />
                  </div>
                )}
              </div>
              <div className="px-4 py-4 flex justify-center">
                {row.others ? (
                  <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="h-7 w-7 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
