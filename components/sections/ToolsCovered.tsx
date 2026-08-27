"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Megaphone, Palette, Bot } from "lucide-react";

type Category = "all" | "marketing" | "design" | "ai";

interface Tool {
  name: string;
  category: Category;
  description: string;
  iconText: string;
  colorClass: string;
}

const tools: Tool[] = [
  {
    name: "Google Ads",
    category: "marketing",
    description: "Search, display, and video campaigns for instant, intent-driven visibility.",
    iconText: "GA",
    colorClass: "bg-blue-600 text-white",
  },
  {
    name: "Meta Ads Manager",
    category: "marketing",
    description: "Highly targeted Facebook & Instagram campaigns to build engagement.",
    iconText: "MA",
    colorClass: "bg-blue-500 text-white",
  },
  {
    name: "SEMrush",
    category: "marketing",
    description: "Industry-standard SEO audits, keyword research, and competitor analysis.",
    iconText: "SR",
    colorClass: "bg-orange-500 text-white",
  },
  {
    name: "Google Analytics 4",
    category: "marketing",
    description: "Track user behavior, web analytics, conversions, and event triggers.",
    iconText: "G4",
    colorClass: "bg-yellow-500 text-white",
  },
  {
    name: "WordPress",
    category: "design",
    description: "Learn to build professional, optimized websites without complex coding.",
    iconText: "WP",
    colorClass: "bg-slate-700 text-white",
  },
  {
    name: "Canva",
    category: "design",
    description: "Design social media templates, ad banners, and pitch decks.",
    iconText: "CV",
    colorClass: "bg-cyan-500 text-white",
  },
  {
    name: "Mailchimp",
    category: "design",
    description: "Design beautiful email templates and automate customer sequences.",
    iconText: "MC",
    colorClass: "bg-amber-400 text-black",
  },
  {
    name: "Buffer / Hootsuite",
    category: "design",
    description: "Plan, schedule, and optimize social media posts across networks.",
    iconText: "BF",
    colorClass: "bg-black text-white",
  },
  {
    name: "ChatGPT (OpenAI)",
    category: "ai",
    description: "Master prompt engineering for copywriting, strategy planning, and ideation.",
    iconText: "GP",
    colorClass: "bg-emerald-600 text-white",
  },
  {
    name: "Claude (Anthropic)",
    category: "ai",
    description: "Analyze complex market datasets, draft campaign briefs, and structure code.",
    iconText: "CL",
    colorClass: "bg-orange-700 text-white",
  },
  {
    name: "Midjourney",
    category: "ai",
    description: "Generate photorealistic product renders and creative art via text prompts.",
    iconText: "MJ",
    colorClass: "bg-purple-600 text-white",
  },
  {
    name: "Zapier",
    category: "ai",
    description: "Connect apps and build automated AI agents to handle marketing tasks.",
    iconText: "ZP",
    colorClass: "bg-orange-600 text-white",
  },
];

const categories: { key: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All Tools", icon: Globe },
  { key: "marketing", label: "Paid Ads & SEO", icon: Megaphone },
  { key: "design", label: "Design & Content", icon: Palette },
  { key: "ai", label: "AI & Automation", icon: Bot },
];

export default function ToolsCovered() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredTools = tools.filter(
    (tool) => activeCategory === "all" || tool.category === activeCategory
  );

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">TOOLS MASTERY</p>
          <h2 className="heading-lg mb-4 text-ink-900">
            Master 15+ Industry-Leading Tools
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            We don&apos;t just teach theoretical concepts. You will gain hands-on proficiency in the actual tools used by top global agencies.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-ink-50 border-ink-100 text-ink-600 hover:bg-ink-100/50 hover:text-ink-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filterable Tools Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={tool.name}
                className="bg-white rounded-2xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 flex gap-4 items-start"
              >
                {/* Decorative Tool Badge */}
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 font-display font-extrabold text-base tracking-wider ${tool.colorClass}`}
                >
                  {tool.iconText}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-bold text-ink-900">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
