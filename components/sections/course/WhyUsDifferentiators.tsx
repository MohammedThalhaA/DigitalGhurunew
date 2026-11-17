"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const differentiators = [
  {
    title: "Agency Access",
    desc: "Train inside an active marketing agency. Digital Ghuru Agency manages ₹1+ crore in ad spend for 15+ clients. You learn from live client dashboards and real campaign data, not boring slides."
  },
  {
    title: "AI-first curriculum",
    desc: "Master 3 levels of AI skills: prompt design, generative AI tools, and autonomous AI agents. Build smart systems that create 60+ ad creatives in under 1 minute. Learn practical workflow automations that save hours."
  },
  {
    title: "Practitioner Trainers",
    desc: "Learn directly from agency practitioners, not textbook lecturers. Our mentors run live campaigns daily for e-commerce, real estate, and B2B brands. Gain insights from experts who do the work every single day."
  },
  {
    title: "Proven Expertise",
    desc: "Our mentors have years of experience driving real sales for clients. They work inside Meta and Google ad managers daily so you stay ahead of algorithm updates."
  },
  {
    title: "Digital Ghuru Agency",
    desc: "We manage over ₹1 crore in ad budgets across 15+ clients. Our campaigns have delivered over 5 crore live impressions."
  },
  {
    title: "Verified Google Reviews",
    desc: "Over 150 student reviews with a 4.7-star rating on Google. Our reputation is honest, public, and proven."
  }
];

export default function WhyUsDifferentiators({ course }: { course?: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const courseTitle = course?.title || "AI-Powered Digital Marketing Course";
  const isDM = !course || course.title.includes("Digital Marketing");

  const displayDifferentiators = isDM ? differentiators : [
    {
      title: "Agency Access",
      desc: "Train inside an active agency. Digital Ghuru Agency manages ₹1+ crore in ad spend for 15+ clients. Learn from live dashboards and real data."
    },
    {
      title: "Practitioner Trainers",
      desc: "Learn directly from agency practitioners, not textbook lecturers. Our mentors run live campaigns daily for e-commerce, real estate, and B2B brands. Gain insights from experts who do the work every single day."
    },
    {
      title: "Proven Expertise",
      desc: "Our mentors have years of experience driving real sales for clients. They work inside modern tool interfaces daily so you stay ahead of updates."
    },
    {
      title: "Verified Google Reviews",
      desc: "Over 150 student reviews with a 4.7-star rating on Google. Our reputation is honest, public, and proven."
    }
  ];

  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Sticky Title & Intro) */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 pr-0 lg:pr-8">
              <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight leading-[1.1] mb-8">
                How This {courseTitle} Differs From <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Every Other Option</span>
              </h2>
              
              <div className="space-y-6 text-base text-ink-600 leading-relaxed font-medium">
                {course?.foundersNote ? (
                  <p>{course.foundersNote}</p>
                ) : (
                  <>
                    <p>
                      Every {courseTitle} will tell you they offer "hands-on training." Here is what that actually means at Digital Ghuru:
                    </p>
                    <p>
                      You don't sit in a classroom watching slide decks. You work inside Digital Ghuru Agency, an agency managing ₹1+ crore in monthly ad spend across 15+ active clients. You open live dashboards. You write copy for campaigns that are currently running. When the creative underperforms, you see it in the data, adjust the brief, and relaunch. That is not a simulation. That is a job.
                    </p>
                    <p>
                      Over {course?.duration || "4 months"}, you complete real brand projects. You write the copy, set up the campaigns, analyze performance, and present results to stakeholders. Most students in our classes have a hireable portfolio by month 3, before the program even ends.
                    </p>
                  </>
                )}
                
                {/* Cutout Mentor Image */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 relative w-full h-[350px] lg:h-[450px] flex items-end justify-center pointer-events-none z-10"
                >
                  <Image 
                    src="/resources/Bala Sir.webp"
                    alt="Digital Ghuru Lead Mentor"
                    title="Digital Ghuru Lead Mentor — Bala Sir"
                    width={450}
                    height={450}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover rounded-2xl drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700 pointer-events-auto"
                  />
                </motion.div>

              </div>
            </div>
          </div>

          {/* Right Column (List of Differentiators & Image) */}
          <div className="lg:col-span-7 pt-4">
            <p className="text-lg text-ink-500 font-bold mb-8 uppercase tracking-widest">
              What actually makes us different
            </p>

            <div className="flex flex-col gap-4">
              {displayDifferentiators.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-300 cursor-default ${
                      isHovered 
                        ? "bg-white border-brand-blue/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02]" 
                        : "bg-ink-50/50 border-transparent hover:bg-white"
                    }`}
                  >
                    {/* Glowing Accent */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-12 bg-brand-blue rounded-r-full"
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-xl font-heading font-black mb-3 transition-colors ${isHovered ? "text-brand-blue" : "text-ink-900"}`}>
                          {item.title}
                        </h3>
                        <p className={`leading-relaxed transition-colors ${isHovered ? "text-ink-700" : "text-ink-500"}`}>
                          {item.desc}
                        </p>
                      </div>
                      
                      <div className={`mt-1 shrink-0 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                          <ChevronRight className="w-5 h-5 text-brand-blue" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
