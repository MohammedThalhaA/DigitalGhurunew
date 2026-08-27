"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, Coins, Award } from "lucide-react";

const steps = [
  {
    phase: "Phase 01",
    icon: Users,
    title: "Form Agency Teams",
    description: "Students are grouped into mock agencies of 5-8 members, assigning specific roles like SEO Lead, PPC Specialist, Content Strategist, and Accounts Manager.",
  },
  {
    phase: "Phase 02",
    icon: FileText,
    title: "Receive Real Brand Briefs",
    description: "Work on active marketing briefs from real businesses. Audit competitor presence, define search personas, and create customized channel strategies.",
  },
  {
    phase: "Phase 03",
    icon: Coins,
    title: "Deploy Live Ad Budgets",
    description: "No simulators or mock data. We allocate a real ad budget to each team, allowing you to design, set up, and launch real campaigns on Meta and Google Ads.",
  },
  {
    phase: "Phase 04",
    icon: Award,
    title: "Pitch Performance & Win",
    description: "Present performance dashboards, lead conversion rates, and ROI metrics to an evaluation panel. Add a certified live agency case study to your portfolio.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AgencyModel() {
  return (
    <section className="section-padding bg-ink-50 relative overflow-hidden">
      {/* Decorative dots grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#006FFF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">LEARNING BY DOING</p>
          <h2 className="heading-lg mb-4 text-ink-900">
            Our Agency-Style Training Model
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            Ditch the boring lectures. We prepare you to step directly into agencies by simulating a high-octane agency environment from day one.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[88px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-blue/20 via-brand-orange/20 to-brand-gold/20 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemAnimation}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Wrapper with Phase Badge */}
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-white border border-ink-100 shadow-card flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <Icon className="h-9 w-9 text-brand-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-brand-gold text-ink-900 font-heading text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white">
                    {step.phase}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg font-bold text-ink-900 mb-3 group-hover:text-brand-blue transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
