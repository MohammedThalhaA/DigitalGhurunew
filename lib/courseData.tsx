import React from "react";
import {
  Users,
  Lightbulb,
  Bot,
  FolderKanban,
  BriefcaseBusiness,
  Award,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Laptop,
  Search,
  RefreshCcw,
  PenTool,
  Laptop2,
  DollarSign,
  FolderOpen,
  BrainCircuit,
  FileImage,
  BarChart3,
  UserCog,
  Blocks,
  Sparkles,
  Rocket,
  Globe2,
  Code2,
  Server,
  LayoutTemplate,
  TerminalSquare,
  Workflow,
  Cpu,
  Braces
} from "lucide-react";

import { BenefitItem } from "@/components/sections/course-linear/LinearDesignedToHelp";
import { NumberedFeatureItem } from "@/components/sections/course-linear/LinearAIInMarketing";
import { TreeReason } from "@/components/sections/course-linear/LinearWhyDigitalGhuru";
import { AudienceItem } from "@/components/sections/course-linear/LinearWhoIsThisFor";
import { HighlightItem } from "@/components/sections/course-linear/LinearHighlights";

import { CategorizedToolGroup } from "@/components/sections/course-linear/LinearCategorizedTools";
import { CloudCog, Database } from "lucide-react";

export interface CourseData {
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
  overviewLearnings?: string[];
  overviewDescription?: React.ReactNode[];
  designedToHelp?: { title: string; description: string; benefits: BenefitItem[] };
  numberedFeatures?: { title: string; description: string; features: NumberedFeatureItem[] };
  whyDigitalGhuru?: { title: string; reasons: TreeReason[] };
  whoIsThisForData?: AudienceItem[];
  highlightsData?: HighlightItem[];
  categorizedToolsData?: CategorizedToolGroup[];
  curriculum: { module: string; topics: string[] }[];
  tools: string[];
  faqs?: { question: string; answer: string }[];
  outcomes?: string[];
  specialHighlights?: { title: string; points: string[] };
  whoIsThisFor?: { role: string; desc: string; points: string[] }[];
  foundersNote?: string;
  visionMission?: { vision: string; mission: string };
  courseGoals?: string[];
  industryTrends?: { title: string; desc: string }[];
  practicalExperience?: string[];
  placementSupport?: string[];
  careerOpportunities?: string[];
  certifications?: string[];
}

export const courseMap: Record<string, CourseData> = {
  "ai-powered-digital-marketing": {
    title: "AI-Powered Digital Marketing Course",
    subtitle: "The New Digital Marketing + AI Course",
    tagline: "The New Digital Marketing + AI Course",
    description: "Digital marketing combined with AI is rapidly transforming how businesses grow and compete. Learn to build strong marketing foundations, leverage AI for faster execution, and create high-performing campaigns.",
    format: "Classroom + Online",
    duration: "3 to 6 Months",
    batchInfo: "New Batches Starting Soon | 12 Modules",
    location: "Anna Nagar | Nungambakkam | Korattur |Online & Offline Campuses",
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
    overviewLearnings: [
      "Understand the digital ecosystem and customer journey",
      "Learn prompt engineering and AI content creation using ChatGPT & Midjourney",
      "Plan and create engaging social media strategies across platforms",
      "Master Instagram algorithm, reels, and influencer marketing",
      "Build a strong personal brand on LinkedIn and generate B2B leads",
      "Create high-converting landing pages and sales funnels",
      "Automate email, WhatsApp marketing, and CRM workflows",
      "Run profitable Facebook, Instagram, and Google Ads campaigns",
      "Build websites using WordPress and optimize for SEO",
      "Design professional creatives using Canva and AI design tools"
    ],
    overviewDescription: [
      "Digital marketing combined with AI is rapidly transforming how businesses grow and compete. This course gives you a complete roadmap to build strong marketing foundations, leverage AI for faster execution, and create high-performing campaigns.",
      <span key="1">At Digital Ghuru, we believe that the future belongs to those who can create, communicate, and convert effectively in the digital world. With the rise of AI tools like <strong className="text-ink-800">ChatGPT and Midjourney</strong>, marketing is no longer just about creativity — it's about speed, automation, and smart decision-making.</span>,
      "We ensure our students don't just learn — they practice, implement, and achieve real results. By the end of this program, you will have hands-on project experience, a professional portfolio, and the confidence to pursue a career as a Digital Marketing Executive, SEO Specialist, Social Media Manager, Content Strategist, Performance Marketer, or Freelancer."
    ],
    designedToHelp: {
      title: "This course is designed to help you",
      description: "At Digital Ghuru, we combine Digital Marketing + Artificial Intelligence, creating a powerful learning experience designed for real-world success.",
      benefits: [
        { iconName: "Blocks", title: "Build strong marketing foundations", description: "Master the fundamentals of digital marketing and understand the customer journey.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { iconName: "Sparkles", title: "Leverage AI for faster execution", description: "Use advanced AI tools to automate your workflows and create content at scale.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { iconName: "Rocket", title: "Create high-performing campaigns", description: "Design, execute, and optimize live campaigns that drive real business results.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { iconName: "Globe2", title: "Stay ahead in the digital ecosystem", description: "Future-proof your career by staying updated with the latest AI advancements.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    numberedFeatures: {
      title: "Rise of AI in Marketing",
      description: "AI is transforming how businesses operate and market their products. Tools like ChatGPT, Canva, and Google Analytics are revolutionizing the industry.",
      features: [
        { num: "01", iconName: "BrainCircuit", title: "Automation to Intelligence", description: "AI now goes beyond automation to strategic decision-making.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { num: "02", iconName: "FileImage", title: "Content Creation at Scale", description: "Generate text, images, and videos instantly.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { num: "03", iconName: "BarChart3", title: "Data-Driven Marketing", description: "Analyze customer behavior with precision.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { num: "04", iconName: "UserCog", title: "Personalization", description: "Deliver customized experiences to every user.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    whyDigitalGhuru: {
      title: "Why Digital Ghuru",
      reasons: [
        { num: "01", iconName: "Search", title: "AI Integration", description: "Dedicated modules on using AI tools for content creation, automation, and campaign optimization", color: "border-brand-blue bg-blue-50 text-brand-blue", numBg: "bg-surface-dark text-white", dotColor: "bg-brand-blue" },
        { num: "02", iconName: "PenTool", title: "Practical Learning Approach", description: "Learn by working on real-time projects and campaigns", color: "border-orange-300 bg-orange-50 text-brand-orange", numBg: "bg-brand-orange text-white", dotColor: "bg-brand-orange" },
        { num: "03", iconName: "RefreshCcw", title: "Updated Curriculum", description: "Aligned with current industry trends and AI advancements", color: "border-emerald-300 bg-emerald-50 text-emerald-600", numBg: "bg-emerald-500 text-white", dotColor: "bg-emerald-500" },
        { num: "04", iconName: "Laptop2", title: "Hands-On Experience", description: "Execute campaigns, build funnels, and manage live projects", color: "border-red-300 bg-red-50 text-red-600", numBg: "bg-red-500 text-white", dotColor: "bg-red-500" },
        { num: "05", iconName: "Users", title: "Personal Mentorship", description: "Guidance from experienced digital marketers", color: "border-purple-300 bg-purple-50 text-purple-600", numBg: "bg-purple-500 text-white", dotColor: "bg-purple-500" },
        { num: "06", iconName: "DollarSign", title: "Freelancing & Earning Support", description: "Learn how to earn through digital skills", color: "border-amber-300 bg-amber-50 text-amber-600", numBg: "bg-amber-500 text-white", dotColor: "bg-amber-500" },
        { num: "07", iconName: "FolderOpen", title: "Portfolio Building", description: "Create proof of work to showcase your expertise", color: "border-cyan-300 bg-cyan-50 text-cyan-600", numBg: "bg-cyan-500 text-white", dotColor: "bg-cyan-500" },
      ]
    },
    whoIsThisForData: [
      { role: "Entrepreneurs", iconName: "TrendingUp", desc: "An all-inclusive program designed to empower your entrepreneurial journey in the digital world.", points: ["Build a strong online presence for your business", "Generate quality leads and increase sales", "Stay ahead using AI-powered marketing strategies"], gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", dotColor: "bg-blue-500" },
      { role: "Professionals", iconName: "Briefcase", desc: "A career-focused program to help you upgrade your skills and grow in the digital space.", points: ["Learn in-demand digital marketing & AI skills", "Transition into high-growth digital roles", "Enhance your career opportunities and salary potential"], gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", dotColor: "bg-emerald-500" },
      { role: "Students", iconName: "GraduationCap", desc: "A complete beginner-friendly program to kickstart your digital marketing career.", points: ["Gain practical, job-ready skills", "Work on real-time projects and build your portfolio", "Prepare for interviews and career opportunities"], gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", dotColor: "bg-amber-500" },
      { role: "Freelancers", iconName: "Laptop", desc: "A growth-oriented program to help you scale your freelancing career.", points: ["Expand your service offerings with digital marketing", "Attract high-paying clients globally", "Build a consistent and scalable income stream"], gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", dotColor: "bg-rose-500" }
    ],
    highlightsData: [
      { iconName: "Users", title: "Personal Mentorship", description: "Get 1-on-1 guidance from industry experts with personalized feedback on your campaigns.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
      { iconName: "Lightbulb", title: "Practical Learning Approach", description: "Hands-on experience with real-time projects, live campaigns, and case studies.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
      { iconName: "Bot", title: "Updated Curriculum with AI", description: "Learn AI-based content automation, chatbot marketing, ad optimization, and more.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
      { iconName: "FolderKanban", title: "Portfolio Building", description: "Build a strong portfolio showcasing projects, creativity, and measurable results.", gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600" },
      { iconName: "BriefcaseBusiness", title: "Freelancing & Earning Support", description: "Learn freelance client acquisition, pricing strategies, and how to build consistent income.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      { iconName: "Award", title: "Industry Certifications", description: "Earn Digital Ghuru certification plus industry-recognized certifications from Google and Meta.", gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600" }
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
    tools: ["ChatGPT", "Midjourney", "Canva", "WordPress", "Google Ads", "Meta Ads", "Zapier"],
    faqs: [
      { question: "Do I need prior experience?", answer: "No, this course starts from the basics." },
      { question: "Is this course practical?", answer: "Yes, completely hands-on with real projects." },
      { question: "Will I get job support?", answer: "Yes, we provide placement assistance." }
    ]
  },

  "react-js-full-stack-development": {
    title: "React JS Full Stack Development Course",
    subtitle: "Master Frontend, Backend & Full Stack Web Development",
    tagline: "Master Frontend, Backend & Full Stack Web Development",
    description: "In today's digital-first world, businesses demand fast, scalable, and highly interactive web applications. The React JS Full Stack Developer Program at Digital Ghuru is designed to transform beginners into industry-ready developers by combining frontend excellence with powerful backend development.",
    format: "Online & Offline Campuses",
    duration: "4 to 6 Months",
    batchInfo: "New Batches Starting Soon | 7 Modules",
    location: "Online & Offline Campuses",
    originalPrice: "—",
    discountedPrice: "Contact Us",
    usps: [],
    overviewLearnings: [
      "Master modern frontend development with React JS",
      "Build highly scalable backends with Node.js and Express",
      "Design and manage NoSQL databases with MongoDB",
      "Create full-stack applications with user authentication",
      "Understand industry standard workflows using Git & GitHub",
      "Gain exposure to agile development practices and real client requirements"
    ],
    overviewDescription: [
      "This program is not just about learning coding — it's about building real-world products, solving business problems, and becoming job-ready with confidence.",
      "Unlike traditional courses, this program emphasizes hands-on implementation over theory, real-time project experience, industry tools and workflows, and a problem-solving approach. This program is designed to simulate real IT company workflows."
    ],
    designedToHelp: {
      title: "What Makes This Program Unique?",
      description: "We focus on building strong technical foundations while offering practical exposure to actual industry requirements.",
      benefits: [
        { iconName: "Code2", title: "Learn by building real applications", description: "Skip the theory and start coding from day one. Build interactive web applications.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { iconName: "BriefcaseBusiness", title: "Work on industry-based assignments", description: "Solve real business problems using modern MERN stack technologies.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { iconName: "Users", title: "Practice coding with mentorship guidance", description: "Get code reviews and personalized feedback from industry professionals.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { iconName: "TerminalSquare", title: "Get exposure to agile practices", description: "Understand real client requirements and collaborate efficiently.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    numberedFeatures: {
      title: "Why React Full Stack?",
      description: "React has become the backbone of modern frontend development, used by top companies to build high-performance user interfaces. When combined with backend technologies like Node.js, it forms a powerful full stack ecosystem.",
      features: [
        { num: "01", iconName: "Globe2", title: "High Demand", description: "High demand in global and Indian IT job market.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { num: "02", iconName: "Blocks", title: "Independent Building", description: "Ability to build complete applications independently.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { num: "03", iconName: "Rocket", title: "Faster Development", description: "Faster development with reusable components.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { num: "04", iconName: "LayoutTemplate", title: "Strong Ecosystem", description: "Continuous growth and immense community support.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    whyDigitalGhuru: {
      title: "AI-Powered Development",
      reasons: [
        { num: "01", iconName: "Cpu", title: "Code Writing", description: "Writing code using AI assistance for faster development", color: "border-brand-blue bg-blue-50 text-brand-blue", numBg: "bg-surface-dark text-white", dotColor: "bg-brand-blue" },
        { num: "02", iconName: "Search", title: "Debugging", description: "Efficiently finding and fixing bugs using AI tools", color: "border-orange-300 bg-orange-50 text-brand-orange", numBg: "bg-brand-orange text-white", dotColor: "bg-brand-orange" },
        { num: "03", iconName: "RefreshCcw", title: "Automation", description: "Automating repetitive tasks to focus on logic", color: "border-emerald-300 bg-emerald-50 text-emerald-600", numBg: "bg-emerald-500 text-white", dotColor: "bg-emerald-500" },
        { num: "04", iconName: "TrendingUp", title: "Productivity", description: "Improving overall developer productivity using AI", color: "border-red-300 bg-red-50 text-red-600", numBg: "bg-red-500 text-white", dotColor: "bg-red-500" },
      ]
    },
    whoIsThisForData: [
      { role: "Entrepreneurs", iconName: "TrendingUp", desc: "An all-inclusive program designed to empower your entrepreneurial journey in the digital world.", points: ["Build a strong online presence for your business", "Generate quality leads and increase sales", "Stay ahead using AI-powered marketing strategies"], gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", dotColor: "bg-blue-500" },
      { role: "Professionals", iconName: "Briefcase", desc: "A career-focused program to help you upgrade your skills and grow in the digital space.", points: ["Learn in-demand digital marketing & AI skills", "Transition into high-growth digital roles", "Enhance your career opportunities and salary potential"], gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", dotColor: "bg-emerald-500" },
      { role: "Students", iconName: "GraduationCap", desc: "A complete beginner-friendly program to kickstart your digital marketing career.", points: ["Gain practical, job-ready skills", "Work on real-time projects and build your portfolio", "Prepare for interviews and career opportunities"], gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", dotColor: "bg-amber-500" },
      { role: "Freelancers", iconName: "Laptop", desc: "A growth-oriented program to help you scale your freelancing career.", points: ["Expand your service offerings with digital marketing", "Attract high-paying clients globally", "Build a consistent and scalable income stream"], gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", dotColor: "bg-rose-500" }
    ],
    highlightsData: [
      { iconName: "Code2", title: "End-to-End Training", description: "Full Stack Development Training from UI design to scalable backend architecture.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
      { iconName: "Laptop2", title: "80% Practical Learning", description: "Project-based learning with a focus on real-time assignments and projects.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
      { iconName: "Bot", title: "AI-Powered Workflow", description: "Learn how AI tools are integrated into modern development workflows.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
      { iconName: "BriefcaseBusiness", title: "Placement Assistance", description: "Get internship and placement support after successful program completion.", gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600" },
      { iconName: "Users", title: "Expert Designed", description: "Industry-Oriented Curriculum Designed by Experts who work in top tech companies.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      { iconName: "Workflow", title: "Lifetime Support", description: "Lifetime Learning & Support Access to keep up with new technology changes.", gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600" }
    ],
    curriculum: [
      { module: "Module 1: Web Development Fundamentals", topics: ["Structuring content using semantic HTML", "Styling modern layouts using CSS (Flexbox & Grid)", "Creating responsive designs for mobile & desktop", "Introduction to JavaScript for interactivity"] },
      { module: "Module 2: Advanced JavaScript Programming", topics: ["ES6+ concepts (arrow functions, destructuring, modules)", "Execution context & closures", "DOM manipulation for dynamic UI", "Event-driven programming", "Asynchronous JavaScript (Promises, Async/Await)"] },
      { module: "Module 3: React JS – Frontend Mastery", topics: ["Component-based architecture", "JSX syntax and rendering logic", "Props & state management", "React Hooks (useState, useEffect)", "Routing for multi-page navigation", "API integration in React apps"] },
      { module: "Module 4: Backend Development with Node.js", topics: ["Node.js architecture and event loop", "Express.js for server creation", "Building RESTful APIs", "Middleware and request handling", "Error handling and debugging"] },
      { module: "Module 5: Database Management (MongoDB)", topics: ["NoSQL vs SQL concepts", "MongoDB collections and documents", "CRUD operations", "Schema design and validation", "Integration with backend"] },
      { module: "Module 6: Full Stack Application Development", topics: ["Connecting React with APIs", "Authentication & authorization systems", "State management across applications", "Deployment (hosting live apps)"] },
      { module: "Module 7: Capstone Project", topics: ["E-commerce application", "Admin dashboard system", "Booking or service platform"] }
    ],
    tools: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS", "Postman", "Vercel & Render"],
    categorizedToolsData: [
      {
        title: "Frontend\nDevelopment:",
        description: "You will learn how to design responsive and visually appealing user interfaces.",
        bgClass: "bg-white",
        textClass: "text-[#0d2f62]",
        items: [
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg", className: "col-span-3 mt-4" }
        ]
      },
      {
        title: "Backend\nDevelopment:",
        description: "Learn how to build powerful server-side applications.",
        bgClass: "bg-[#ffe358]",
        textClass: "text-[#0d2f62]",
        items: [
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg", className: "invert" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
          { iconSvg: <CloudCog className="w-12 h-12 text-[#0383cd]" />, name: "REST API", className: "col-span-3 mt-4 text-[#0383cd]" }
        ]
      },
      {
        title: "Database\nManagement:",
        description: "Database Management is the organized storage and handling of data.",
        bgClass: "bg-[#ffe358]",
        textClass: "text-[#0d2f62]",
        items: [
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" },
          { iconSvg: <Database className="w-12 h-12 text-[#0383cd]" />, name: "NoSQL", className: "text-[#0383cd]" }
        ]
      },
      {
        title: "Development\nTools:",
        description: "Development Tools are software used to create, test, and maintain applications.",
        bgClass: "bg-white",
        textClass: "text-[#0d2f62]",
        items: [
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
          { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" }
        ]
      }
    ],
    faqs: [
      { question: "Do I need prior experience?", answer: "No, this course starts from the basics and assumes zero prior coding knowledge." },
      { question: "Is this course practical?", answer: "Yes, 80% of the learning is practical and project-based." },
      { question: "Will I get job support?", answer: "Yes, we provide internship and placement assistance." }
    ]
  }
};
