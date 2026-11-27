"use client";

import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import { Calculator, Percent, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const tools = [
  {
    icon: Calculator,
    title: "CPC Calculator",
    description: "Calculate your cost per click in seconds. See how well your ads perform and keep budgets on track.",
    href: "/tools/cpc-calculator",
    color: "blue",
  },
  {
    icon: Percent,
    title: "ROI Calculator",
    description: "Check your return on investment fast. Enter your ad spend and revenue to see your net profit.",
    href: "/tools/roi-calculator",
    color: "orange",
  },
];

const staggerContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ToolsHubPage() {
  return (
    <>
      <HeroSection
        eyebrow="FREE MARKETING TOOLS"
        title="Boost Your Marketing"
        titleHighlight="Productivity"
        description="Use our free marketing calculators to plan ad budgets, track costs, and measure profit easily."
      />

      {/* Grid of Tools */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <h2 className="heading-lg text-ink-900 mb-8 text-center font-display">Interactive Marketing Calculators & Estimators</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="bg-white rounded-2xl border border-ink-100 p-8 shadow-card hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-200 ${
                    tool.color === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-orange/10 text-brand-orange"
                  }`}>
                    <tool.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900 mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-ink-500 leading-relaxed text-base md:text-lg mb-6">
                    {tool.description}
                  </p>
                </div>

                <Button
                  variant={tool.color === "blue" ? "primary" : "secondary"}
                  href={tool.href}
                  className="w-full flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                >
                  Open Calculator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="section-container max-w-4xl">
          <h3 className="heading-md text-ink-900 mb-6 text-center font-display">Why Use Our Free Marketing Tools?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">Fast Answers</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Get accurate numbers right away. No sign-up or download needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">Better Budgets</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Know where your money goes. Plan your ad spend with confidence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">100% Free</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Use all tools without limits. Built for students, freelancers, and agency teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
