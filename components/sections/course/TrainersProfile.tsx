"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Award, Megaphone, TrendingUp, Presentation, Briefcase, Zap } from "lucide-react";

const trainers = [
  {
    name: "Head of Strategy",
    title: "Founder, Digital Ghuru & Digital Ghuru Agency",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    color: "from-brand-blue to-blue-600",
    shadow: "shadow-brand-blue/20",
    points: [
      { icon: Briefcase, text: "10+ years of deep digital marketing experience" },
      { icon: TrendingUp, text: "Founder of Digital Ghuru Agency (₹1+ crore ad spend, 15+ active clients)" },
      { icon: Presentation, text: "Specializes in performance marketing and AI automation" },
      { icon: Award, text: "Proven track record of scaling local businesses and startups" },
      { icon: Zap, text: "Early adopter of AI-driven ad creatives" },
      { icon: Megaphone, text: "Active practitioner managing live accounts daily" },
      { icon: Award, text: "Featured in local business publications for growth hacking" },
      { icon: Briefcase, text: "Direct experience with Meta and Google advanced interfaces" }
    ]
  },
  {
    name: "Head of AI & Growth",
    title: "CEO & Lead Trainer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    color: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/20",
    points: [
      { icon: Briefcase, text: "Co-founder and CEO of Digital Ghuru" },
      { icon: Zap, text: "Architect of our specialized AI-powered marketing curriculum" },
      { icon: TrendingUp, text: "Successfully trained and mentored 500+ students" },
      { icon: Award, text: "Focuses on bridging the gap between theory and execution" },
      { icon: Presentation, text: "Trains teams on advanced Meta Ads and analytics" },
      { icon: Zap, text: "Develops custom AI agents for workflow automation" },
      { icon: Megaphone, text: "Consultant for emerging e-commerce brands" }
    ]
  }
];

export default function TrainersProfile({ course }: { course?: any }) {
  const isDM = !course || course.title.includes("Digital Marketing");

  // Create a localized copy of trainers so we can modify strings safely
  const displayTrainers = trainers.map(trainer => ({
    ...trainer,
    points: trainer.points.map(p => {
      if (!isDM && p.text.includes("digital marketing")) {
        return { ...p, text: p.text.replace("digital marketing", "industry") };
      }
      return p;
    })
  }));

  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block bg-white border border-ink-100 text-brand-blue px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            Learn from the Best
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
            Meet the Trainers Who Deliver This Course Online & Offline
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            Unlike most training institutes where faculty teach from outdated material, every trainer at Digital Ghuru is currently working on live campaigns. Our expert mentors don't just teach {isDM ? "digital marketing" : "the concepts"}. They run it, at <strong className="text-ink-900">₹1+ crore</strong> in annual ad spend through Digital Ghuru Agency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {displayTrainers.map((trainer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-ink-100 shadow-xl relative overflow-hidden group"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 text-center md:text-left">
                  <div className={`w-36 h-36 relative rounded-[2rem] overflow-hidden shadow-2xl ${trainer.shadow} shrink-0 ring-4 ring-white`}>
                    <Image 
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl md:text-3xl font-heading font-black text-ink-900 mb-2">
                      {trainer.name}
                    </h3>
                    <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${trainer.color} text-white text-sm font-bold shadow-md`}>
                      {trainer.title}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-5">
                  {trainer.points.map((point, i) => {
                    const Icon = point.icon;
                    return (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                        className="flex items-start gap-4 group/item hover:bg-ink-50/50 p-2 -mx-2 rounded-xl transition-colors"
                      >
                        <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br ${trainer.color} opacity-10 flex items-center justify-center absolute group-hover/item:opacity-20 transition-opacity`} />
                        <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-xl flex items-center justify-center relative`}>
                          <Icon className="w-4 h-4 text-ink-900 group-hover/item:scale-110 transition-transform" />
                        </div>
                        <span className="text-ink-700 leading-relaxed font-medium group-hover/item:text-ink-900 transition-colors">{point.text}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
