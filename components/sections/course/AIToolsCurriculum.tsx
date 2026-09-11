"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bot, Sparkles, Wand2, Video, MessageSquare, Briefcase, Image as ImageIcon, Layout, Palette, Search, Megaphone, Share2 } from "lucide-react";

// AI Levels logic remains, but with visual improvements
const aiLevels = [
  {
    level: "Level 1: Prompt Engineering",
    desc: "You learn the CRAFT Framework (Curate, Refine, Audience, Feedback, Track). Not just \"write a prompt and hope for the best.\" You learn to bring external data into prompts, build persona-based systems, and create prompt chains that produce agency-quality output consistently.",
    bg: "bg-gradient-to-br from-[#FFF5F0] to-[#FFE4D6]",
    borderColor: "border-orange-100",
    icon: <MessageSquare className="w-6 h-6 text-orange-500" />
  },
  {
    level: "Level 2: GenAI Tools for Marketing",
    desc: "14+ AI tools with hands-on projects for each. You create AI avatars, generate video content, design at scale, and build automated content pipelines.",
    bg: "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]",
    borderColor: "border-blue-100",
    icon: <Video className="w-6 h-6 text-sky-500" />
  },
  {
    level: "Level 3: AI Agents & Automation",
    desc: "This is where it gets serious. You build autonomous AI agents that do marketing work while you sleep. Build auto-posting systems that research, write, optimize, and publish without human input.",
    bg: "bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF]",
    borderColor: "border-orange-100",
    icon: <Bot className="w-6 h-6 text-purple-500" />
  },
];

// Specific Tools to render visually
const aiToolsList = [
  { name: "ChatGPT", src: "/tools/chatgpt.svg", color: "#10A37F", bg: "bg-[#10A37F]/10" },
  { name: "Claude", src: "/tools/anthropic.svg", color: "#D97757", bg: "bg-[#D97757]/10" },
  { name: "Gemini", src: "https://cdn.simpleicons.org/googlegemini/4285F4", color: "#4285F4", bg: "bg-[#4285F4]/10" },
  { name: "Perplexity", src: "https://cdn.simpleicons.org/perplexity/000000", color: "#000000", bg: "bg-gray-100" },
  { name: "Midjourney", src: "/tools/midjourney.svg", color: "#5865F2", bg: "bg-[#5865F2]/10" },
  { name: "Canva AI", src: "/tools/canva.svg", color: "#00C4CC", bg: "bg-[#00C4CC]/10" },
  { name: "Adobe Firefly", icon: Palette, color: "#FF0000", bg: "bg-[#FF0000]/10" },
  { name: "Runway", icon: Video, color: "#000000", bg: "bg-gray-100" },
  { name: "HeyGen", icon: Briefcase, color: "#8E44AD", bg: "bg-[#8E44AD]/10" },
  { name: "Descript", icon: Wand2, color: "#2E86AB", bg: "bg-[#2E86AB]/10" },
];

const standardToolsList = [
  { name: "Meta Ads", src: "/tools/meta.svg", color: "#0668E1", bg: "bg-[#0668E1]/10" },
  { name: "Google Ads", src: "/tools/google-ads.svg", color: "#F4B400", bg: "bg-[#F4B400]/10" },
  { name: "WordPress", src: "/tools/wordpress.svg", color: "#21759B", bg: "bg-[#21759B]/10" },
];

export default function AIToolsCurriculum() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-blue/5 to-purple-500/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cutout AI Robot Image */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute right-0 top-0 xl:-right-10 w-64 h-64 xl:w-80 xl:h-80 z-30 pointer-events-none"
        >
          <Image
            src="/resources/ai-robot.png"
            alt="AI Robot"
            fill
            className="object-contain drop-shadow-2xl pointer-events-auto"
          />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <div className="inline-block bg-white border border-ink-200 text-ink-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            Tools & Technology
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 mb-6 tracking-tight">
            Master the Industry's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">Most Powerful Tools</span>
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            We don't just teach theory. You'll gain hands-on proficiency in the actual AI, marketing, and design tools used by top global agencies.
          </p>
        </div>

        {/* Visual Tools Grid (The main request from the user) */}
        <div className="mb-20">
          <h3 className="text-xs font-bold text-ink-500 mb-8 text-center uppercase tracking-wider">Core AI & Generative Tools Taught</h3>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {aiToolsList.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                  className="bg-white border border-ink-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl hover:border-ink-200 transition-all cursor-default w-[200px]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tool.bg}`}>
                    {tool.src ? (
                      <img src={tool.src} alt={tool.name} className="w-6 h-6 object-contain" />
                    ) : (
                      Icon && <Icon className="w-6 h-6" style={{ color: tool.color }} />
                    )}
                  </div>
                  <span className="font-bold text-ink-900 text-sm">{tool.name}</span>
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-6">
            {standardToolsList.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: (aiToolsList.length + idx) * 0.05, duration: 0.2 }}
                  className="bg-white border border-ink-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl hover:border-ink-200 transition-all cursor-default w-[200px]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tool.bg}`}>
                    <img src={tool.src} alt={tool.name} className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-bold text-ink-900 text-sm">{tool.name}</span>
                </motion.div>
            ))}
          </div>
        </div>

        {/* 3 Levels of AI Mastery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {aiLevels.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${item.bg} border ${item.borderColor} rounded-[2rem] p-8 lg:p-10 flex flex-col shadow-lg shadow-ink-900/5 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}
            >
              {/* Glassmorphic inner highlight */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
              
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-white/50 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-heading font-black text-ink-900 mb-4 leading-tight">
                {item.level}
              </h3>
              
              <p className="text-ink-700 leading-relaxed text-base flex-grow font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
