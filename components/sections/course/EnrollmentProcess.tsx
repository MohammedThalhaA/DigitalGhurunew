"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, CreditCard, BookOpen } from "lucide-react";

const steps = [
  {
    title: "Book a Free Counselling Call",
    desc: "Talk to our admissions team about your goals, background, and which batch works for you. No pressure, no sales pitch. Just an honest conversation about whether this program is right for you.",
    icon: PhoneCall,
    color: "from-brand-blue to-blue-500"
  },
  {
    title: "Choose Your Batch and Pay",
    desc: "Select Offline (weekday or weekend), online, or Mumbai. Pay the full amount or set up EMI. Scholarships available for eligible applicants.",
    icon: CreditCard,
    color: "from-yellow-400 to-amber-500"
  },
  {
    title: "Start Your Pre-Work",
    desc: "Before your batch starts, you get access to the Digital Ghuru pre-work: signature products, competitive analysis, brand avatar, audience network, and sales funnel. You come to Day 1 prepared.",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600"
  }
];

export default function EnrollmentProcess() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-50 to-white rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
          {/* Subtle inner top highlight */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
              How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">Enroll</span>
            </h2>
            <p className="text-ink-600 font-medium text-lg">Your journey to becoming an agency-ready marketer takes just 3 simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-100 via-emerald-100 to-purple-100 z-0" />

            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl mb-6 ring-8 ring-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-ink-50 text-ink-500 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    Step {idx + 1}
                  </div>
                  <h3 className="text-xl font-heading font-black text-ink-900 mb-4 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                  <p className="text-ink-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-12 text-center border border-amber-100 shadow-sm"
          >
            <p className="text-amber-900 font-bold text-lg md:text-xl">
              Next batch starts soon. Batches are limited to 30 students for personalized attention. <br className="hidden md:block"/>
              <span className="text-orange-600">Seats fill 2-3 weeks before each batch start date.</span>
            </p>
          </motion.div>

          <div className="text-center">
            <p className="text-ink-600 font-medium text-lg mb-8">
              Ready to start? Call <a href="tel:+919513632705" className="text-brand-blue font-bold hover:underline">+91 95136 32705</a> or book your free counselling session.
            </p>
            <button className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-lg py-5 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl shadow-brand-blue/30 transform hover:-translate-y-1 duration-200">
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
