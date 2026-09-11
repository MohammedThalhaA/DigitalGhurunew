"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Building2, Presentation, ShieldCheck } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    step: "Step 1",
    title: "Profile Building (Month 3)",
    desc: "Your CAT advisor helps you build a LinkedIn profile that actually gets recruiter attention. Resume optimization, portfolio creation from your 4 brand projects, and interview preparation.",
    icon: UserPlus,
    color: "from-brand-blue to-blue-500",
    bg: "bg-blue-50"
  },
  {
    step: "Step 2",
    title: "Company Matching",
    desc: "We match you with companies based on your skills, location preference, and salary expectations. Digital Ghuru has relationships with 50+ placement partners across Our Campus, Bangalore, Mumbai, and remote.",
    icon: Building2,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50"
  },
  {
    step: "Step 3",
    title: "Interview Prep",
    desc: "Mock interviews, technical round preparation, salary negotiation coaching. We have seen students increase their offered package by 15-20% through proper negotiation.",
    icon: Presentation,
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50"
  },
  {
    step: "Step 4",
    title: "Ongoing Support",
    desc: "Placement assistance does not expire. If you need help 6 months or a year after completing the course, the CAT team is still available. 450+ students placed and counting.",
    icon: ShieldCheck,
    color: "from-orange-400 to-amber-500",
    bg: "bg-orange-50"
  }
];

export default function PlacementProcess() {
  return (
    <section className="py-20 lg:py-32 relative bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--tw-colors-ink-100) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-brand-blue/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block bg-white border border-ink-100 text-brand-blue px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm uppercase">
            100% Placement Assistance
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
            How Our Placement Process <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">Works</span>
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            Four full-time staff. One job. Get you hired. We do not run a job board. We coach you. We match you with companies. We prep you for interviews. We negotiate your salary.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white border border-ink-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all relative overflow-hidden group"
              >
                {/* Number Watermark */}
                <span className="absolute -top-4 -right-2 text-[100px] font-heading font-black text-ink-50 opacity-50 select-none group-hover:scale-110 group-hover:-translate-y-4 transition-transform duration-500">
                  {idx + 1}
                </span>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-ink-400 uppercase tracking-widest mb-2">{item.step}</h4>
                  <h3 className="text-xl font-heading font-black text-ink-900 mb-4 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                  <p className="text-ink-600 leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="relative max-w-4xl mx-auto mt-20 lg:mt-32">
          {/* Cutout Placement Image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block absolute -left-12 lg:-left-24 bottom-0 w-64 h-80 lg:w-80 lg:h-96 z-30 pointer-events-none"
          >
            <Image
              src="/resources/placement-success.png"
              alt="Placement Success"
              fill
              className="object-contain object-bottom drop-shadow-2xl pointer-events-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-ink-950 to-ink-900 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-blue/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="md:pl-48 lg:pl-56">
              <p className="text-white leading-relaxed text-lg font-medium relative z-10 text-left">
                Our placement record: Average starting salary for freshers is <span className="text-yellow-500 font-bold">Rs 3-6 LPA</span>. Career switchers average <span className="text-amber-400 font-bold">Rs 6-10 LPA</span>. Highest placement: <span className="text-orange-400 font-bold">Rs 12+ LPA</span>. The track record speaks for itself.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
