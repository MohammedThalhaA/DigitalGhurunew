"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MonitorPlay, Award, Briefcase, Calendar } from "lucide-react";

const details = [
  {
    icon: Clock,
    title: "Duration",
    subtitle: "4 Months",
    meta: "(16 Weeks)",
    bg: "bg-amber-500/10",
    color: "text-emerald-600",
    border: "border-emerald-200",
  },
  {
    icon: MonitorPlay,
    title: "Format",
    subtitle: "Offline Classes",
    meta: "Weekend Batches",
    bg: "bg-amber-500/10",
    color: "text-amber-600",
    border: "border-amber-200",
  },
  {
    icon: Award,
    title: "Certificates",
    subtitle: "10+ Certificates",
    meta: "Industry recognized",
    bg: "bg-orange-500/10",
    color: "text-orange-600",
    border: "border-orange-200",
  },
  {
    icon: Briefcase,
    title: "Placement",
    subtitle: "100% Assistance",
    meta: "AI-Powered Mock Interviews",
    bg: "bg-pink-500/10",
    color: "text-pink-600",
    border: "border-pink-200",
  },
  {
    icon: Calendar,
    title: "Next Batch",
    subtitle: "5th September",
    meta: "Limited Seats Available!",
    bg: "bg-brand-blue/10",
    color: "text-brand-blue",
    border: "border-blue-200",
  }
];

export default function NextBatchGrid({ course }: { course?: any }) {
  const courseTitle = course?.title || "AI-Powered Digital Marketing Course";

  // Update dynamic details array if needed, otherwise use the existing one
  const displayDetails = [...details];
  if (course?.duration) {
    displayDetails[0].subtitle = course.duration;
    displayDetails[0].meta = ""; // Since we might not know weeks
  }

  return (
    <section className="py-20 relative bg-[#FAFAFA] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 to-[#FAFAFA] -z-10" />
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
        <div className="w-96 h-96 border-[60px] border-dashed border-ink-900 rounded-full -translate-y-1/2 translate-x-1/4" />
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block bg-white border border-amber-100 text-emerald-800 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              {courseTitle}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-ink-900 mb-6 tracking-tight drop-shadow-sm">
            When Does the Next Batch <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Start?</span>
          </h2>
          <p className="text-ink-600 text-base leading-relaxed font-medium">
            Trusted {courseTitle} program with 98% student satisfaction. 100% job-oriented training program with 500+ hiring partners and CTC up to 12.6LPA.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {displayDetails.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="bg-white rounded-3xl p-6 text-center shadow-lg shadow-ink-200/20 border border-white hover:border-ink-100 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              {/* Subtle hover background glow */}
              <div className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className={`mb-5 w-16 h-16 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-8 w-8 ${item.color} stroke-[1.5]`} />
              </div>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 z-10">{item.title}</p>
              <h4 className="text-base font-heading font-black text-ink-900 mb-1 z-10">{item.subtitle}</h4>
              <p className="text-[11px] font-bold text-ink-400 z-10">{item.meta}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
