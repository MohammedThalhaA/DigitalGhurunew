"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle,
  ChevronDown,
  Award,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  User,
  Mail,
  Phone,
  ArrowUpRight,
  FileText,
  Star,
  Check,
  Building
} from "lucide-react";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";
import { useCourseGate } from "@/components/shared/useCourseGate";

/* ─── Extended Course Data Structure ─── */
interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  format: string;
  duration: string;
  batchInfo: string;
  location: string;
  originalPrice: string;
  discountedPrice: string;
  usps: string[]; // Hero bullet checkpoints
  curriculum: { module: string; topics: string[] }[];
  outcomes: string[];
  tools: string[];
  faqs: { question: string; answer: string }[];
}

const courseMap: Record<string, CourseData> = {
  "digital-marketing-chennai": {
    title: "Advanced Digital Marketing Course — Chennai",
    subtitle: "India's First Agency-Style Classroom Digital Marketing Program in Chennai",
    description:
      "Become a certified digital marketer with our flagship 4-month classroom program in Chennai. Learn from active marketing practitioners, manage real ad budgets, and secure guaranteed placements.",
    format: "Classroom",
    duration: "4 Months",
    batchInfo: "Next Batch Starts: September 15, 2026 | Chennai Campus",
    location: "Chennai Main Campus",
    originalPrice: "₹50,000",
    discountedPrice: "₹35,000",
    usps: [
      "Work in simulated Mock Agencies with fellow students",
      "Get ₹10,000 real campaign budget funded by the institute",
      "Dual Certification + 100% Placement Interview Guarantee",
      "AI-Integrated curriculum: ChatGPT, Midjourney, Canva AI & Zapier"
    ],
    curriculum: [
      { module: "Digital Marketing Fundamentals", topics: ["Marketing mix in digital", "Consumer behavior online", "Digital strategy frameworks", "Market research tools"] },
      { module: "WordPress Website Creation (No Coding)", topics: ["Domain & Hosting setup", "Theme customization & Plugins", "Elementor builder mastery", "Blog setup & monetization"] },
      { module: "Search Engine Optimization (SEO)", topics: ["On-page & Off-page SEO", "Technical SEO audits", "SEMrush keyword research", "Rank tracking & Link building"] },
      { module: "Facebook & Instagram Paid Ads (Meta Ads)", topics: ["Campaign structure & Ad formats", "Pixel tracking & Custom audiences", "Retargeting strategy", "Budget optimization & bidding"] },
      { module: "Google Ads & Search Engine Marketing (SEM)", topics: ["Search, Display & Video campaigns", "Keyword match types", "Negative keywords configuration", "Performance Max setups"] },
      { module: "Content Marketing & SEO Copywriting", topics: ["AI writing workflows", "Sales copy frameworks", "Hook creation & storytelling", "Video script outlines"] },
      { module: "Marketing Automation & AI Workflows", topics: ["Zapier lead sync triggers", "Email sequence setups", "CRM trigger setup", "AI analytics parsing"] },
    ],
    outcomes: [
      "15+ Global Certifications (Google, Meta, HubSpot)",
      "Work Portfolio representing 5+ live client projects",
      "Ready resume with pitch simulation credits",
      "Access to premium networking community events"
    ],
    tools: ["Google Ads", "Google Analytics 4", "SEMrush", "Canva", "HubSpot", "Mailchimp", "ChatGPT", "Meta Business Suite", "Zapier"],
    faqs: [
      { question: "What are the class timings?", answer: "We offer weekday (Mon-Fri, 10 AM - 1 PM) and weekend (Sat-Sun, 10 AM - 4 PM) batches to accommodate working professionals." },
      { question: "Is there a free demo class?", answer: "Yes! We offer free demo classes every week. Book yours through the contact form or call us directly." },
      { question: "What is the batch size?", answer: "We maintain small batch sizes of 20-25 students to ensure personalized attention and hands-on practice for every student." },
      { question: "Do I need prior experience?", answer: "No prior experience is required. Our course starts from the fundamentals and gradually builds to advanced topics." },
    ],
  },
  "digital-marketing-mumbai": {
    title: "Advanced Digital Marketing Course — Mumbai",
    subtitle: "Agency-Style Classroom Training Program in Mumbai",
    description:
      "Kickstart your marketing career with Mumbai's premium classroom program. Work on real-world agency briefs, learn advanced optimization tactics, and master generative AI tools.",
    format: "Classroom",
    duration: "4 Months",
    batchInfo: "Next Batch Starts: October 1, 2026 | Mumbai Campus",
    location: "Mumbai Campus",
    originalPrice: "₹50,000",
    discountedPrice: "₹35,000",
    usps: [
      "100% agency-style teams with designated group roles",
      "Dedicated performance ad budgets provided to every student",
      "Direct mentors from top digital marketing agencies",
      "Guaranteed interview opportunities in premium companies"
    ],
    curriculum: [
      { module: "Digital Marketing Fundamentals", topics: ["Marketing mix in digital", "Consumer behavior online", "Digital strategy frameworks"] },
      { module: "Search Engine Optimization (SEO)", topics: ["On-page & off-page SEO", "Technical SEO audit", "Keyword research"] },
      { module: "Paid Advertising (SEM/SMM)", topics: ["Google Ads campaign setup", "Meta Ads manager", "LinkedIn & YouTube advertising"] },
      { module: "Analytics & Strategy", topics: ["Google Analytics 4", "Campaign reporting", "AI tools integration"] },
    ],
    outcomes: ["Google & Meta certifications", "Portfolio projects", "Job-ready skills", "100% placement help"],
    tools: ["Google Ads", "Google Analytics 4", "SEMrush", "Canva", "Meta Business Suite"],
    faqs: [
      { question: "Where is the Mumbai campus located?", answer: "Our campus is located in a prime area in Mumbai. Full details are available on our Contact Us page." },
      { question: "What is the fee and payment options?", answer: "The fee is ₹35,000. Easy EMI options are available starting from ₹3,000 per month." },
    ],
  },
  "online-digital-marketing": {
    title: "Online Digital Marketing Course",
    subtitle: "Interactive Live Cohort Online Program with Agency Simulations",
    description:
      "Learn digital marketing from anywhere with live interactive classes, recorded sessions, weekly agency challenges, and dedicated placement mentorship.",
    format: "Online Live",
    duration: "3 Months",
    batchInfo: "Rolling Cohorts | New Cohort Starts Monday",
    location: "Online (Live + Recorded)",
    originalPrice: "₹40,000",
    discountedPrice: "₹25,000",
    usps: [
      "Live interactive Zoom classes with expert Q&A",
      "Virtual mock agency cohorts simulating project teams",
      "Lifetime access to recordings, resources, and job board",
      "10+ Global credentials with interview assistance"
    ],
    curriculum: [
      { module: "Digital Marketing Fundamentals", topics: ["Marketing mix in digital", "Digital strategy frameworks", "Consumer behavior online"] },
      { module: "SEO & Content Marketing", topics: ["On-page & off-page SEO", "Content strategy & creation", "Blog writing & keyword research"] },
      { module: "Paid Advertising", topics: ["Google Ads", "Meta Ads", "Campaign budgeting & optimization"] },
      { module: "Social Media & Analytics", topics: ["Social media strategy", "Google Analytics 4", "Reporting & dashboards"] },
    ],
    outcomes: ["Google certified", "Portfolio projects", "Career guidance", "Placement support"],
    tools: ["Google Ads", "Google Analytics", "SEMrush", "Canva", "Meta Business Suite"],
    faqs: [
      { question: "Are classes live or pre-recorded?", answer: "Classes are live and interactive via Zoom. All sessions are also recorded for later revision." },
      { question: "What if I miss a class?", answer: "All live sessions are recorded and shared within 24 hours. You can also access doubt-clearing sessions separately." },
    ],
  },
  "advanced-program": {
    title: "MBA / Advanced Program in Digital Marketing",
    subtitle: "Master marketing automation, analytics & campaign management",
    description:
      "Our premium 6-month advanced program is designed for executives and business owners looking to integrate AI automations, CRM triggers, and programmatic analytics.",
    format: "Hybrid",
    duration: "6 Months",
    batchInfo: "Next Cohort Starts: October 15, 2026",
    location: "Chennai Campus + Online",
    originalPrice: "₹75,000",
    discountedPrice: "₹55,000",
    usps: [
      "Advanced focus on marketing automation and CRM setup",
      "Generative AI workflow integrations (ChatGPT, Midjourney)",
      "Programmatic analytics dashboards and Looker Studio scaling",
      "1-on-1 career counseling with senior agency partners"
    ],
    curriculum: [
      { module: "Advanced SEO & Technical SEO", topics: ["Advanced technical audits", "Enterprise SEO strategies", "International SEO", "Schema markup"] },
      { module: "Advanced Paid Media", topics: ["Multi-platform campaign strategy", "Programmatic advertising", "Attribution modeling", "Advanced bidding strategies"] },
      { module: "Marketing Automation", topics: ["Email automation workflows", "CRM integration", "Lead scoring", "Marketing tech stack"] },
      { module: "AI for Marketing", topics: ["AI content generation", "Predictive analytics", "Chatbot marketing", "AI campaign optimization"] },
      { module: "Agency Management", topics: ["Client management", "Project management", "Reporting & presentations", "Agency operations"] },
    ],
    outcomes: ["Advanced certifications", "Agency-ready skills", "Leadership capabilities", "Portfolio of complex projects"],
    tools: ["Google Ads", "GA4", "SEMrush", "HubSpot", "Zapier", "ChatGPT", "Midjourney", "Tableau"],
    faqs: [
      { question: "Who is this program for?", answer: "This program is ideal for professionals with 1-2 years of experience or fresh graduates who've completed our foundational course." },
    ],
  },
  "ai-for-kids": {
    title: "AI Course for Kids",
    subtitle: "Empower kids with future-ready AI & Tech skills",
    description:
      "A fun, engaging, and practical introduction to Artificial Intelligence, coding, and creative tech problem-solving designed specially for kids aged 8-15.",
    format: "Online Live",
    duration: "8 Weeks",
    batchInfo: "Weekend Batch starting next Sunday",
    location: "Online",
    originalPrice: "₹20,000",
    discountedPrice: "₹12,000",
    usps: [
      "Fun gamified learning using Scratch visual blocks",
      "Build real image classifier and voice command AI models",
      "Guided safe prompts engineering and AI art creation",
      "Interactive projects showcased directly to parents"
    ],
    curriculum: [
      { module: "Introduction to Coding & Logic", topics: ["Scratch block coding", "Algorithmic thinking", "Fun animation projects"] },
      { module: "AI & Machine Learning Concepts", topics: ["How AI learns", "Train your first ML model", "Image & voice recognition projects"] },
      { module: "Generative AI & Creativity", topics: ["Prompt engineering for kids", "Creating digital art with AI", "AI storytelling"] },
      { module: "Building a Tech Capstone Project", topics: ["Design an AI app/game", "Presentation and project showcase"] },
    ],
    outcomes: ["Certificate of AI Excellence", "Interactive portfolio of 4+ games/apps", "Critical thinking & logic skills"],
    tools: ["Scratch", "Teachable Machine", "ChatGPT (guided)", "DALL-E (guided)", "Code.org"],
    faqs: [
      { question: "What is the age group for this course?", answer: "This course is best suited for children between 8 to 15 years old." },
      { question: "Does my child need prior coding experience?", answer: "No prior experience is required. We start with absolute basics using kid-friendly visual programming." },
    ],
  },
  "short-term": {
    title: "Short-term / Pre-recorded Courses",
    subtitle: "Focused marketing skills in 4 weeks",
    description:
      "Get specialized in a single area of digital marketing with our 4-week intensive modules. Perfect for professionals looking to upskill in a specific domain.",
    format: "Intensive",
    duration: "4 Weeks",
    batchInfo: "New cohorts start every month",
    location: "Online + Chennai Campus",
    originalPrice: "₹15,000",
    discountedPrice: "₹10,000",
    usps: [
      "Focus 100% on a single specialized marketing channel",
      "Perform practical hands-on live audits and budgets",
      "Immediate certification of channel expert status",
      "Flexible self-paced modules with doubt clearing support"
    ],
    curriculum: [
      { module: "SEO Mastery", topics: ["Complete SEO from scratch", "Hands-on audits", "Link building"] },
      { module: "Google Ads Mastery", topics: ["Search, Display, Shopping campaigns", "Bidding strategies", "Optimization"] },
      { module: "Social Media Mastery", topics: ["Platform strategies", "Content creation", "Analytics"] },
    ],
    outcomes: ["Specialized certification", "Hands-on project", "Career guidance"],
    tools: ["Platform-specific tools"],
    faqs: [
      { question: "Can I take multiple short-term courses?", answer: "Absolutely! Many students take multiple modules. We offer a bundle discount for enrolling in 3 or more." },
    ],
  },
};

const hiringPartners = [
  { name: "Google" },
  { name: "Meta" },
  { name: "HubSpot" },
  { name: "Zoho" },
  { name: "Shopify" },
  { name: "Freshworks" }
];

const mockTrainers = [
  {
    name: "Sorav Jain",
    role: "Founder & Chief Mentor",
    imgUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    bio: [
      "Founder of echoVME Digital & Digital Scholar",
      "Google & Meta Certified Trainer with 10+ years agency experience",
      "Trained 100k+ students and professionals across India"
    ]
  },
  {
    name: "Rishi Jain",
    role: "Co-Founder & Paid Ads Lead",
    imgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    bio: [
      "Spent ₹5Cr+ on Google Ads & Meta Performance marketing",
      "Automation specialist & workflow developer",
      "Helped 40+ brands achieve 5x ROI on budgets"
    ]
  },
  {
    name: "Sneha Sharma",
    role: "SEO Lead & Agency Partner",
    imgUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    bio: [
      "Ranked 100+ highly competitive keywords on Google Page 1",
      "SEO Audit Expert specializing in website structure",
      "Lead strategist behind echoVME content teams"
    ]
  }
];

const getLogoSvg = (name: string) => {
  switch (name.toLowerCase()) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#0064E0">
          <path d="M23.1 11.23c-.7-.88-1.78-1.5-2.98-1.77-1.2-.26-2.5-.1-3.66.45-.63.3-1.22.7-1.74 1.2-.22.2-.42.45-.6.7-.18-.25-.38-.5-.6-.7-.52-.5-1.1-.9-1.74-1.2-1.16-.55-2.45-.7-3.66-.45-1.2.27-2.28.89-2.98 1.77C4.4 12.1 4 13.34 4 14.6s.4 2.5 1.12 3.37c.7.88 1.78 1.5 2.98 1.77.34.07.68.1 1.02.1.88 0 1.74-.22 2.5-.6.63-.3 1.22-.7 1.74-1.2.22-.2.42-.45.6-.7.18.25.38.5.6.7.52.5 1.1.9 1.74 1.2.77.38 1.62.6 2.5.6.34 0 .68-.03 1.02-.1 1.2-.27 2.28-.89 2.98-1.77.72-.88 1.12-2.12 1.12-3.37s-.4-2.5-1.12-3.37zM8.32 17.77c-.77-.17-1.42-.55-1.85-1.1-.42-.52-.64-1.25-.64-2.07s.22-1.55.64-2.07c.43-.55 1.08-.93 1.85-1.1.76-.17 1.56-.07 2.27.28.43.2.82.5 1.16.85.25.26.47.56.66.88-.19.32-.4.62-.66.88-.34.35-.73.65-1.16.85-.7.35-1.5.45-2.27.28zm10.63-1.1c-.43.55-1.08.93-1.85 1.1-.76.17-1.56.07-2.27-.28-.43-.2-.82-.5-1.16-.85-.25-.26-.47-.56-.66-.88.19-.32.4-.62.66-.88.34-.35.73-.65 1.16-.85.7-.35 1.5-.45 2.27-.28.77.17 1.42.55 1.85 1.1.42.52.64 1.25.64 2.07s-.22 1.55-.64 2.07z"/>
        </svg>
      );
    case "hubspot":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#FF7A59">
          <path d="M21.4 10.4c-.6 0-1.2.2-1.6.6l-2.6-1.5c.1-.4.2-.8.2-1.2 0-2.2-1.8-4-4-4s-4 1.8-4 4c0 .4.1.8.2 1.2L7 11c-.5-.4-1.1-.6-1.8-.6-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.4-.1-.8-.2-1.2l2.6-1.5c.5.4 1.1.6 1.8.6.6 0 1.2-.2 1.6-.6l2.6 1.5c-.1.4-.2.8-.2 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.4-.1-.8-.2-1.2l2.6-1.5c.5.4 1.1.6 1.8.6 1.7 0 3-1.3 3-3s-1.3-3-3-3zM5.2 15.4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8.2-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm5.4 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm2.6-1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>
      );
    case "zoho":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <g transform="scale(0.6) translate(6, 6)">
            <rect x="0" y="0" width="12" height="12" rx="2" fill="#E21C26" />
            <rect x="14" y="0" width="12" height="12" rx="6" fill="#3D9B35" />
            <rect x="0" y="14" width="12" height="12" rx="2" fill="#F8B019" />
            <rect x="14" y="14" width="12" height="12" rx="6" fill="#1C75BC" />
          </g>
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#96BF48">
          <path d="M18.8 6.4l-1.6-4.4c-.1-.3-.4-.5-.7-.5h-9c-.3 0-.6.2-.7.5L5.2 6.4c-.1.3-.1.6 0 .9l6.3 14c.2.4.6.7 1 .7s.8-.3 1-.7l6.3-14c.1-.3.1-.6 0-.9zm-6.8 12.8L7.1 8.5h9.8l-4.9 10.7z"/>
        </svg>
      );
    case "freshworks":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <g transform="scale(0.65) translate(4, 4)">
            <path fill="#0052FF" d="M10 0L2 8v16l8-8V0z" />
            <path fill="#00A3FF" d="M18 4l-8 8v16l8-8V4z" />
            <path fill="#00C2FF" d="M26 8l-8 8v16l8-8V8z" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

/* ─── Curriculum Accordion Component ─── */
function CurriculumAccordion({
  modules,
}: {
  modules: { module: string; topics: string[] }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {modules.map((mod, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left group"
          >
            <div className="flex items-center gap-4">
              <span className="h-9 w-9 rounded-xl bg-brand-blue/10 flex items-center justify-center text-sm font-heading font-extrabold text-brand-blue shrink-0">
                {idx + 1}
              </span>
              <span className="font-display text-base md:text-lg font-bold text-ink-850 group-hover:text-brand-blue transition-colors">
                {mod.module}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-ink-400 transition-transform duration-300 ${
                openIndex === idx ? "rotate-180 text-brand-blue" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === idx
                ? "max-h-[800px] border-t border-ink-50 p-6 pl-10 md:pl-[76px]"
                : "max-h-0"
            }`}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mod.topics.map((topic, tIdx) => (
                <li
                  key={tIdx}
                  className="flex items-start gap-2.5 text-sm text-ink-600 leading-relaxed"
                >
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Premium Landing Page ─── */
export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = courseMap[slug];

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBatch, setLeadBatch] = useState("Weekday Batch");
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
        <h1 className="heading-lg mb-4 text-[#13234C]">Course Not Found</h1>
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
      console.log(`[Lead Captured] Name: ${leadName}, Email: ${leadEmail}, Phone: ${leadPhone}, Batch: ${leadBatch}, Course: ${course.title}`);
    }, 1200);
  };

  return (
    <>
      {/* ─── SECTION 1: Digital Scholar Style Hero ─── */}
      <section className="relative bg-[#13234C] text-white py-16 lg:py-20 overflow-hidden">
        {/* Soft Background Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-[1.25fr,1fr] gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Trust Badge Grid */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-[#1e3264] px-3.5 py-1.5 rounded-full border border-white/10">
                  <div className="flex text-[#f4c708]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white/90">4.9/5 Rating (3,800+ Reviews)</span>
                </div>
                <span className="bg-[#f4c708] text-[#13234C] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Guaranteed Placement
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-ink-200 font-medium max-w-xl">
                  {course.subtitle}
                </p>
              </div>

              {/* Gated Value Bullet Points */}
              <div className="space-y-3 pt-2">
                {course.usps.map((usp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />
                    </div>
                    <span className="text-sm md:text-base text-white/90 leading-relaxed font-semibold">
                      {usp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Details Stripe */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
                <div>
                  <p className="text-[10px] font-bold text-ink-300 uppercase tracking-wider">Duration</p>
                  <p className="text-sm md:text-base font-extrabold text-[#f4c708] mt-0.5">{course.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ink-300 uppercase tracking-wider">Learning Mode</p>
                  <p className="text-sm md:text-base font-extrabold text-[#f4c708] mt-0.5">{course.format}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ink-300 uppercase tracking-wider">Campus</p>
                  <p className="text-sm md:text-base font-extrabold text-[#f4c708] mt-0.5">Chennai / Online</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Direct Lead Capture Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white text-ink-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-ink-100 relative">
                {/* Yellow Strip */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#f4c708] rounded-t-3xl" />

                {!leadSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-extrabold text-[#13234C]">
                        Reserve Free Trial & Syllabus
                      </h3>
                      <p className="text-xs text-ink-500 mt-1.5">
                        Fill details to book a callback session and unlock immediate prospectus download.
                      </p>
                    </div>

                    {leadErr && (
                      <div className="p-3 text-xs font-semibold text-red-750 bg-red-50 rounded-xl border border-red-100">
                        {leadErr}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-450" />
                        <input
                          type="text"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full pl-10 pr-4 py-3 bg-ink-50/50 border border-ink-150 rounded-xl text-sm focus:outline-none focus:border-[#13234C] transition"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-450" />
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="Your Email Address"
                          className="w-full pl-10 pr-4 py-3 bg-ink-50/50 border border-ink-150 rounded-xl text-sm focus:outline-none focus:border-[#13234C] transition"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-450" />
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="Your Mobile Number"
                          className="w-full pl-10 pr-4 py-3 bg-ink-50/50 border border-ink-150 rounded-xl text-sm focus:outline-none focus:border-[#13234C] transition"
                          required
                        />
                      </div>

                      {/* Preferred Batch */}
                      <div className="relative">
                        <select
                          value={leadBatch}
                          onChange={(e) => setLeadBatch(e.target.value)}
                          className="w-full px-4 py-3 bg-ink-50/50 border border-ink-150 rounded-xl text-sm focus:outline-none focus:border-[#13234C] transition appearance-none"
                        >
                          <option value="Weekday Batch">Weekday Batch (Mon - Fri)</option>
                          <option value="Weekend Batch">Weekend Batch (Sat - Sun)</option>
                          <option value="Online Batch">Online Cohort Live</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-ink-455 pointer-events-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-4 bg-[#f4c708] hover:bg-[#e2b706] text-[#13234C] rounded-xl text-sm font-extrabold shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {leadSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-[#13234C]/20 border-t-[#13234C] rounded-full animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application & Download Syllabus"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-[10px] text-ink-400">
                        * Guaranteed call from senior admissions counselor within 2 hours.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-5">
                    <div className="h-14 w-14 bg-emerald-100 text-emerald-650 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-extrabold text-[#13234C]">Application Submitted!</h4>
                      <p className="text-xs text-ink-500 mt-2 max-w-[240px] mx-auto leading-relaxed">
                        Thank you! Your details are stored. You have unlocked access to all brochures and detail pages.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-ink-100">
                      <button
                        onClick={handleDownloadClick}
                        className="w-full py-3 bg-[#0052FF] hover:bg-[#0041cc] text-white rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Download Syllabus Brochure (PDF)
                      </button>
                      <a
                        href={`https://wa.me/919876543210?text=Hi%20Admissions%20Team!%20I%20have%20submitted%20my%20details%20for%20the%20${course.title}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-center text-xs font-extrabold transition"
                      >
                        Message Us on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Hiring Partners Marquee strip ─── */}
      <section className="bg-white py-6 border-b border-ink-100">
        <div className="section-container">
          <p className="text-center text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-4">
            Our Students Work at Top Agencies and MNCs
          </p>
          <div className="relative overflow-hidden flex items-center py-2 max-w-4xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex gap-16 shrink-0 min-w-full items-center justify-around"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                ease: "linear",
                duration: 18,
                repeat: Infinity,
              }}
            >
              {[...hiringPartners, ...hiringPartners, ...hiringPartners].map((partner, idx) => {
                const svgLogo = getLogoSvg(partner.name);
                return (
                  <div key={idx} className="flex items-center gap-2 grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition duration-200">
                    <div className="h-5.5 w-5.5 flex items-center justify-center shrink-0">
                      {svgLogo}
                    </div>
                    <span className="text-xs font-extrabold font-display text-ink-800 tracking-wide uppercase">{partner.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Snapshot Stats Bar ─── */}
      <section className="bg-ink-50/60 py-10">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="bg-white p-5 rounded-2xl border border-ink-150 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-blue/5 text-[#0052FF] flex items-center justify-center shrink-0">
                <Clock className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-450 uppercase tracking-wider">Duration</p>
                <p className="text-base font-display font-extrabold text-[#13234C]">{course.duration}</p>
                <p className="text-[10px] text-ink-400">Classroom sessions</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-5 rounded-2xl border border-ink-150 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-blue/5 text-[#0052FF] flex items-center justify-center shrink-0">
                <Building className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-450 uppercase tracking-wider">Methodology</p>
                <p className="text-base font-display font-extrabold text-[#13234C]">Agency-Style</p>
                <p className="text-[10px] text-ink-400">100% Practical works</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-5 rounded-2xl border border-ink-150 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-blue/5 text-[#0052FF] flex items-center justify-center shrink-0">
                <Award className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-450 uppercase tracking-wider">Certifications</p>
                <p className="text-base font-display font-extrabold text-[#13234C]">15+ Global</p>
                <p className="text-[10px] text-ink-400">Google, Meta, Hubspot</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-5 rounded-2xl border border-ink-150 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-blue/5 text-[#0052FF] flex items-center justify-center shrink-0">
                <Briefcase className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-455 uppercase tracking-wider">Job Help</p>
                <p className="text-base font-display font-extrabold text-[#13234C]">100% Interview</p>
                <p className="text-[10px] text-ink-400">Guaranteed callbacks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Traditional vs. Agency Style Learning model (Pedagogy) ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="eyebrow uppercase text-[#0052FF]">First Time in India</span>
            <h2 className="text-2xl md:text-4xl font-display font-extrabold text-[#13234C]">
              Traditional Classrooms vs Agency-Style Training
            </h2>
            <p className="body-md text-ink-500">
              Slide decks don&apos;t make marketers. Practitioners do. See how Digital Scholar differs from other generic institutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Card */}
            <div className="bg-ink-50/50 rounded-3xl p-6 md:p-8 border border-ink-100 space-y-6">
              <h4 className="font-display text-xl font-bold text-ink-450 uppercase tracking-wider">Traditional Institutes</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-ink-500">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-red-650" />
                  </div>
                  <span>Individual learning in isolated desks with minimal peer collaboration.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-500">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-red-650" />
                  </div>
                  <span>Theoretical slides without access to active budget campaigns.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-500">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-red-650" />
                  </div>
                  <span>Taught by college professors with no active digital marketing agency experience.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-500">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-red-650" />
                  </div>
                  <span>Dry exams that only verify rote memorization, not live performance skills.</span>
                </li>
              </ul>
            </div>

            {/* Agency Style Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#13234C] shadow-xl relative space-y-6">
              {/* Top Tag */}
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#f4c708] text-[#13234C] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                The Scholar Way
              </div>
              
              <h4 className="font-display text-xl font-extrabold text-[#13234C] uppercase tracking-wider">Agency-Style Model</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-ink-850 font-medium">
                  <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 stroke-[3px]" />
                  </div>
                  <span>Grouped into Mock Agencies of 5, simulating roles of an active company team.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-850 font-medium">
                  <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 stroke-[3px]" />
                  </div>
                  <span>Get real ad budgets funded directly by the institute to run live ad campaigns.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-850 font-medium">
                  <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 stroke-[3px]" />
                  </div>
                  <span>Mentored by active echoVME agency executors who design live campaigns daily.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-850 font-medium">
                  <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 stroke-[3px]" />
                  </div>
                  <span>Build a physical live campaigns portfolio to showcase in placements interviews.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: AI Integrated Curriculum Section ─── */}
      <section className="section-padding bg-[#13234C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent opacity-65 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12 items-center">
            
            {/* Text details */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-heading font-extrabold uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" />
                India&apos;s First AI-Integrated Syllabus
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white leading-tight">
                Work 10x Faster with Advanced Generative AI
              </h2>
              <p className="text-ink-250 leading-relaxed text-sm md:text-base">
                AI is transforming digital marketing. Our curriculum integrates AI tools into every single module, teaching you how to use generative prompt automation, graphics, and email campaigns before you enter the job market.
              </p>
              <div className="pt-2">
                <Button variant="secondary" onClick={handleDownloadClick}>
                  Unlock AI Syllabus Details <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>

            {/* AI Tools Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Box 1 */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="h-9 w-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h5 className="font-heading text-base font-extrabold text-white mb-1.5">Generative AI Copies</h5>
                <p className="text-xs text-ink-300 leading-relaxed">
                  Use ChatGPT and Claude to write hooks, email subject headlines, landing page copies, and ad variations.
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="h-9 w-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h5 className="font-heading text-base font-extrabold text-white mb-1.5">AI Visuals Generation</h5>
                <p className="text-xs text-ink-300 leading-relaxed">
                  Generate realistic stock graphics, branding guidelines, and visual mockup outputs with Midjourney.
                </p>
              </div>

              {/* Box 3 */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="h-9 w-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h5 className="font-heading text-base font-extrabold text-white mb-1.5">Automated Zaps</h5>
                <p className="text-xs text-ink-300 leading-relaxed">
                  Connect lead pages to spreadsheets, sync triggers, and deliver automatic text alerts via Zapier.
                </p>
              </div>

              {/* Box 4 */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="h-9 w-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h5 className="font-heading text-base font-extrabold text-white mb-1.5">Audits Optimization</h5>
                <p className="text-xs text-ink-300 leading-relaxed">
                  Analyze competitor landing page keyword structures and generate optimization plans with SEMrush AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Syllabus modules (Two column layout) ─── */}
      <section className="section-padding bg-white" id="curriculum">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16">
            
            {/* Left: Accordion list */}
            <div>
              <div className="mb-8 space-y-2">
                <span className="eyebrow text-[#0052FF]">DETAILED SYLLABUS</span>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#13234C]">
                  Course Curriculum Overview
                </h2>
                <p className="body-md text-ink-500">
                  Step-by-step modular progression updated to match standard industry expectations in digital agencies.
                </p>
              </div>

              <CurriculumAccordion modules={course.curriculum} />

              <div className="mt-8 flex justify-center lg:justify-start">
                <Button variant="primary" onClick={handleDownloadClick}>
                  Download Syllabus PDF (Curriculum Details)
                </Button>
              </div>
            </div>

            {/* Right: Gated Sidebar widget */}
            <div className="lg:self-start lg:sticky lg:top-[96px]">
              <div className="bg-[#EFFAFF] rounded-3xl border border-brand-blue/15 p-6 md:p-8 relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0052FF] rounded-t-3xl" />
                
                {!leadSubmitted ? (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-extrabold text-[#13234C]">
                      Interested in this Course?
                    </h3>
                    <p className="text-xs text-ink-650 leading-relaxed">
                      Submit details via the form in the Hero Banner at the top of the page to unlock direct syllabus downloads, session links, and counselor support.
                    </p>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-3 bg-[#0052FF] hover:bg-[#0041cc] text-white text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      Fill Form at Top
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 text-center">
                    <div className="h-11 w-11 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-6 w-6 stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-extrabold text-[#13234C]">Syllabus Unlocked</h4>
                      <p className="text-xs text-ink-500 mt-1 max-w-[200px] mx-auto">
                        Click below to download curriculum prospectus file.
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadClick}
                      className="w-full py-3.5 bg-[#f4c708] text-[#13234C] text-xs font-extrabold rounded-xl transition shadow hover:bg-[#e2b706]"
                    >
                      Download Syllabus Now
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Tools Covered (Flex grid) ─── */}
      <section className="section-padding bg-ink-50/45">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="eyebrow text-[#0052FF]">PRACTICAL TOOLKITS</span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#13234C]">25+ Industry Standard Tools</h2>
            <p className="body-md text-ink-500">
              Build resume credentials with active marketing platforms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {course.tools.map((tool, idx) => (
              <div
                key={idx}
                className="px-5 py-3.5 rounded-2xl bg-white border border-ink-150 text-sm font-heading font-semibold text-[#13234C] shadow-sm hover:border-[#0052FF] hover:text-[#0052FF] transition duration-200"
              >
                {tool}
              </div>
            ))}
            <div className="px-5 py-3.5 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 text-sm font-heading font-extrabold text-[#0052FF]">
              + 15 More Advanced Tools
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Mentors & Trainers Showcase ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="eyebrow text-[#0052FF]">LEARN FROM ACTIVE PRACTITIONERS</span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#13234C]">
              Meet Your Faculty Mentors
            </h2>
            <p className="body-md text-ink-500">
              Trained by performance experts managing active campaigns at echoVME digital agency daily.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockTrainers.map((trainer, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-ink-150 overflow-hidden shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Image */}
                <div className="aspect-square bg-ink-50 overflow-hidden">
                  <img
                    src={trainer.imgUrl}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-[#13234C]">{trainer.name}</h4>
                    <p className="text-xs font-heading font-semibold text-brand-orange uppercase tracking-wider mt-0.5">{trainer.role}</p>
                  </div>
                  <ul className="space-y-2.5 border-t border-ink-100 pt-4">
                    {trainer.bio.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-ink-600 leading-relaxed">
                        <Check className="h-4 w-4 text-brand-blue shrink-0 mt-0.5 stroke-[2px]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Career Outcomes & Placement Metrics ─── */}
      <section className="section-padding bg-[#EFFAFF] border-y border-brand-blue/10 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.3fr,1.7fr] gap-12 items-center">
            
            {/* Stats */}
            <div className="space-y-6">
              <span className="eyebrow text-[#0052FF]">CAREER ACCELERATION</span>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#13234C]">
                Dedicated Placements Support
              </h2>
              <p className="body-md text-ink-650">
                Our active placement cell connects you directly with recruitment partners upon completing module classes.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="bg-white p-5 rounded-2xl border border-brand-blue/15 shadow-sm text-center">
                  <TrendingUp className="h-6 w-6 text-brand-orange mx-auto mb-2" />
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-[#13234C]">60%+</p>
                  <p className="text-[9px] font-bold text-ink-400 uppercase tracking-wider mt-1.5">Avg Salary Hike</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-brand-blue/15 shadow-sm text-center">
                  <Briefcase className="h-6 w-6 text-brand-blue mx-auto mb-2" />
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-[#13234C]">₹12 LPA</p>
                  <p className="text-[9px] font-bold text-ink-400 uppercase tracking-wider mt-1.5">Highest Package</p>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-blue/15 shadow-sm space-y-6">
              <h4 className="font-display text-lg font-extrabold text-[#13234C]">Hiring & Placement Process Flow</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#EFFAFF] text-[#0052FF] flex items-center justify-center font-display font-bold text-sm shrink-0">1</div>
                  <div>
                    <h5 className="text-sm font-extrabold text-[#13234C]">Resume & Portfolio Build</h5>
                    <p className="text-xs text-ink-500 mt-0.5">We build your agency profile, campaigns portfolio, and mock-pitch case studies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#EFFAFF] text-[#0052FF] flex items-center justify-center font-display font-bold text-sm shrink-0">2</div>
                  <div>
                    <h5 className="text-sm font-extrabold text-[#13234C]">Mock Interviews & Grooming</h5>
                    <p className="text-xs text-ink-500 mt-0.5">Admissions counselors mock-interview you on technical SEO, ad bids, and campaign metrics.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#EFFAFF] text-[#0052FF] flex items-center justify-center font-display font-bold text-sm shrink-0">3</div>
                  <div>
                    <h5 className="text-sm font-extrabold text-[#13234C]">Direct Recruitment Pitch</h5>
                    <p className="text-xs text-ink-500 mt-0.5">Schedule callbacks directly with hiring managers of 150+ associated hiring brands.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 10: FAQs Accordion ─── */}
      <FAQAccordion items={course.faqs} />

      {/* ─── SECTION 11: Final Call to Action ─── */}
      <section className="bg-gradient-to-r from-brand-orange to-brand-orange/95 py-16 text-white relative overflow-hidden">
        <div className="section-container relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
            Ready to Accelerate Your Marketing Career?
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">
            {course.batchInfo}
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleEnrollClick}
              className="px-6 py-3.5 bg-[#13234C] hover:bg-[#0c1630] text-white rounded-xl text-xs font-extrabold shadow-lg transition"
            >
              Apply for Admission Now
            </button>
            <button
              onClick={handleDownloadClick}
              className="px-6 py-3.5 bg-white text-[#13234C] hover:bg-ink-100 rounded-xl text-xs font-extrabold shadow-lg transition"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <GateModalComponent />
    </>
  );
}
