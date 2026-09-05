"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const inclusions = [
  "4 months of live training (14 sessions of 3 hours each)",
  "16+ modules covering SEO, SEM, Social Media, Meta Ads, Google Ads, Email Marketing, and AI",
  "10+ industry-recognized certifications (Google, Meta, SEMrush, HubSpot, etc.)",
  "4 real brand projects with live ad budgets",
  "Dual Certification (Digital Marketing + AI Marketing)",
  "100% placement assistance & lifetime access to job updates",
  "Access to our proprietary LMS (Learning Management System) for session recordings",
  "Freelance & Sales Accelerator bonus sessions",
  "Lifetime community access (private Facebook/Discord groups)",
  "Dedicated CAT (Career Advisory Team) for resume building & interview prep"
];

export default function FeesAndInclusions({ course }: { course?: any }) {
  const courseTitle = course?.title || "AI-Powered Digital Marketing Course";
  const coursePrice = course?.discountedPrice && course.discountedPrice !== "Contact Us" ? course.discountedPrice : "₹59,321";

  return (
    <section className="relative z-10">
      {/* Top Section: Fees with Premium Metallic & Gradient styling */}
      <div className="bg-ink-950 relative pt-24 pb-32 lg:pb-40 overflow-hidden text-white">
        {/* Deep premium background glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        {/* Diamond Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }} />
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                {courseTitle} Fees
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-white leading-[1.15] mb-8">
                {courseTitle} Fees: Complete Breakdown
              </h2>
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl mb-8 shadow-2xl relative overflow-hidden group">
                {/* Premium metallic shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <p className="text-base text-ink-200 leading-relaxed mb-4">
                  The fee for this program is:
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <strong className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 drop-shadow-sm">
                    {coursePrice}
                  </strong>
                  <span className="text-ink-400 font-semibold">+ applicable taxes</span>
                </div>
                <p className="text-base text-ink-300 leading-relaxed">
                  That covers everything: {course?.duration || "4 months"} of live agency-style classes, 10+ certifications, real brand projects, 100% placement assistance, lifetime community access, and bonus sessions. <strong className="text-white">No hidden fees. No upsells. No surprise add-ons after enrollment.</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-ink-300 font-semibold bg-white/5 inline-flex p-4 rounded-xl border border-white/10">
                <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
                <span>No-cost EMI is available on select credit cards. Ghuruships are available for eligible students.</span>
              </div>
            </motion.div>

            {/* Absolute positioning for the founder image to break out of the section slightly */}
            <div className="hidden lg:block absolute bottom-0 right-12 w-[450px] h-[550px] z-20 pointer-events-none">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                alt="Our Expert Mentors"
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
            {/* Mobile Image */}
            <div className="block lg:hidden relative h-[400px] w-full max-w-[300px] mx-auto z-20">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                alt="Our Expert Mentors"
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom White Section: Payment & Inclusions */}
      <div className="bg-[#FAFAFA] py-20 lg:py-28 relative border-b border-ink-200">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: EMI */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-blue-100 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
                How payment works?
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-ink-900 mb-6 tracking-tight">
                What Are the EMI and Payment Options for Digital Ghuru?
              </h3>
              <p className="text-base text-ink-600 leading-relaxed mb-8">
                We offer flexible EMI options so the investment fits your budget. No-cost EMI available on select credit cards. Scholarships available for eligible students. Talk to our admissions team for a payment plan that works for you.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-blue-100/60 border border-blue-200 rounded-2xl p-6 text-center hover:bg-blue-100 transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-ink-900 mb-2">30%</div>
                  <div className="text-sm font-medium text-ink-700">Upto 30% Discount</div>
                </div>
                <div className="bg-blue-100/60 border border-blue-200 rounded-2xl p-6 text-center hover:bg-blue-100 transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-ink-900 mb-2">0% Interest</div>
                  <div className="text-sm font-medium text-ink-700">EMI Options</div>
                </div>
                <div className="bg-amber-100/60 border border-amber-200 rounded-2xl p-6 text-center hover:bg-amber-100 transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-ink-900 mb-2">2+</div>
                  <div className="text-sm font-medium text-ink-700">Certificates</div>
                </div>
                <div className="bg-amber-100/60 border border-amber-200 rounded-2xl p-6 text-center hover:bg-amber-100 transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-ink-900 mb-2">4+</div>
                  <div className="text-sm font-medium text-ink-700">EMI Options</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Inclusions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-ink-100"
            >
              <div className="inline-block bg-orange-100 border border-orange-200 text-orange-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
                Is it worth investing?
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-ink-900 mb-8 tracking-tight">
                What is Included in Your Investment
              </h3>
              
              <div className="space-y-4">
                {inclusions.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className="flex items-start gap-3 group"
                  >
                    <div className="bg-brand-blue/10 rounded-full p-1 shrink-0 mt-0.5 group-hover:bg-amber-500 transition-colors duration-300">
                      <CheckCircle2 className="h-4 w-4 text-brand-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-ink-700 font-medium leading-relaxed group-hover:text-ink-900 transition-colors duration-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
