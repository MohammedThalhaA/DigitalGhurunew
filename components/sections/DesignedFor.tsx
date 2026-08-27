"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, TrendingUp, Laptop } from "lucide-react";

const targetAudience = [
  {
    icon: GraduationCap,
    title: "Students & Graduates",
    description: "Launch your career in the high-demand digital space. Gain live-project experience, build a stellar resume, and get guaranteed interview opportunities.",
    benefit: "100% Placement Assistance",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "group-hover:border-blue-500/30",
    iconColor: "text-blue-600",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    description: "Upskill to stay ahead of the curve. Transition from traditional roles to high-paying digital roles or accelerate your growth within your current firm.",
    benefit: "Advanced Strategy & AI Integration",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "group-hover:border-emerald-500/30",
    iconColor: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs & Business Owners",
    description: "Stop relying on agencies and scale your business yourself. Master ad networks, optimize budgets, and implement high-converting lead generation funnels.",
    benefit: "Direct ROI & Brand Growth",
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "group-hover:border-amber-500/30",
    iconColor: "text-amber-600",
  },
  {
    icon: Laptop,
    title: "Freelancers & Homemakers",
    description: "Become your own boss. Build a highly profitable side hustle or remote career by managing SEO, content, and social media campaigns for global brands.",
    benefit: "Work from Anywhere, High Retainers",
    gradient: "from-rose-500/10 to-pink-500/10",
    border: "group-hover:border-rose-500/30",
    iconColor: "text-rose-600",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function DesignedFor() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">WHO IS THIS PROGRAM FOR?</p>
          <h2 className="heading-lg mb-4 text-ink-900">
            Tailored For Growth & Diverse Career Paths
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            Whether you are starting from scratch or looking to multiply your current business revenue, DigitalGhuru adapts to your goals.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {targetAudience.map((audience, idx) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={idx}
                variants={cardAnimation}
                className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${audience.border}`}
              >
                {/* Background Gradient Blob on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                  {/* Icon Wrapper */}
                  <div className={`h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${audience.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      {audience.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-50 text-xs font-semibold text-ink-700 border border-ink-100/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                      {audience.benefit}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
