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
    description: "Calculate your Cost Per Click (CPC) quickly. Analyze campaign efficiency and optimize advertising budgets.",
    href: "/tools/cpc-calculator",
    color: "blue",
  },
  {
    icon: Percent,
    title: "ROI Calculator",
    description: "Find out your Return on Investment (ROI) from digital campaigns. Input spend and revenue to see profitability.",
    href: "/tools/roi-calculator",
    color: "orange",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpItem = {
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
        description="Explore our suite of free, interactive marketing tools and calculators designed to help you analyze, optimize, and report on campaigns."
      />

      {/* Grid of Tools */}
      <section className="section-padding bg-white">
        <div className="section-container">
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
                  <p className="text-ink-500 leading-relaxed text-sm md:text-base mb-6">
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
    </>
  );
}
