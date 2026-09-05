"use client";

import React from "react";
import { motion } from "framer-motion";

const careerTransformations = [
  { student: "Arpit Gupta", before: "Fresher, zero experience", after: "Performance Marketer", package: "Rs 12 LPA" },
  { student: "Dheeraj", before: "Career switcher", after: "Asst. DM Manager", package: "Rs 7.5 LPA" },
  { student: "Rubia Naseem", before: "Working professional", after: "Head of Digital Marketing", package: "Rs 7.2 LPA" },
  { student: "Kavitha", before: "Earning Rs 3.2 LPA", after: "Digital Marketing Manager", package: "Rs 6 LPA (87% hike)" },
  { student: "Prathamesh", before: "Fresher", after: "Product Specialist", package: "Rs 5 LPA" },
  { student: "Bhakti Bhavishi", before: "Homemaker", after: "Automation Specialist", package: "Rs 4.2 LPA+" },
  { student: "Sakshi Jethwani", before: "Homemaker", after: "Assistant Manager", package: "Rs 4.2 LPA" },
  { student: "Sourabh V. Jaiswal", before: "Fresher", after: "Digital Operations Manager", package: "Rs 4.3 LPA" },
  { student: "Divya Vani", before: "Career switcher", after: "PPC Campaign Specialist", package: "Rs 3.6 LPA" },
];

export default function PlacementReportTable({ course }: { course?: any }) {
  const isDM = !course || course.title.includes("Digital Marketing");

  const displayTransformations = careerTransformations.map(row => {
    if (!isDM) {
      return {
        ...row,
        after: row.after.replace(/Digital Marketing/gi, "Domain").replace(/Performance Marketer/gi, "Specialist")
      };
    }
    return row;
  });

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/5 pointer-events-none" />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block bg-white border border-ink-200 text-ink-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            Placement Report
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-black text-ink-900 tracking-tight mb-4 drop-shadow-sm">
            Where Our Graduates Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Now</span>
          </h2>
          <p className="text-ink-600 text-base font-medium">
            1,000+ students placed in agencies, startups, corporates, and remote teams. Every name is verifiable on LinkedIn.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl border border-ink-100 overflow-hidden relative"
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

          <div className="bg-ink-950 py-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-blue/20 rounded-full blur-[60px] opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white relative z-10 tracking-wide">
              Career Transformations: Before and After Digital Ghuru
            </h3>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="bg-ink-900/5 text-ink-500 font-bold py-4 px-6 uppercase tracking-wider text-xs">Student</th>
                  <th className="bg-ink-900/5 text-ink-500 font-bold py-4 px-6 uppercase tracking-wider text-xs">Before Digital Ghuru</th>
                  <th className="bg-ink-900/5 text-ink-500 font-bold py-4 px-6 uppercase tracking-wider text-xs">After Digital Ghuru</th>
                  <th className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 text-emerald-800 font-bold py-4 px-6 uppercase tracking-wider text-xs shadow-inner">Package / Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {displayTransformations.map((row, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className={`group hover:bg-amber-50/50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="py-5 px-6 font-bold text-ink-800 group-hover:text-emerald-900 transition-colors">{row.student}</td>
                    <td className="py-5 px-6 text-ink-600 group-hover:text-ink-800 transition-colors">{row.before}</td>
                    <td className="py-5 px-6 text-ink-900 font-bold group-hover:text-emerald-900 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {row.after}
                    </td>
                    <td className="py-5 px-6 font-black text-emerald-600 bg-amber-50/30 group-hover:bg-emerald-100/50 transition-colors">{row.package}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="text-center text-ink-500 mt-10 max-w-4xl mx-auto text-sm leading-relaxed font-medium">
          Two homemakers (Bhakti and Sakshi) with zero professional experience now hold corporate roles. A career switcher earning Rs 3.2 LPA walked out with a Rs 6 LPA offer. <span className="text-ink-900 font-bold">That is an agency-style training result.</span>
        </p>

      </div>
    </section>
  );
}
