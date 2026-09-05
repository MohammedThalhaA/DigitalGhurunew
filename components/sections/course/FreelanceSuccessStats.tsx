"use client";

import React from "react";
import { motion } from "framer-motion";

const freelanceSuccess = [
  { name: "Rahul", income: "Rs 1,50,000/month", spec: "Full-stack freelancing", bg: "BBA student who started freelancing during the program" },
  { name: "Karishma", income: "Rs 1,000,000/month", spec: "Full-stack digital marketing", bg: "Zero freelancing experience before joining" },
  { name: "Sneha", income: "Rs 83,000+/month", spec: "Social media management", bg: "YouTube freelancer turned full Social Media Mgr (10 LPA+)" },
  { name: "Mohan Raj", income: "Rs 75,000/month", spec: "International clients", bg: "Built international client base using outreach frameworks" },
  { name: "Priya", income: "Rs 65,000/month", spec: "Digital marketing", bg: "20 years old, started earning while still in college" },
  { name: "Vidhi Tharad", income: "Rs 50,000/month", spec: "International clients", bg: "Used LinkedIn outreach strategies from the program" },
  { name: "Vijay", income: "Rs 40,000/month", spec: "PPC freelancing", bg: "Specialized in Google Ads and Meta Ads management" },
  { name: "Junaid", income: "Rs 30,000/month", spec: "Social media management", bg: "Landed first freelancing client during the program itself" },
];

export default function FreelanceSuccessStats() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Placement Stats Grid */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-4xl font-heading font-black text-ink-900 text-center mb-12 tracking-tight">
            Placement Stats at a Glance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-orange-100 transition-transform">
              <p className="text-orange-900 font-bold">450+ students placed to date across agencies, startups, and corporates</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-blue-100 transition-transform">
              <p className="text-blue-900 font-bold">Average fresher starting salary: Rs 3-5 LPA</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-orange-100 transition-transform">
              <p className="text-orange-900 font-bold">Average career switcher salary: Rs 6-10 LPA</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-500 to-brand-orange rounded-3xl p-8 flex items-center justify-center text-center shadow-lg shadow-orange-900/20 lg:row-span-2 relative overflow-hidden group transition-transform">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              <p className="text-white font-black text-lg relative z-10 leading-tight">Highest verified placement package:<br/><span className="text-3xl text-yellow-300 mt-2 block drop-shadow-md">Rs 7.5 LPA</span></p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-blue-100 transition-transform">
              <p className="text-blue-900 font-bold">Working professionals: 40-80% salary hikes within 3-6 months</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-orange-100 lg:col-span-2 transition-transform">
              <p className="text-orange-900 font-bold text-lg">50+ placement partners nationwide</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-sm border border-orange-100 lg:hidden transition-transform">
              <p className="text-orange-900 font-bold">Placement assistance does not expire after course completion</p>
            </motion.div>
          </div>
        </div>

        {/* Freelance Table */}
        <div>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-black text-ink-900 tracking-tight mb-4">
              Freelancing Success Report
            </h2>
            <p className="text-ink-600 text-base font-medium">
              Some students do not want a 9-to-5. They come here to freelance or build an agency. Here are 8 with verified monthly income:
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl border border-ink-100 overflow-hidden relative"
          >
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="bg-ink-950 text-white font-bold py-5 px-6 uppercase tracking-wider text-xs w-1/4">Freelancer</th>
                    <th className="bg-gradient-to-b from-brand-blue to-blue-700 text-white font-bold py-5 px-6 uppercase tracking-wider text-xs w-1/4 shadow-inner">Monthly Income</th>
                    <th className="bg-ink-950 text-white font-bold py-5 px-6 uppercase tracking-wider text-xs w-1/4">Specialization</th>
                    <th className="bg-ink-950 text-white font-bold py-5 px-6 uppercase tracking-wider text-xs w-1/4">Background</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {freelanceSuccess.map((row, idx) => (
                    <tr key={idx} className={`group hover:bg-blue-50/50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <td className="py-5 px-6 text-ink-900 font-bold group-hover:text-brand-blue transition-colors">{row.name}</td>
                      <td className="py-5 px-6 text-brand-blue font-black bg-blue-50/30 group-hover:bg-blue-100/50 transition-colors">{row.income}</td>
                      <td className="py-5 px-6 text-ink-700 font-medium group-hover:text-ink-900 transition-colors">{row.spec}</td>
                      <td className="py-5 px-6 text-ink-500 text-sm group-hover:text-ink-700 transition-colors">{row.bg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <p className="text-center text-ink-500 mt-10 max-w-4xl mx-auto text-sm leading-relaxed font-medium">
            Combined monthly freelancing income from just these 8 students: <strong className="text-ink-900">Rs 5,93,000/month.</strong> That is over Rs 71 lakhs per year in total freelancing revenue. Rahul hits Rs 1.5 lakhs/month while still in college. Priya started at age 20. Sneha went from YouTube freelancing to earning Rs 10 LPA+ as a Social Media Manager because they had structured digital marketing training before joining Digital Ghuru.
          </p>
        </div>

      </div>
    </section>
  );
}
