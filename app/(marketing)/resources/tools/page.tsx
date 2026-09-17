"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── SVG LOGOS ───
const Logos = {
  hostinger: () => (
    <img src="https://cdn.simpleicons.org/hostinger/673DE6" alt="Hostinger Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  semrush: () => (
    <img src="https://cdn.simpleicons.org/semrush/FF642D" alt="Semrush Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  canva: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="canva-grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC"/>
          <stop offset="1" stopColor="#7D2AE8"/>
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#canva-grad)"/>
      <path d="M256 128C185.3 128 128 185.3 128 256C128 326.7 185.3 384 256 384C326.7 384 384 326.7 384 256C384 185.3 326.7 128 256 128ZM312.3 293.7C302.2 303.8 288.7 309.3 274.3 309.3H237.7C223.3 309.3 209.8 303.8 199.7 293.7C189.6 283.6 184 270.1 184 255.7C184 241.3 189.6 227.8 199.7 217.7C209.8 207.6 223.3 202 237.7 202H274.3C288.7 202 302.2 207.6 312.3 217.7C322.4 227.8 328 241.3 328 255.7C328 270.1 322.4 283.6 312.3 293.7Z" fill="white"/>
    </svg>
  ),
  chatgpt: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="100" fill="#10A37F"/>
      <path d="M407.5 240.2C409.8 231.2 411 221.9 411 212.5C411 154 363.6 106.6 305.1 106.6C277.8 106.6 252.8 117 233.8 134.1C219.7 114.7 197.1 102 171.7 102C113.2 102 65.8 149.4 65.8 207.9C65.8 213.9 66.3 219.8 67.3 225.5C53.7 241.6 45.4 262.3 45.4 284.7C45.4 343.2 92.8 390.6 151.3 390.6C175.7 390.6 198.3 382.4 216 368.5C230.7 388.8 254.4 402.1 281 402.1C339.5 402.1 386.9 354.7 386.9 296.2C386.9 289.4 386.2 282.7 384.8 276.3C398.8 260.6 407.5 240.2 407.5 240.2ZM281 371.7C262 371.7 244.6 362.3 234 347.8V347.7L233.9 347.5C233.7 347.2 233.5 346.9 233.3 346.5L166 230H200.7L254.6 323.2C256.4 326.3 259.7 328.2 263.3 328.2H353.7C341.2 354.5 313.4 371.7 281 371.7ZM151.3 360.3C121 360.3 96.1 336 96.1 305.7C96.1 285.8 106.7 268 122.9 257.6V257.5L123 257.5L223.1 315.3V252H115.5C118.8 226.7 140.4 207 166.4 207C184.8 207 201 216 210.4 229.7L264.4 323.2L230 343.1L151.3 360.3ZM122.4 165.7C133 180.2 133 180.2 133 180.2V180.2V278.3L233.1 220.5V119.2C226.5 117.8 219.7 117 212.7 117C180.4 117 152.6 134.1 140 160.5L122.4 165.7ZM305.1 137C335.4 137 360.3 161.3 360.3 191.6C360.3 211.5 349.7 229.3 333.5 239.7V239.8L333.4 239.8L233.3 182V245.3H340.9C337.6 270.6 316 290.3 290 290.3C271.6 290.3 255.4 281.3 246 267.6L192 174.1L226.4 154.2L305.1 137ZM363.6 261C363.6 261 363.6 261 363.6 261L363.6 260.9V219L223.3 299.8V401.1C229.9 402.5 236.7 403.3 243.7 403.3C276 403.3 303.8 386.2 316.4 359.8L363.6 261Z" fill="white"/>
    </svg>
  ),
  mailchimp: () => (
    <img src="https://cdn.simpleicons.org/mailchimp/FFE01B" alt="Mailchimp Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  elementor: () => (
    <img src="https://cdn.simpleicons.org/elementor/92003B" alt="Elementor Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
  )
};

// ─── DATA ───
type ToolCategory = "All" | "SEO" | "Hosting & CMS" | "Design" | "Email" | "AI";

interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  howWeUseIt: string[];
  icon: React.ElementType;
  brandColor: string;
}

const TOOLS: Tool[] = [
  {
    id: "hostinger",
    name: "Hostinger",
    category: "Hosting & CMS",
    tagline: "High-performance web hosting",
    description: "The foundation of our web development curriculum. We teach students how to deploy, manage, and optimize lightning-fast websites.",
    howWeUseIt: ["Domain Setup & SSL", "CPanel Management", "WordPress Deployment", "Performance Optimization"],
    icon: Logos.hostinger,
    brandColor: "#673DE6",
  },
  {
    id: "semrush",
    name: "Semrush",
    category: "SEO",
    tagline: "All-in-one SEO suite",
    description: "The industry standard for search engine optimization. Students learn how to dominate search rankings using real-world data and insights.",
    howWeUseIt: ["Keyword Research", "Competitor Analysis", "Technical SEO Audits", "Backlink Strategy"],
    icon: Logos.semrush,
    brandColor: "#FF642D",
  },
  {
    id: "canva",
    name: "Canva Pro",
    category: "Design",
    tagline: "Collaborative design platform",
    description: "Our go-to tool for teaching visual communication. Students master creating engaging social media graphics, presentations, and ad creatives.",
    howWeUseIt: ["Social Media Creatives", "Brand Identity Kits", "Video Ad Production", "Marketing Presentations"],
    icon: Logos.canva,
    brandColor: "#00C4CC",
  },
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    category: "AI",
    tagline: "Advanced AI language model",
    description: "The core of our AI-powered curriculum. We train marketers to use AI for strategy, copywriting, and data analysis to 10x their productivity.",
    howWeUseIt: ["Copywriting & Ideation", "Data Analysis", "Prompt Engineering", "Marketing Automation"],
    icon: Logos.chatgpt,
    brandColor: "#10A37F",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Email",
    tagline: "Marketing automation platform",
    description: "We use Mailchimp to teach the fundamentals of lead nurturing, audience segmentation, and automated email marketing workflows.",
    howWeUseIt: ["Automated Customer Journeys", "A/B Testing Campaigns", "Audience Segmentation", "Performance Analytics"],
    icon: Logos.mailchimp,
    brandColor: "#FFE01B",
  },
  {
    id: "elementor",
    name: "Elementor Pro",
    category: "Hosting & CMS",
    tagline: "Visual WordPress Website Builder",
    description: "Students learn to build pixel-perfect, conversion-optimized landing pages and full websites without writing a single line of code.",
    howWeUseIt: ["Landing Page Design", "Conversion Optimization", "Mobile Responsiveness", "Theme Building"],
    icon: Logos.elementor,
    brandColor: "#92003B",
  },
];

const CATEGORIES: ToolCategory[] = ["All", "SEO", "Hosting & CMS", "Design", "Email", "AI"];

export default function DigitalMarketingToolsPage() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("All");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const filteredTools = TOOLS.filter(
    (tool) => activeCategory === "All" || tool.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight mb-4">
              Our Digital Marketing Tech Stack
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We believe in hands-on, agency-style learning. Explore the industry-standard software and tools you will master during your time at Digital Ghuru.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* ─── SIDEBAR FILTER ─── */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap lg:whitespace-normal text-left ${
                    activeCategory === category
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <ChevronRight className="h-4 w-4 hidden lg:block opacity-60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ─── DIRECTORY LISTING ─── */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 drop-shadow-sm">
                        <tool.icon />
                      </div>
                      <div>
                        <h2 className="text-xl font-heading font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                          {tool.name}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      What you'll learn
                    </h3>
                    
                    <div className="space-y-3 mb-2">
                      {tool.howWeUseIt.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No tools found for this category.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
