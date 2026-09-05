"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function StatsBanner({ course }: { course?: any }) {
  const isDM = !course || course.title.includes("Digital Marketing");

  return (
    <section className="relative z-20 -mt-16 mb-20 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-8 lg:p-12 relative"
      >
        {/* Glass highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none rounded-[2rem]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-ink-200/50 relative z-10">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 group cursor-default">
            <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2 tracking-tight group-hover:scale-110 transition-transform">
              500+
            </h3>
            <p className="text-xs font-bold text-ink-600 uppercase tracking-widest">
              Students Trained
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center text-center pt-8 sm:pt-0 group cursor-default">
            <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2 tracking-tight group-hover:scale-110 transition-transform">
              100%
            </h3>
            <p className="text-xs font-bold text-ink-600 uppercase tracking-widest">
              Placement Assistance
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center text-center pt-8 lg:pt-0 group cursor-default">
            <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600 mb-2 tracking-tight group-hover:scale-110 transition-transform">
              {isDM ? "1 Crore+" : "15+"}
            </h3>
            <p className="text-xs font-bold text-ink-600 uppercase tracking-widest">
              {isDM ? "Ad Spend Experience" : "Real Brand Projects"}
            </p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-center text-center pt-8 lg:pt-0 group cursor-default">
            <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2 tracking-tight group-hover:scale-110 transition-transform">
              98%
            </h3>
            <p className="text-xs font-bold text-ink-600 uppercase tracking-widest">
              Student Satisfaction
            </p>
          </div>

        </div>

        {/* Floating Badges */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 px-6 py-2 rounded-full flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow cursor-default">
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-amber-900 tracking-wide">4.7/5 (150+ Reviews)</span>
          </div>
          <div className="hidden md:flex bg-gradient-to-r from-purple-100 to-blue-50 border border-orange-200 px-6 py-3 rounded-full items-center shadow-lg hover:shadow-xl transition-shadow cursor-default">
            <span className="text-xs font-extrabold text-orange-900 tracking-wide uppercase">Google & Meta Certified Partner</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
