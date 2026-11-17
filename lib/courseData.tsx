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
  metaDescription?: string;
  ogDescription?: string;
  twitterDescription?: string;
  tagline?: string;
  description: string;
  format: string;
  duration: string;
  batchInfo: string;
  location: string;
  originalPrice: string;
  discountedPrice: string;
  brochureUrl?: string;
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
    metaDescription: "Master AI digital marketing with live campaigns, SEO, ads, automation, and 100% placement support at Digital Ghuru.",
    ogDescription: "Explore our AI digital marketing course with live campaigns, modern AI tools, and placement support at Digital Ghuru.",
    twitterDescription: "Learn AI digital marketing with live ad campaigns, SEO, automations, and placement support at Digital Ghuru.",
    tagline: "The New Digital Marketing + AI Course",
    description: "Learn modern marketing with AI tools. Build core skills. Create live ad campaigns. Grow your career with hands-on practice.",
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
      "Learn the digital ecosystem and buyer journey.",
      "Create AI text, images, and videos with ChatGPT and Midjourney.",
      "Plan high-growth social media campaigns across top platforms.",
      "Master the Instagram algorithm, trending reels, and influencer ads.",
      "Build a strong personal brand on LinkedIn to get B2B leads.",
      "Design fast landing pages and high-converting sales funnels.",
      "Automate email and WhatsApp workflows using smart CRM tools.",
      "Run profitable Meta and Google ad campaigns with real ROI.",
      "Build websites in WordPress and rank them with SEO.",
      "Design clean graphics and ads using Canva and AI tools."
    ],
    overviewDescription: [
      "Digital marketing and AI are changing how brands grow. This course gives you a clear roadmap. Build strong marketing basics. Use AI tools to work faster. Launch high-performing campaigns that bring real sales.",
      <span key="1">At Digital Ghuru, we focus on real skills. You will learn how to create content, reach buyers, and convert sales. AI tools like <strong className="text-ink-800">ChatGPT and Midjourney</strong> help you work with speed and confidence.</span>,
      "Our students learn by doing. You will work on live client projects. You will build a verified portfolio. Land in-demand roles as an SEO specialist, ad manager, content creator, or freelancer."
    ],
    designedToHelp: {
      title: "This course is designed to help you",
      description: "At Digital Ghuru, we combine digital marketing with artificial intelligence. This gives you practical skills for real career growth.",
      benefits: [
        { iconName: "Blocks", title: "Build strong marketing foundations", description: "Master marketing fundamentals. Understand the customer journey.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { iconName: "Sparkles", title: "Leverage AI for faster execution", description: "Use modern AI tools to automate work and create content fast.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { iconName: "Rocket", title: "Create high-performing campaigns", description: "Design and launch live campaigns that bring real business sales.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { iconName: "Globe2", title: "Stay ahead in the digital ecosystem", description: "Future-proof your career. Stay updated with the latest AI tools.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    numberedFeatures: {
      title: "Rise of AI in Marketing",
      description: "AI helps brands work faster and smarter. Tools like ChatGPT, Canva, and Google Ads help you create campaigns with speed.",
      features: [
        { num: "01", iconName: "BrainCircuit", title: "Automation to Intelligence", description: "AI helps you make smart decisions with data.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { num: "02", iconName: "FileImage", title: "Content Creation at Scale", description: "Generate text, images, and video ads in seconds.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { num: "03", iconName: "BarChart3", title: "Data-Driven Marketing", description: "Track buyer habits with pinpoint accuracy.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { num: "04", iconName: "UserCog", title: "Personalization", description: "Deliver custom offers to each buyer.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    whyDigitalGhuru: {
      title: "Why Digital Ghuru",
      reasons: [
        { num: "01", iconName: "Search", title: "AI Integration", description: "Hands-on training with top AI tools for content and ads.", color: "border-brand-blue bg-blue-50 text-brand-blue", numBg: "bg-surface-dark text-white", dotColor: "bg-brand-blue" },
        { num: "02", iconName: "PenTool", title: "Practical Learning Approach", description: "Learn by running real-time projects and live ads.", color: "border-orange-300 bg-orange-50 text-brand-orange", numBg: "bg-brand-orange text-white", dotColor: "bg-brand-orange" },
        { num: "03", iconName: "RefreshCcw", title: "Updated Curriculum", description: "Aligned with current hiring needs and AI trends.", color: "border-emerald-300 bg-emerald-50 text-emerald-600", numBg: "bg-emerald-500 text-white", dotColor: "bg-emerald-500" },
        { num: "04", iconName: "Laptop2", title: "Hands-On Experience", description: "Launch real campaigns and build sales funnels.", color: "border-red-300 bg-red-50 text-red-600", numBg: "bg-red-500 text-white", dotColor: "bg-red-500" },
        { num: "05", iconName: "Users", title: "Personal Mentorship", description: "Get 1-on-1 guidance from senior marketing mentors.", color: "border-purple-300 bg-purple-50 text-purple-600", numBg: "bg-purple-500 text-white", dotColor: "bg-purple-500" },
        { num: "06", iconName: "DollarSign", title: "Freelancing & Earning Support", description: "Learn how to win global clients and earn from skills.", color: "border-amber-300 bg-amber-50 text-amber-600", numBg: "bg-amber-500 text-white", dotColor: "bg-amber-500" },
        { num: "07", iconName: "FolderOpen", title: "Portfolio Building", description: "Build verified proof of work to impress hiring teams.", color: "border-cyan-300 bg-cyan-50 text-cyan-600", numBg: "bg-cyan-500 text-white", dotColor: "bg-cyan-500" },
      ]
    },
    whoIsThisForData: [
      { role: "Entrepreneurs", iconName: "TrendingUp", desc: "Grow your business online. Generate quality leads and scale sales with AI marketing tools.", points: ["Build a strong online presence for your business.", "Generate quality leads and increase sales.", "Stay ahead using AI-powered marketing strategies."], gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", dotColor: "bg-blue-500" },
      { role: "Professionals", iconName: "Briefcase", desc: "Upgrade your skills. Transition into high-growth digital roles with higher pay.", points: ["Learn in-demand digital marketing & AI skills.", "Transition into high-growth digital roles.", "Enhance your career opportunities and salary potential."], gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", dotColor: "bg-emerald-500" },
      { role: "Students", iconName: "GraduationCap", desc: "Kickstart your career. Work on live projects, build a portfolio, and clear job interviews.", points: ["Gain practical, job-ready skills.", "Work on real-time projects and build your portfolio.", "Prepare for interviews and career opportunities."], gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", dotColor: "bg-amber-500" },
      { role: "Freelancers", iconName: "Laptop", desc: "Scale your freelance income. Offer in-demand marketing services to global clients.", points: ["Expand your service offerings with digital marketing.", "Attract high-paying clients globally.", "Build a consistent and scalable income stream."], gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", dotColor: "bg-rose-500" }
    ],
    highlightsData: [
      { iconName: "Users", title: "Personal Mentorship", description: "Get 1-on-1 guidance and campaign reviews from mentors.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
      { iconName: "Lightbulb", title: "Practical Learning Approach", description: "Hands-on practice with real client projects and live case studies.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
      { iconName: "Bot", title: "Updated Curriculum with AI", description: "Learn AI prompt engineering, chatbot funnels, and ad tuning.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
      { iconName: "FolderKanban", title: "Portfolio Building", description: "Build a job-ready portfolio that showcases real campaign results.", gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600" },
      { iconName: "BriefcaseBusiness", title: "Freelancing & Earning Support", description: "Learn how to find high-paying clients and set your pricing.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      { iconName: "Award", title: "Industry Certifications", description: "Earn course certificates plus official Google and Meta credentials.", gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600" }
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
    metaDescription: "Master React JS full stack development with Node.js, Express, MongoDB, live capstone projects, and placement support at Digital Ghuru.",
    ogDescription: "Build production-ready web apps with React JS, Node.js, Express, and MongoDB with 1-on-1 mentorship at Digital Ghuru.",
    twitterDescription: "Learn React JS full stack development with live projects, modern web frameworks, and career placement help at Digital Ghuru.",
    tagline: "Master Frontend, Backend & Full Stack Web Development",
    description: "Learn full stack web development with React and Node.js. Build fast web apps. Work on live projects. Get 100% placement support to start your tech career.",
    format: "Online & Offline Campuses",
    duration: "4 to 6 Months",
    batchInfo: "New Batches Starting Soon | 7 Modules",
    location: "Online & Offline Campuses",
    originalPrice: "—",
    discountedPrice: "Contact Us",
    usps: [],
    overviewLearnings: [
      "Build modern user interfaces with React and Tailwind CSS.",
      "Develop scalable backends using Node.js and Express.",
      "Design and manage databases using MongoDB.",
      "Create full-stack web applications with secure user login.",
      "Master team workflows using Git and GitHub.",
      "Solve real business problems using modern agile practices."
    ],
    overviewDescription: [
      "Modern tech firms need fast, scalable web apps. This course helps you become a job-ready full stack developer. Learn both frontend and backend coding with hands-on practice.",
      "You will build real-world software, not just follow theory. Write clean code with Node.js and MongoDB. Create dynamic web apps with React.",
      "Work on live team projects with code reviews from senior developers. Graduate with a strong GitHub portfolio that helps you stand out in tech interviews."
    ],
    designedToHelp: {
      title: "What Makes This Program Unique?",
      description: "We focus on strong technical skills with hands-on exposure to real industry workflows.",
      benefits: [
        { iconName: "Code2", title: "Learn by building real applications", description: "Code from day one. Build interactive web applications.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { iconName: "BriefcaseBusiness", title: "Work on industry-based assignments", description: "Solve real business problems using modern MERN stack tools.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { iconName: "Users", title: "Practice coding with mentorship guidance", description: "Get direct code reviews and feedback from senior engineers.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { iconName: "TerminalSquare", title: "Get exposure to agile practices", description: "Learn agile team workflows and ship production-ready code.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    numberedFeatures: {
      title: "Why React Full Stack?",
      description: "React is the top frontend tool in modern web development. Paired with Node.js, it lets you build full web apps with speed.",
      features: [
        { num: "01", iconName: "Globe2", title: "High Demand", description: "High hiring demand in global and Indian tech firms.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
        { num: "02", iconName: "Blocks", title: "Independent Building", description: "Build complete web applications from start to finish.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
        { num: "03", iconName: "Rocket", title: "Faster Development", description: "Build reusable components for quick development.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
        { num: "04", iconName: "LayoutTemplate", title: "Strong Ecosystem", description: "Benefit from massive community support and modern libraries.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      ]
    },
    whyDigitalGhuru: {
      title: "AI-Powered Development",
      reasons: [
        { num: "01", iconName: "Cpu", title: "Code Writing", description: "Write clean code faster using modern AI developer tools.", color: "border-brand-blue bg-blue-50 text-brand-blue", numBg: "bg-surface-dark text-white", dotColor: "bg-brand-blue" },
        { num: "02", iconName: "Search", title: "Debugging", description: "Find and fix bugs quickly using AI testing tools.", color: "border-orange-300 bg-orange-50 text-brand-orange", numBg: "bg-brand-orange text-white", dotColor: "bg-brand-orange" },
        { num: "03", iconName: "RefreshCcw", title: "Automation", description: "Automate routine coding tasks to focus on app logic.", color: "border-emerald-300 bg-emerald-50 text-emerald-600", numBg: "bg-emerald-500 text-white", dotColor: "bg-emerald-500" },
        { num: "04", iconName: "TrendingUp", title: "Productivity", description: "Boost your day-to-day coding speed and output.", color: "border-red-300 bg-red-50 text-red-600", numBg: "bg-red-500 text-white", dotColor: "bg-red-500" },
      ]
    },
    whoIsThisForData: [
      { role: "Entrepreneurs", iconName: "TrendingUp", desc: "Build your own web platforms and MVPs without hiring outside agencies.", points: ["Build custom web platforms and tools.", "Save costs with in-house product development.", "Iterate quickly on your business ideas."], gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", dotColor: "bg-blue-500" },
      { role: "Professionals", iconName: "Briefcase", desc: "Switch into software engineering with in-demand full-stack skills.", points: ["Master frontend and backend web frameworks.", "Transition into high-paying software roles.", "Boost your career growth in tech."], gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", dotColor: "bg-emerald-500" },
      { role: "Students", iconName: "GraduationCap", desc: "Start your coding career. Build real web apps and land your first developer job.", points: ["Learn coding from the ground up.", "Build a GitHub portfolio with live projects.", "Ace technical rounds and coding tests."], gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", dotColor: "bg-amber-500" },
      { role: "Freelancers", iconName: "Laptop", desc: "Build custom web applications for international freelance clients.", points: ["Deliver full-stack web apps end-to-end.", "Win global projects on freelance platforms.", "Earn higher hourly rates with tech skills."], gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", dotColor: "bg-rose-500" }
    ],
    highlightsData: [
      { iconName: "Code2", title: "End-to-End Training", description: "Complete full stack training from frontend UI to backend databases.", gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600" },
      { iconName: "Laptop2", title: "80% Practical Learning", description: "Project-based training focused on real code and assignments.", gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600" },
      { iconName: "Bot", title: "AI-Powered Workflow", description: "Learn how modern developers use AI tools to code faster.", gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600" },
      { iconName: "BriefcaseBusiness", title: "Placement Assistance", description: "Get internship referrals and dedicated interview preparation.", gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600" },
      { iconName: "Users", title: "Expert Designed", description: "Curriculum built by engineers working in top tech companies.", gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600" },
      { iconName: "Workflow", title: "Lifetime Support", description: "Get ongoing community support and access to updated resources.", gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600" }
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
