"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Award } from "lucide-react";
import Button from "@/components/ui/Button";

const highlights = [
  "Dual Certification (AI-Powered Digital Marketing + AI Systems)",
  "Globally Recognized Industry Credentials",
  "Prep for Google & Meta Blueprint Certifications",
  "Unique verification ID to link on LinkedIn",
  "Endorsed by Top Hiring Agencies & Brands",
];

export default function CertificateSection() {
  return (
    <section className="section-padding bg-ink-50 relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Info (Left Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="eyebrow">CREDENTIALS</p>
            <h2 className="heading-lg text-ink-900">
              Get Certified, Get Recruited
            </h2>
            <p className="body-lg text-ink-500">
              Your Digital Ghuru certificate is more than just paper—it is verified proof of your ability to manage live campaigns, budget scales, and AI-driven growth.
            </p>
            <ul className="space-y-3.5">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-ink-700 font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button variant="primary" size="lg" href="/contact">
                Download Syllabus & Brochure
              </Button>
            </div>
          </motion.div>

          {/* Certificate Mockup (Right Column) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center"
          >
            {/* The Certificate Frame */}
            <div className="relative w-full max-w-2xl aspect-[1.414/1] rounded-2xl border-[12px] border-ink-900 bg-white p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Gold corners / decorative border */}
              <div className="absolute inset-2 border-2 border-brand-gold/40 pointer-events-none rounded-lg" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl" />

              {/* Certificate Top Header */}
              <div className="text-center relative z-10">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-blue flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xs uppercase tracking-[0.25em] text-brand-blue mb-1">
                  Digital Ghuru Institute
                </h3>
                <p className="text-[9px] uppercase tracking-wider text-ink-400 font-semibold">
                  AI Powered Digital Academy & Marketing Hub
                </p>
              </div>

              {/* Certificate Main Text */}
              <div className="text-center my-4 relative z-10">
                <h4 className="font-heading font-normal text-xs italic text-ink-500 mb-2">
                  This is to certify that
                </h4>
                <p className="font-display text-lg md:text-2xl font-extrabold text-ink-900 border-b border-ink-100 pb-2 max-w-sm mx-auto tracking-wide">
                  Your Full Name
                </p>
                <p className="text-[10px] md:text-xs text-ink-500 max-w-md mx-auto leading-relaxed mt-3">
                  has successfully completed the intensive classroom syllabus and practical evaluation for the
                </p>
                <p className="font-heading text-sm md:text-base font-bold text-brand-orange mt-2 uppercase tracking-wide">
                  Advanced AI-Powered Digital Marketing Program
                </p>
                <p className="text-[9px] text-ink-400 mt-2">
                  including Live Campaign Ad Budgets, SEO Strategy, & Automation Architecting.
                </p>
              </div>

              {/* Certificate Footer Signatures */}
              <div className="flex justify-between items-end border-t border-ink-100 pt-4 relative z-10 text-[9px]">
                <div className="text-left space-y-1">
                  <p className="font-mono text-brand-blue font-bold">#DG-2026-9874</p>
                  <p className="text-ink-400 font-semibold uppercase">Credential ID</p>
                </div>

                {/* Badge Seal */}
                <div className="h-12 w-12 rounded-full border-4 border-brand-gold flex items-center justify-center bg-brand-gold/10 rotate-12">
                  <span className="font-display text-[7px] font-black text-brand-orange text-center leading-none">
                    VERIFIED<br />SKILLS
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <p className="font-mono italic font-bold text-ink-800">M. Thalha A.</p>
                  <p className="text-ink-400 font-semibold uppercase">Institute Director</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
