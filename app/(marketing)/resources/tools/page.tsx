"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── SVG LOGOS ───
const Logos = {
  hostinger: () => (
    <svg viewBox="0 0 500 500" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" rx="100" fill="#673DE6"/>
      <path d="M352.5 158.4L317.3 123.2C314.1 120 309.8 118.2 305.2 118.2C300.6 118.2 296.3 120 293.1 123.2L252.8 163.6L201 111.8C194.3 105.1 183.4 105.1 176.7 111.8L141.5 147C138.3 150.2 136.5 154.5 136.5 159.1C136.5 163.7 138.3 168 141.5 171.2L227.8 257.5L141.5 343.8C138.3 347 136.5 351.3 136.5 355.9C136.5 360.5 138.3 364.8 141.5 368L176.7 403.2C183.4 409.9 194.3 409.9 201 403.2L252.8 351.4L293.1 391.8C296.3 395 300.6 396.8 305.2 396.8C309.8 396.8 314.1 395 317.3 391.8L352.5 356.6C355.7 353.4 357.5 349.1 357.5 344.5C357.5 339.9 355.7 335.6 352.5 332.4L277.8 257.5L352.5 182.6C355.7 179.4 357.5 175.1 357.5 170.5C357.5 165.9 355.7 161.6 352.5 158.4Z" fill="white"/>
    </svg>
  ),
  semrush: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0Z" fill="#FF642D"/>
      <path d="M370.2 165.7H276.9L326.5 289H273.7L226.7 171.6H141.8V346.3H181.9V228.9L228.9 346.3H281.7L331.3 223H370.2V165.7Z" fill="white"/>
    </svg>
  ),
  canva: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  mailchimp: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="100" fill="#FFE01B"/>
      <path d="M375.4 136.6C341.3 102.5 295.9 83.7 247.7 83.7C199.5 83.7 154.1 102.5 120 136.6C51.8 204.8 51.8 315.6 120 383.8C154.1 417.9 199.5 436.7 247.7 436.7C295.9 436.7 341.3 417.9 375.4 383.8C443.6 315.6 443.6 204.8 375.4 136.6ZM247.7 395.4C208.3 395.4 171.4 380 143.5 352.1C88.2 296.8 88.2 206.8 143.5 151.5C171.4 123.6 208.3 108.2 247.7 108.2C287.1 108.2 324 123.6 351.9 151.5C407.2 206.8 407.2 296.8 351.9 352.1C324 380 287.1 395.4 247.7 395.4Z" fill="#241C15"/>
      <path d="M247.7 186.3C210.8 186.3 180.8 216.3 180.8 253.2C180.8 290.1 210.8 320.1 247.7 320.1C284.6 320.1 314.6 290.1 314.6 253.2C314.6 216.3 284.6 186.3 247.7 186.3Z" fill="#241C15"/>
    </svg>
  ),
  chatgpt: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="100" fill="#10A37F"/>
      <path d="M407.5 240.2C409.8 231.2 411 221.9 411 212.5C411 154 363.6 106.6 305.1 106.6C277.8 106.6 252.8 117 233.8 134.1C219.7 114.7 197.1 102 171.7 102C113.2 102 65.8 149.4 65.8 207.9C65.8 213.9 66.3 219.8 67.3 225.5C53.7 241.6 45.4 262.3 45.4 284.7C45.4 343.2 92.8 390.6 151.3 390.6C175.7 390.6 198.3 382.4 216 368.5C230.7 388.8 254.4 402.1 281 402.1C339.5 402.1 386.9 354.7 386.9 296.2C386.9 289.4 386.2 282.7 384.8 276.3C398.8 260.6 407.5 240.2 407.5 240.2ZM281 371.7C262 371.7 244.6 362.3 234 347.8V347.7L233.9 347.5C233.7 347.2 233.5 346.9 233.3 346.5L166 230H200.7L254.6 323.2C256.4 326.3 259.7 328.2 263.3 328.2H353.7C341.2 354.5 313.4 371.7 281 371.7ZM151.3 360.3C121 360.3 96.1 336 96.1 305.7C96.1 285.8 106.7 268 122.9 257.6V257.5L123 257.5L223.1 315.3V252H115.5C118.8 226.7 140.4 207 166.4 207C184.8 207 201 216 210.4 229.7L264.4 323.2L230 343.1L151.3 360.3ZM122.4 165.7C133 180.2 133 180.2 133 180.2V180.2V278.3L233.1 220.5V119.2C226.5 117.8 219.7 117 212.7 117C180.4 117 152.6 134.1 140 160.5L122.4 165.7ZM305.1 137C335.4 137 360.3 161.3 360.3 191.6C360.3 211.5 349.7 229.3 333.5 239.7V239.8L333.4 239.8L233.3 182V245.3H340.9C337.6 270.6 316 290.3 290 290.3C271.6 290.3 255.4 281.3 246 267.6L192 174.1L226.4 154.2L305.1 137ZM363.6 261C363.6 261 363.6 261 363.6 261L363.6 260.9V219L223.3 299.8V401.1C229.9 402.5 236.7 403.3 243.7 403.3C276 403.3 303.8 386.2 316.4 359.8L363.6 261Z" fill="white"/>
    </svg>
  ),
  elementor: () => (
    <svg viewBox="0 0 512 512" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="256" fill="#92003B"/>
      <path d="M236.6 168H168V344H236.6V168Z" fill="white"/>
      <path d="M344 168H264V216.5H344V168Z" fill="white"/>
      <path d="M344 231.7H264V280.2H344V231.7Z" fill="white"/>
      <path d="M344 295.5H264V344H344V295.5Z" fill="white"/>
    </svg>
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
  features: string[];
  deal: string;
  link: string;
  icon: React.ElementType;
  brandColor: string;
  pricing: "Free" | "Freemium" | "Paid" | "Free Trial";
}

const TOOLS: Tool[] = [
  {
    id: "hostinger",
    name: "Hostinger",
    category: "Hosting & CMS",
    tagline: "High-performance web hosting",
    description: "Reliable, lightning-fast web hosting optimized for WordPress. Includes a free domain, SSL, and a custom control panel for easy site management.",
    features: ["Free Domain & SSL", "99.9% Uptime Guarantee", "24/7 Support", "WordPress Optimized"],
    deal: "Up to 75% OFF + Extra 10%",
    link: "#",
    icon: Logos.hostinger,
    brandColor: "#673DE6",
    pricing: "Paid",
  },
  {
    id: "semrush",
    name: "Semrush",
    category: "SEO",
    tagline: "All-in-one SEO and marketing tool",
    description: "The ultimate marketing suite. Conduct deep keyword research, analyze competitor backlinks, track SERP rankings, and run comprehensive site audits.",
    features: ["Keyword Magic Tool", "Competitor Analytics", "Site Audit", "Content Marketing Toolkit"],
    deal: "Exclusive 14-Day Free PRO Trial",
    link: "#",
    icon: Logos.semrush,
    brandColor: "#FF642D",
    pricing: "Free Trial",
  },
  {
    id: "canva",
    name: "Canva Pro",
    category: "Design",
    tagline: "Collaborative design platform",
    description: "Create professional social media graphics, presentations, and videos effortlessly with a massive library of templates and premium assets.",
    features: ["100M+ Premium Stock Assets", "Brand Kit Management", "Background Remover", "Magic Resize"],
    deal: "30-Day Free Pro Trial",
    link: "#",
    icon: Logos.canva,
    brandColor: "#00C4CC", // or #7D2AE8
    pricing: "Freemium",
  },
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    category: "AI",
    tagline: "Advanced AI language model",
    description: "OpenAI's most capable model. Perfect for copywriting, content strategy, complex data analysis, coding assistance, and image generation.",
    features: ["GPT-4 Access", "Advanced Data Analysis", "DALL-E 3 Integration", "Custom GPTs"],
    deal: "Standard Pricing",
    link: "#",
    icon: Logos.chatgpt,
    brandColor: "#10A37F",
    pricing: "Freemium",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Email",
    tagline: "Marketing automation platform",
    description: "Grow your audience and drive revenue with targeted email campaigns, automated customer journeys, and predictive demographic insights.",
    features: ["Visual Journey Builder", "A/B Testing", "Detailed Analytics", "CRM Integrations"],
    deal: "1 Month Free Premium",
    link: "#",
    icon: Logos.mailchimp,
    brandColor: "#FFE01B",
    pricing: "Freemium",
  },
  {
    id: "elementor",
    name: "Elementor Pro",
    category: "Hosting & CMS",
    tagline: "The leading WordPress Website Builder",
    description: "Build pixel-perfect, responsive WordPress websites visually without writing a single line of code. Features a massive library of widgets.",
    features: ["Drag & Drop Editor", "Theme Builder", "WooCommerce Builder", "Popup Builder"],
    deal: "Standard Pricing",
    link: "#",
    icon: Logos.elementor,
    brandColor: "#92003B",
    pricing: "Freemium",
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
              Digital Marketing Tools & Deals
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A curated directory of the industry-standard software we use to scale brands and train professionals. Discover exclusive deals and free trials.
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

                    <div className="space-y-2 mb-8">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / CTA Area */}
                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {tool.pricing}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {tool.deal}
                        </span>
                      </div>
                      
                      <Link 
                        href={tool.link}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-sm group-hover:-translate-y-0.5"
                        style={{ 
                          backgroundColor: hoveredTool === tool.id ? tool.brandColor : '#0F172A',
                        }}
                      >
                        Claim Deal
                        <ExternalLink className="h-4 w-4" />
                      </Link>
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
