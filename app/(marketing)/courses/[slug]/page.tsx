"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Check,
  PlayCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Bot,
  Palette
} from "lucide-react";
import { SiWordpress, SiGoogle, SiMeta, SiZapier } from "react-icons/si";
import FAQAccordion from "@/components/sections/FAQAccordion";
import SimpleAccordion from "@/components/sections/SimpleAccordion";
import Button from "@/components/ui/Button";
import { useCourseGate } from "@/components/shared/useCourseGate";

/* ─── Extended Course Data Structure ─── */
interface CourseData {
  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  format: string;
  duration: string;
  batchInfo: string;
  location: string;
  originalPrice: string;
  discountedPrice: string;
  usps: string[];
  foundersNote?: string;
  visionMission?: { vision: string; mission: string };
  courseGoals?: string[];
  industryTrends?: { title: string; desc: string }[];
  whoIsThisFor?: { role: string; desc: string; points: string[] }[];
  specialHighlights?: { title: string; points: string[] };
  curriculum: { module: string; topics: string[] }[];
  practicalExperience?: string[];
  placementSupport?: string[];
  careerOpportunities?: string[];
  certifications?: string[];
  outcomes: string[];
  tools: string[];
  faqs?: { question: string; answer: string }[];
}

const courseMap: Record<string, CourseData> = {
  "ai-powered-digital-marketing": {
    title: "AI-Powered Digital Marketing Course",
    subtitle: "The New Digital Marketing + AI Course",
    tagline: "The New Digital Marketing + AI Course",
    description: "Digital marketing combined with AI is rapidly transforming how businesses grow and compete. Learn to build strong marketing foundations, leverage AI for faster execution, and create high-performing campaigns.",
    format: "Classroom + Online",
    duration: "3 to 6 Months",
    batchInfo: "New Batches Starting Soon | 12 Modules",
    location: "Anna Nagar | Nungambakkam | Korattur | Hyderabad",
    originalPrice: "—",
    discountedPrice: "Contact Us",
    usps: [
      "Personal Mentorship",
      "Practical Learning Approach",
      "Updated Curriculum with AI",
      "Hands-On Experience",
      "Portfolio Building",
      "Freelancing & Earning Support"
    ],
    foundersNote: "Digital marketing has evolved from a supporting skill into a core business necessity. At Digital Ghuru, we believe that the future belongs to those who can create, communicate, and convert effectively in the digital world. Today, businesses are investing more than ever in digital platforms, and the demand for skilled digital marketers continues to grow rapidly. With the rise of AI tools like ChatGPT and Midjourney, marketing is no longer just about creativity — it's about speed, automation, and smart decision-making. We ensure our students don't just learn — they practice, implement, and achieve real results.",
    visionMission: {
      mission: "To empower individuals with practical digital marketing and AI skills that help them build careers, businesses, and income streams.",
      vision: "To become a leading digital marketing training institute that creates skilled marketers, freelancers, and entrepreneurs ready for the AI-driven future."
    },
    whoIsThisFor: [
      { role: "Students", desc: "A complete beginner-friendly program to kickstart your digital marketing career.", points: ["Gain practical, job-ready skills", "Work on real-time projects", "Prepare for interviews"] },
      { role: "Freelancers", desc: "A growth-oriented program to help you scale your freelancing career.", points: ["Expand service offerings", "Attract high-paying clients globally", "Build consistent income stream"] },
      { role: "Entrepreneurs", desc: "An all-inclusive program designed to empower your entrepreneurial journey.", points: ["Build strong online presence", "Generate quality leads & sales", "Stay ahead using AI strategies"] },
      { role: "Professionals", desc: "A career-focused program to help you upgrade your skills and grow.", points: ["Learn in-demand digital & AI skills", "Transition into high-growth roles", "Enhance salary potential"] }
    ],
    specialHighlights: {
      title: "AI Learning Modules & Specializations",
      points: [
        "AI-Based Content Automation — Create blogs, ads, captions, and scripts instantly using AI tools, reducing manual effort and saving time.",
        "Chatbot & Conversational Marketing — Build smart chatbots to automate customer interactions, lead generation, and support across platforms.",
        "AI-Powered Ad Optimization — Analyze campaign performance and optimize ads using AI insights to improve targeting, conversions, and ROI.",
        "AI Video & Creative Generation — Generate high-quality videos, visuals, and creatives using tools like Canva and AI video platforms.",
        "Data-Driven Decision Making — Use AI analytics tools to track user behavior, measure performance, and make smarter marketing decisions.",
        "Personalization & Customer Targeting — Deliver personalized content and offers based on user data to increase engagement and conversions.",
        "Marketing Automation with AI — Automate emails, WhatsApp messages, and workflows to improve efficiency and customer engagement."
      ]
    },
    practicalExperience: [
      "Real-Time Project Exposure: Gain hands-on experience with practical, industry-focused learning for students.",
      "Case Studies: Analyze case studies to understand real-world business challenges and solutions clearly.",
      "Live Campaigns: Execute live campaigns to gain hands-on digital marketing and strategy skills.",
      "Portfolio Creation: Build a strong portfolio showcasing projects, creativity, and measurable results."
    ],
    placementSupport: [
      "01. Internship opportunities",
      "02. Resume building",
      "03. Interview preparation",
      "04. Job assistance"
    ],
    careerOpportunities: [
      "Digital Marketing Executive",
      "SEO Specialist",
      "Social Media Manager",
      "Content Strategist",
      "Performance Marketer",
      "Freelancer / Entrepreneur"
    ],
    certifications: [
      "Digital Ghuru Certification",
      "Industry-recognized certifications (Google, Meta, and other leading platforms)"
    ],
    curriculum: [
      { module: "Module 1: Audience Research", topics: ["Understand the digital ecosystem and customer journey.", "Learn core marketing concepts and strategies.", "Identify target audience and business goals.", "Build a strong foundation in digital marketing."] },
      { module: "Module 2: AI Content Mastery", topics: ["Learn prompt engineering for content creation.", "Generate high-quality text, images, and videos using AI.", "Automate content creation for faster execution.", "Use tools like ChatGPT and Midjourney."] },
      { module: "Module 3: Social Media Marketing", topics: ["Plan and create engaging content strategies.", "Increase followers and audience engagement.", "Understand platform-specific growth techniques.", "Manage social media pages effectively."] },
      { module: "Module 4: Instagram Marketing", topics: ["Master Instagram algorithm and trends.", "Create high-performing reels and posts.", "Implement influencer marketing strategies.", "Optimize profile for better reach and engagement."] },
      { module: "Module 5: LinkedIn Marketing", topics: ["Build a strong personal brand.", "Generate B2B leads and connections.", "Create professional content strategies.", "Optimize LinkedIn profile for growth."] },
      { module: "Module 6: Landing Page & Funnel Building", topics: ["Create high-converting landing pages.", "Build sales funnels for lead generation.", "Understand user journey and conversions.", "Optimize pages for better performance."] },
      { module: "Module 7: Marketing Automation", topics: ["Automate email and WhatsApp marketing.", "Set up CRM tools and workflows.", "Save time with automation systems.", "Improve customer engagement and follow-ups."] },
      { module: "Module 8: Facebook & Instagram Ads", topics: ["Create ad campaigns for leads and sales.", "Target the right audience effectively.", "Analyze performance and optimize ads.", "Improve ROI with data-driven strategies."] },
      { module: "Module 9: Website Development", topics: ["Build websites using WordPress.", "Customize pages and design layouts.", "Create landing pages for campaigns.", "Optimize website performance."] },
      { module: "Module 10: Search Engine Optimization (SEO)", topics: ["Optimize website for search engines.", "Learn on-page and off-page SEO.", "Improve rankings and organic traffic.", "Perform basic technical SEO."] },
      { module: "Module 11: Search Engine Marketing (SEM)", topics: ["Run ads using Google Ads.", "Learn keyword targeting and bidding.", "Create high-converting PPC campaigns.", "Track and measure ad performance."] },
      { module: "Module 12: Digital Design Mastery", topics: ["Design creatives using Canva.", "Create social media posts and ad creatives.", "Build brand identity and visual content.", "Understand design principles."] }
    ],
    outcomes: [],
    tools: ["ChatGPT", "Midjourney", "Canva", "WordPress", "Google Ads", "Meta Ads", "Zapier"],
    faqs: [
      { question: "Do I need prior experience?", answer: "No, this course starts from the basics." },
      { question: "Is this course practical?", answer: "Yes, completely hands-on with real projects." },
      { question: "Will I get job support?", answer: "Yes, we provide placement assistance." }
    ]
  },
  "creative-design-video-editing": {
    title: "Creative Design & Video Editing",
    subtitle: "Master Visual Storytelling",
    tagline: "Master Visual Storytelling",
    description: "Learn industry-standard tools for graphic design and video editing.",
    format: "Classroom",
    duration: "3 Months",
    batchInfo: "New Batches Starting Soon",
    location: "Anna Nagar | Nungambakkam | Korattur | Hyderabad",
    originalPrice: "—",
    discountedPrice: "Contact Us",
    usps: [],
    curriculum: [
      { module: "Module 1: Introduction to Design", topics: ["Design theory", "Color palettes"] }
    ],
    outcomes: [],
    tools: ["Adobe Premiere Pro", "Photoshop", "Illustrator"],
    faqs: []
  }
};

/* ─── Premium Landing Page ─── */
export default function CoursePage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;
  const course = courseMap[slug];

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadErr, setLeadErr] = useState("");

  const { triggerAction, GateModalComponent } = useCourseGate(course?.title || "");

  // Sync lead submitted state globally
  useEffect(() => {
    if (localStorage.getItem("dg_lead_submitted") === "true") {
      setLeadSubmitted(true);
    }
  }, []);

  if (!course) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4 text-[var(--tw-colors-ink-900)]">Course Not Found</h1>
        <p className="body-lg mb-8 text-ink-500">
          The course you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button variant="primary" href="/">
          Back to Home
        </Button>
      </div>
    );
  }

  const handleEnrollClick = () => {
    triggerAction(() => {
      router.push("/contact");
    });
  };

  const handleDownloadClick = () => {
    triggerAction(() => {
      const link = document.createElement("a");
      link.href = "/digitalghuru-brochure.txt";
      link.download = `${course.title.replace(/\s+/g, "_")}_Brochure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadErr("");

    if (!leadName.trim() || !leadEmail.trim() || !leadPhone.trim()) {
      setLeadErr("Please fill in all details.");
      return;
    }
    if (leadPhone.trim().length < 10) {
      setLeadErr("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLeadSubmitting(true);
    setTimeout(() => {
      setLeadSubmitting(false);
      setLeadSubmitted(true);
      localStorage.setItem("dg_lead_submitted", "true");
      console.log(`[Lead Captured] Name: ${leadName}, Email: ${leadEmail}, Phone: ${leadPhone}, Course: ${course.title}`);
    }, 1200);
  };



  return (
    <>
      {/* ─── SECTION 1: Exact Clone Hero Section ─── */}
      <section className="relative bg-white text-ink-900 py-12 lg:py-20 border-b border-ink-100">
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-ink-900" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-ink-800">4.7/5 Stars (3,778+ Reviews)</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-extrabold leading-tight text-ink-900">
                  {course.title}
                </h1>
                
                {course.tagline && (
                  <h2 className="text-lg md:text-xl font-heading font-bold text-ink-700">
                    {course.tagline}
                  </h2>
                )}
              </div>

              <div className="text-base text-ink-600 leading-relaxed max-w-xl">
                {course.description}
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 py-2">
                {[
                  "10+ Recognised Certificates",
                  "100% Placement Assistance",
                  "AI-Integrated Training",
                  "Dual Certification"
                ].map((pill, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-ink-200 text-xs font-bold text-ink-800 shadow-sm">
                    <Check className="h-3.5 w-3.5 text-ink-900 stroke-[3px]" />
                    {pill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button variant="primary" onClick={handleEnrollClick} className="px-8 py-3.5 text-base shadow-lg shadow-sm">
                  Apply Now <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
                <div className="flex items-center gap-2 text-sm font-semibold text-ink-700 bg-white px-4 py-2.5 rounded-lg border border-ink-200 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-ink-900 animate-pulse" />
                  Next Batch: {course.batchInfo.split('|')[0] || "Starting Soon"}
                </div>
              </div>
              
              <div className="pt-4 flex items-center gap-3 border-t border-ink-200 mt-6">
                <span className="text-xs font-bold text-ink-500 uppercase">Recognised By</span>
                <div className="flex gap-4">
                  <span className="text-sm font-bold text-ink-700">Google Partner</span>
                  <span className="text-sm font-bold text-ink-700">Meta Certified</span>
                </div>
              </div>
            </motion.div>

            {/* Right Placeholder Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-2xl bg-ink-200 border-2 border-ink-300 flex items-center justify-center overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-300/50 to-transparent" />
                <div className="flex flex-col items-center gap-3 text-ink-500">
                  <PlayCircle className="w-16 h-16 opacity-50" />
                  <span className="font-bold text-sm tracking-widest uppercase">Course Video Preview</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Horizontal Statistics Bar ─── */}
      <section className="bg-white border-b border-ink-200 py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-ink-100">
            <div className="text-center px-4">
              <p className="text-3xl font-display font-black text-ink-900 mb-1">3.9L+</p>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wide">Students Trained</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl font-display font-black text-ink-900 mb-1">100%</p>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wide">Placement Assistance</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl font-display font-black text-purple-600 mb-1">₹400Cr+</p>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wide">Ad Spend Experience</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl font-display font-black text-pink-600 mb-1">98%</p>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wide">Student Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Differences Section ─── */}
      {course.foundersNote && (
        <section className="section-padding bg-ink-50 border-b border-ink-200">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink-900 mb-6 leading-tight">
                  How This Course Differs
                </h2>
                <div className="prose prose-p:text-ink-600 prose-p:leading-relaxed">
                  <p>{course.foundersNote}</p>

                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-ink-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-ink-900 mb-6">The Digital Ghuru Advantage</h3>
                <div className="space-y-4 divide-y divide-ink-100">
                  {[
                    { title: "Agency Style Training", desc: "Learn by doing, not by watching slides." },
                    { title: "AI-First Curriculum", desc: "Every module integrates the latest AI tools." },
                    { title: "Practitioner Trainers", desc: "Learn from active industry experts." },
                    { title: "Real Brand Projects", desc: "Build a portfolio with actual ad budgets." }
                  ].map((adv, idx) => (
                    <div key={idx} className="pt-4 first:pt-0">
                      <h4 className="font-bold text-ink-900 text-sm mb-1">{adv.title}</h4>
                      <p className="text-sm text-ink-500">{adv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ─── NEW SECTION: Vision & Mission ─── */}
      {course.visionMission && (
        <section className="section-padding bg-ink-50">
          <div className="section-container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-ink-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue" />
                <h3 className="text-2xl font-display font-extrabold text-ink-900 mb-4 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-ink-50 flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-ink-900 fill-brand-blue" />
                  </span>
                  Our Mission
                </h3>
                <p className="text-ink-600 leading-relaxed">{course.visionMission.mission}</p>
              </div>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-ink-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
                <h3 className="text-2xl font-display font-extrabold text-ink-900 mb-4 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-ink-50 flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-ink-900 fill-brand-orange" />
                  </span>
                  Our Vision
                </h3>
                <p className="text-ink-600 leading-relaxed">{course.visionMission.vision}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── NEW SECTION: Who Is This For? ─── */}
      {course.whoIsThisFor && (
        <section className="section-padding bg-white border-b border-ink-100">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-yellow-700 font-bold text-xs uppercase tracking-wide">
                Target Audience
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 leading-tight">
                Who Is This Program For?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.whoIsThisFor.map((item, idx) => (
                <div key={idx} className="bg-ink-50 p-6 rounded-3xl border border-ink-200 hover:border-brand-blue hover:shadow-lg transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                    <span className="font-display font-black text-ink-900 text-xl">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-3">{item.role}</h3>
                  <p className="text-sm text-ink-600 mb-5 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-semibold text-ink-700">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION 4: Curriculum (Accordion) + Sticky Lead Form ─── */}
      <section className="section-padding bg-white pb-32" id="curriculum">
        <div className="section-container max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-50 text-ink-900 font-bold text-xs uppercase tracking-wide">
              Curriculum Breakdown
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 leading-tight">
              What Does the 4-Month Curriculum Cover?
            </h2>
            <p className="text-ink-600">
              This course covers 12 core modules spanning all aspects of modern marketing and AI.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 items-start relative">
            
            {/* Left Col: Accordions */}
            <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-ink-50 border-b border-ink-200 p-6 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-ink-900">Modules ({course.curriculum.length})</h3>
                <span className="text-sm font-bold text-ink-500 bg-white px-3 py-1 rounded-md shadow-sm border border-ink-200">
                  {course.duration}
                </span>
              </div>
              <SimpleAccordion items={course.curriculum.map(m => ({ question: m.module, answer: m.topics.map(t => '• ' + t).join('\n') }))} />
            </div>

            {/* Right Col: Sticky Form Card */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-ink-200 shadow-xl shadow-ink-900/5 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-ink-900" />
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-extrabold text-ink-900 mb-2">Apply Now</h3>
                  <p className="text-sm text-ink-500">Fill details to get the complete syllabus and schedule.</p>
                </div>

                {!leadSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-700 mb-1.5 ml-1 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-ink-50 border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-700 mb-1.5 ml-1 uppercase">Email Address</label>
                      <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-ink-50 border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-700 mb-1.5 ml-1 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="+91 88259 48859"
                        className="w-full bg-ink-50 border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors outline-none"
                      />
                    </div>
                    
                    {leadErr && (
                      <p className="text-xs font-semibold text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> {leadErr}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-4 text-sm mt-2 font-extrabold tracking-wide"
                      disabled={leadSubmitting}
                    >
                      {leadSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                    <p className="text-[10px] text-ink-400 text-center font-medium mt-3">
                      By submitting, you agree to our Terms & Privacy Policy.
                    </p>
                  </form>
                ) : (
                  <div className="bg-ink-50 border border-emerald-100 rounded-2xl p-8 text-center">
                    <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-ink-900" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-ink-900 mb-2">Request Received!</h4>
                    <p className="text-sm text-ink-600">Our counselors will contact you shortly.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Pricing & Investment ─── */}
      <section className="section-padding bg-ink-50 border-t border-ink-200">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 leading-tight">
              Course Fees: Complete Breakdown
            </h2>
            <p className="text-ink-600 mt-4 font-bold text-lg">
              {course.discountedPrice}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: EMI Cards */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-ink-900 mb-6">What Are the Payment Options?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-3xl font-black text-ink-900 mb-1">40%</p>
                  <p className="text-xs font-bold text-ink-600 uppercase">Upto 40% Discount</p>
                </div>
                <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-3xl font-black text-ink-900 mb-1">0%</p>
                  <p className="text-xs font-bold text-ink-600 uppercase">Interest / EMI</p>
                </div>
                <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-3xl font-black text-yellow-600 mb-1">20+</p>
                  <p className="text-xs font-bold text-ink-600 uppercase">Certificates</p>
                </div>
                <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-3xl font-black text-yellow-600 mb-1">4+</p>
                  <p className="text-xs font-bold text-ink-600 uppercase">EMI Options</p>
                </div>
              </div>
            </div>

            {/* Right: What's Included */}
            <div className="bg-white p-8 rounded-3xl border border-ink-200 shadow-sm">
              <h3 className="font-bold text-xl text-ink-900 mb-6">What is Included in Your Investment?</h3>
              <ul className="space-y-4">
                {[
                  `${course.duration} of Live Training`,
                  "All Core Modules + AI Modules",
                  "Real Brand Projects",
                  "Placement Assistance",
                  "Lifetime Access to LMS",
                  "Weekly Doubt Clearing Sessions",
                  "10+ Certifications"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-ink-900 stroke-[3px]" />
                    </div>
                    <span className="text-sm font-semibold text-ink-800 mt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Tools & Technologies ─── */}
      {course.tools && course.tools.length > 0 && (
        <section className="section-padding bg-ink-50 text-ink-900 overflow-hidden relative border-y border-ink-200">
          <div className="section-container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-200 text-ink-900 font-bold text-xs uppercase tracking-wide">
                Tools & Technologies
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 leading-tight">
                Master the Industry's Best Tools
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {course.tools.map((tool, idx) => {
                let ToolIcon = <Star className="h-5 w-5" />;
                let brandColor = "text-ink-600";
                const t = tool.toLowerCase();
                
                if (t.includes("chatgpt")) {
                  ToolIcon = <Bot className="h-5 w-5" />;
                  brandColor = "text-[#10A37F]";
                } else if (t.includes("canva")) {
                  ToolIcon = <Palette className="h-5 w-5" />;
                  brandColor = "text-[#00C4CC]";
                } else if (t.includes("wordpress")) {
                  ToolIcon = <SiWordpress className="h-5 w-5" />;
                  brandColor = "text-[#21759b]";
                } else if (t.includes("google")) {
                  ToolIcon = <SiGoogle className="h-5 w-5" />;
                  brandColor = "text-[#4285F4]";
                } else if (t.includes("meta") || t.includes("facebook")) {
                  ToolIcon = <SiMeta className="h-5 w-5" />;
                  brandColor = "text-[#0668E1]";
                } else if (t.includes("zapier")) {
                  ToolIcon = <SiZapier className="h-5 w-5" />;
                  brandColor = "text-[#FF4A00]";
                } else if (t.includes("midjourney") || t.includes("ai")) {
                  ToolIcon = <Sparkles className="h-5 w-5" />;
                  brandColor = "text-purple-500";
                }
                
                return (
                  <div key={idx} className="bg-white border border-ink-200 hover:border-ink-300 hover:bg-ink-100 transition-all px-6 py-4 rounded-2xl flex items-center gap-3 group cursor-default shadow-sm hover:shadow-md">
                    <div className={`h-10 w-10 rounded-full bg-ink-50 border border-ink-100 flex items-center justify-center shrink-0 ${brandColor} transition-colors`}>
                      {ToolIcon}
                    </div>
                    <span className="font-bold text-sm md:text-base tracking-wide text-ink-900">{tool}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION 7: Placement Stats Grid ─── */}
      <section className="section-padding bg-white border-b border-ink-200">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 leading-tight">
              Placement Stats at a Glance
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 bg-ink-50 p-6 rounded-2xl border border-yellow-100">
              <p className="text-4xl font-black text-yellow-600 mb-2">3,000+</p>
              <p className="text-sm font-bold text-ink-800">Total Placements Delivered</p>
            </div>
            <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
              <p className="text-3xl font-black text-ink-900 mb-2">₹12LPA</p>
              <p className="text-sm font-bold text-ink-800">Highest Package</p>
            </div>
            <div className="bg-ink-50 p-6 rounded-2xl border border-emerald-100">
              <p className="text-3xl font-black text-ink-900 mb-2">60%+</p>
              <p className="text-sm font-bold text-ink-800">Avg Salary Hike</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
              <p className="text-3xl font-black text-pink-600 mb-2">150+</p>
              <p className="text-sm font-bold text-ink-800">Hiring Partners</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <p className="text-3xl font-black text-purple-600 mb-2">90 Days</p>
              <p className="text-sm font-bold text-ink-800">Avg Time to Hire</p>
            </div>
            <div className="col-span-2 bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/10">
              <p className="text-4xl font-black text-ink-900 mb-2">100%</p>
              <p className="text-sm font-bold text-ink-800">Interview Opportunities Provided</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Placement Process (4 Steps) ─── */}
      <section className="section-padding bg-ink-50 border-b border-ink-200">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 leading-tight">
              The 4-Step Placement Process
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Profile Building", desc: "Resume & portfolio creation with live brand projects." },
              { step: 2, title: "Company Matching", desc: "Connecting you directly with 150+ hiring brands." },
              { step: 3, title: "Interview Prep", desc: "Mock interviews covering technical SEO & Ads." },
              { step: 4, title: "Ongoing Support", desc: "Continued assistance until you secure your job." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-ink-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-ink-50 text-ink-900 rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                  {s.step}
                </div>
                <h4 className="font-bold text-ink-900 mb-2">{s.title}</h4>
                <p className="text-xs text-ink-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Career Outcomes (Table) ─── */}
      {(course.careerOpportunities || course.outcomes) && (
        <section className="section-padding bg-white border-b border-ink-200">
          <div className="section-container max-w-4xl">
            <div className="text-center mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 leading-tight">
                What Career Paths Can You Pursue?
              </h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ink-50 border-b border-ink-200">
                    <th className="p-4 font-bold text-ink-900 text-sm">Career Path</th>
                    <th className="p-4 font-bold text-ink-900 text-sm">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {(course.careerOpportunities || course.outcomes).map((role, idx) => (
                    <tr key={idx} className="hover:bg-ink-50/50 transition-colors">
                      <td className="p-4 text-sm font-semibold text-ink-800">{role}</td>
                      <td className="p-4 text-sm text-ink-500">Digital Marketing & AI</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION 10: FAQs Accordion ─── */}
      <FAQAccordion items={course.faqs || []} />

      <GateModalComponent />
    </>
  );
}
