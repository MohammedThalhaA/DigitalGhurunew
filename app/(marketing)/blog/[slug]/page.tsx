"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, PhoneCall, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

/* ─── Mock Blog Post Data Store ─── */
interface BlogPost {
  title: string;
  excerpt: string;
  coverUrl: string;
  date: string;
  readTime: string;
  author: string;
  authorTitle?: string;
  content: string[];
  category: string;
}

const blogPostsMap: Record<string, BlogPost> = {
  "complete-guide-digital-marketing-2024": {
    title: "The Complete Guide to Digital Marketing in 2024",
    excerpt: "Everything you need to know about digital marketing — from SEO and content marketing to paid advertising and social media strategy.",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
    date: "August 15, 2024",
    readTime: "12 min read",
    author: "Rishi Jain",
    authorTitle: "Co-Founder of Digital Ghuru",
    category: "Guides",
    content: [
      "Digital marketing is changing faster than ever. In 2024, search engine algorithm updates, the integration of artificial intelligence (AI), and changing consumer preferences are reshaping how brands communicate with their audiences.",
      "To succeed this year, you need a holistic marketing strategy that integrates multiple channels seamlessly. In this guide, we will break down the essential components of a modern digital marketing campaign.",
      "Search Engine Optimization (SEO) remains the backbone of organic discovery. High-quality, original content written for humans (not just search engines) is vital. Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) guidelines are more critical than ever.",
      "Social media has moved beyond simple posting. Platforms like TikTok, Instagram, and LinkedIn require native, engaging vertical video content. Engaging your community through comments, direct messages, and interactive features is key to building brand loyalty.",
      "Paid Ads (Google Search, Meta, and LinkedIn) require precise targeting and compelling creative copy. Incorporating AI automation and personalization tools can significantly improve your Return on Ad Spend (ROAS).",
    ],
  },
  "ai-transforming-digital-marketing": {
    title: "How AI is Transforming Digital Marketing",
    excerpt: "Explore the revolutionary impact of artificial intelligence on marketing strategies, from content generation to predictive analytics.",
    coverUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    date: "August 10, 2024",
    readTime: "8 min read",
    author: "Rishi Jain",
    authorTitle: "Co-Founder of Digital Ghuru",
    category: "Artificial Intelligence",
    content: [
      "Artificial Intelligence (AI) is no longer a futuristic concept — it is actively reshaping the marketing industry today. Marketers who learn to leverage AI are seeing massive improvements in productivity, creativity, and campaign results.",
      "From writing copy with ChatGPT to generating visual assets with Midjourney, generative AI tools are speeding up the content creation process. However, the human element of strategic oversight, branding consistency, and editing remains essential.",
      "Beyond content generation, AI is revolutionizing data analytics and decision-making. Predictive analytics algorithms can analyze vast customer datasets to forecast future buying patterns, optimize pricing, and target ads to users most likely to convert.",
      "Smart chatbots and conversational AI are providing 24/7 customer service, guiding leads through the marketing funnel, and answering common queries instantly. This frees up human agents to handle complex customer challenges.",
    ],
  },
  "seo-strategies-2024": {
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Forget outdated tactics. These proven SEO strategies will help you rank higher, drive more traffic, and outperform your competitors.",
    coverUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop",
    date: "August 5, 2024",
    readTime: "10 min read",
    author: "Rishi Jain",
    authorTitle: "Co-Founder of Digital Ghuru",
    category: "SEO",
    content: [
      "Is SEO dead? Absolutely not. But the old strategies of keyword stuffing, spam link-building, and thin content are definitely obsolete. Today's search engines are incredibly smart.",
      "To rank in 2024, you need to understand Search Intent. Every search query has a specific goal: informational, transactional, navigational, or commercial. Your content must answer that query directly and thoroughly.",
      "User Experience (UX) signals like page load speed (Core Web Vitals), mobile responsiveness, and clean navigation are direct ranking factors. If users land on your site and bounce immediately due to poor design, your rankings will drop.",
      "Focus on topical authority. Instead of writing isolated blog posts, build content clusters. Write a comprehensive pillar page about a main topic, then write supporting articles that link back to the pillar. This shows search engines that you are an authority in that space.",
    ],
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsMap[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-black mb-4">Post Not Found</h1>
          <p className="text-ink-500 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Button variant="primary" href="/blog">Back to Blog</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = Object.entries(blogPostsMap).filter(([key]) => key !== slug).slice(0, 2);

  return (
    <div className="bg-ink-50 min-h-screen relative pb-32 overflow-hidden">
      {/* ─── AMBIENT MESH BACKGROUND ─── */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[600px] overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      </div>

      {/* ─── CONTENT WRAPPER ─── */}
      <div className="relative z-10">
        
        {/* Navigation & Header */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-blue transition-colors mb-10 group">
              <div className="h-8 w-8 rounded-full bg-white border border-ink-200 flex items-center justify-center group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Back to Blog
            </Link>
          </motion.div>

          <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-ink-900 tracking-tight leading-[1.15] mb-8">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Hero Image Wrapper */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="aspect-[21/9] md:aspect-[2.5/1] rounded-[2rem] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white relative group"
          >
            <div className="absolute inset-0 bg-ink-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>

        {/* ─── 2-COLUMN LAYOUT ─── */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start justify-between">
            
            {/* LEFT SIDEBAR: Advertising Pamphlet (Glassmorphic) */}
            <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-32 order-2 lg:order-1 mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-ink-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-ink-800"
              >
                {/* Pamphlet Image Header */}
                <div className="h-56 w-full relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop" 
                    alt="Graduates" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-5 right-5 bg-gradient-to-br from-brand-gold to-yellow-500 text-ink-950 font-black px-4 py-2 rounded-xl shadow-lg transform rotate-2 group-hover:rotate-6 transition-transform duration-300">
                    <div className="text-[10px] leading-none uppercase tracking-widest mb-1 opacity-90">Flat</div>
                    <div className="text-2xl leading-none">20% OFF</div>
                  </div>
                </div>

                {/* Pamphlet Content */}
                <div className="px-8 pb-10 text-center relative z-10 -mt-8">
                  <h3 className="text-brand-gold font-heading font-black text-[28px] uppercase leading-[1.1] mb-3 tracking-tight drop-shadow-md">
                    Become An <br/>
                    <span className="text-4xl text-white">AI-Powered</span> <br/>
                    Digital Marketer
                  </h3>
                  
                  <div className="inline-block bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                    Premium Online Course
                  </div>

                  <div className="space-y-4 text-left mb-8">
                    {[
                      "Live + Recorded Online Sessions",
                      "Learn 20+ Tools & AI Frameworks",
                      "Dual Certification",
                      "Guaranteed Job Assistance",
                      "Train with ₹300 Cr+ Ad Spend Experts"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                        <div className="h-6 w-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                          <ArrowRight className="h-3 w-3 text-brand-gold" />
                        </div>
                        <span className="text-sm text-white/90 leading-tight font-medium pt-0.5">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/courses" className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-yellow-400 text-ink-950 font-bold py-4 rounded-2xl uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(254,220,50,0.2)] hover:shadow-[0_0_40px_rgba(254,220,50,0.4)] hover:-translate-y-1">
                    Apply Now <ChevronRight className="h-5 w-5" />
                  </Link>
                  <div className="mt-5 text-xs text-brand-gold/80 font-semibold tracking-wide">
                    ⏳ ONLY 7 SEATS LEFT AT OFFER PRICE
                  </div>
                </div>
                
                {/* Ambient glow in pamphlet */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-blue/20 blur-[60px] pointer-events-none rounded-full" />
              </motion.div>
            </aside>

            {/* RIGHT CONTENT AREA: Blog Post */}
            <article className="w-full flex-1 min-w-0 order-1 lg:order-2">
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                {/* Glassmorphic Table of Contents */}
                <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10 mb-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-[40px]" />
                  <h3 className="font-heading font-black text-ink-900 text-2xl mb-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    </div>
                    Table of Contents
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {post.content.map((_, idx) => (
                      <li key={idx} className="flex items-center gap-4 group">
                        <span className="text-brand-blue/30 font-display font-black text-xl group-hover:text-brand-blue/60 transition-colors">0{idx + 1}</span>
                        <div className="h-px flex-1 bg-ink-200/50 group-hover:bg-brand-blue/20 transition-colors" />
                        <a href={`#section-${idx}`} className="font-medium text-ink-700 hover:text-brand-blue transition-colors">
                          {idx === 0 ? "Introduction to the changing landscape" :
                           idx === 1 ? "Building a holistic strategy" :
                           idx === 2 ? "The evolution of SEO and E-E-A-T" :
                           idx === 3 ? "Social media and community engagement" :
                           "Advanced Paid Ads & Automation"}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Editorial Byline */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-12 w-12 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-ink-500 text-sm font-medium mb-1 flex items-center gap-3">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-ink-300" />
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                    </div>
                    <div className="text-ink-900 font-bold">
                      Written by {post.author}, <span className="font-normal text-ink-600">{post.authorTitle || "Digital Marketing Expert"}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="prose prose-lg prose-ink max-w-none prose-headings:font-heading prose-headings:font-black prose-p:leading-[1.9] prose-p:text-ink-700">
                  <p className="text-2xl text-ink-900 leading-relaxed font-medium mb-12 p-8 bg-white rounded-3xl border border-ink-100 shadow-sm">
                    {post.excerpt}
                  </p>
                  
                  {post.content.map((paragraph, index) => (
                    <div key={index} id={`section-${index}`} className="mb-10 scroll-mt-32">
                      <h2 className="text-2xl font-bold text-ink-900 mb-4 flex items-center gap-3">
                        <span className="text-brand-blue">#</span>
                        {index === 0 ? "Introduction" :
                         index === 1 ? "Holistic Strategy" :
                         index === 2 ? "SEO & E-E-A-T" :
                         index === 3 ? "Social Media" :
                         "Paid Ads & Automation"}
                      </h2>
                      <p className="text-lg">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </article>
          </div>
        </div>

        {/* ─── RELATED POSTS ─── */}
        {relatedPosts.length > 0 && (
          <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-ink-200/50">
            <h2 className="text-3xl font-heading font-black text-ink-900 mb-10 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map(([key, related]) => (
                <Link
                  key={key}
                  href={`/blog/${key}`}
                  className="group block bg-white rounded-3xl border border-ink-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-400 overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={related.coverUrl}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3 block">
                      {related.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}

