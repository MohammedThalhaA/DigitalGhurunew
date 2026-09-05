"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ComparisonTable({ course }: { course?: any }) {
  const isDM = !course || course.title.includes("Digital Marketing");

  const comparisonData = [
    {
      feature: "Duration",
      digitalGhuru: course?.duration || "4 months",
      fita: isDM ? "60 days" : "Standard",
      besant: isDM ? "30+ hours" : "Standard",
      simplilearn: isDM ? "6-11 months" : "Extended"
    },
    {
      feature: "Fee",
      digitalGhuru: (course?.discountedPrice && course.discountedPrice !== "Contact Us") ? course.discountedPrice : "₹59,321 + taxes",
      fita: isDM ? "Rs 15-25K" : "Varies",
      besant: isDM ? "Rs 12-20K" : "Varies",
      simplilearn: isDM ? "Rs 1-2.5 Lakh" : "Premium"
    },
    {
      feature: "Curriculum Depth",
      digitalGhuru: "In-depth with AI integration",
      fita: "Basic",
      besant: "Basic",
      simplilearn: "Theory heavy"
    },
    {
      feature: "Real Projects",
      digitalGhuru: "Live brand projects",
      fita: "Case studies",
      besant: "Assignments",
      simplilearn: "Capstone only"
    },
    {
      feature: "Agency Backing",
      digitalGhuru: "Digital Ghuru Agency",
      fita: "None",
      besant: "None",
      simplilearn: "None"
    },
    {
      feature: "Google Reviews",
      digitalGhuru: "150+ (4.7 stars)",
      fita: "4,700+ (4.6)",
      besant: "300+ (4.5)",
      simplilearn: "Varies"
    },
    {
      feature: "Placement Support",
      digitalGhuru: "Dedicated CAT team",
      fita: "Generic support",
      besant: "Generic support",
      simplilearn: "Job board access"
    },
    {
      feature: "Trainer Profile",
      digitalGhuru: "Active Practitioners",
      fita: "Industry trainers",
      besant: "Industry trainers",
      simplilearn: "Mixed faculty"
    },
    {
      feature: "Community Access",
      digitalGhuru: "500+ trained",
      fita: "Limited",
      besant: "Limited",
      simplilearn: "Platform-based"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] relative border-b border-ink-200">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-heading font-black text-ink-900 tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-sm">
            How Digital Ghuru <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Compares
            </span> to Other Institutes
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl border border-ink-200 overflow-hidden overflow-x-auto relative"
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

          <table className="w-full text-left border-collapse min-w-[800px] relative z-10">
            <thead>
              <tr>
                <th className="bg-ink-950 text-white font-bold py-6 px-6 text-base w-1/4">Feature</th>
                <th className="bg-gradient-to-b from-[#F97316] to-[#EA580C] text-white font-black py-6 px-6 text-base w-1/4 shadow-inner relative">
                  Digital Ghuru
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-yellow-400" />
                </th>
                <th className="bg-ink-950 text-white font-bold py-6 px-6 text-base w-1/4 border-l border-ink-800">FITA</th>
                <th className="bg-ink-950 text-white font-bold py-6 px-6 text-base w-1/4 border-l border-ink-800">Besant</th>
                <th className="bg-ink-950 text-white font-bold py-6 px-6 text-base w-1/4 border-l border-ink-800">Simplilearn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={`group hover:bg-orange-50/50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="py-5 px-6 font-bold text-ink-900 group-hover:text-orange-900 transition-colors">{row.feature}</td>
                  <td className="py-5 px-6 font-black text-[#EA580C] bg-orange-50/30 group-hover:bg-orange-100/50 transition-colors flex items-center gap-2">
                    {/* Tiny glowing dot indicator */}
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                    {row.digitalGhuru}
                  </td>
                  <td className="py-5 px-6 text-ink-600 group-hover:text-ink-800 transition-colors">{row.fita}</td>
                  <td className="py-5 px-6 text-ink-600 group-hover:text-ink-800 transition-colors">{row.besant}</td>
                  <td className="py-5 px-6 text-ink-600 group-hover:text-ink-800 transition-colors">{row.simplilearn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
