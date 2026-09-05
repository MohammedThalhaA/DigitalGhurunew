"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

import FAQAccordion from "@/components/sections/FAQAccordion";
import SimpleAccordion from "@/components/sections/SimpleAccordion";
import Button from "@/components/ui/Button";
import { useCourseGate } from "@/components/shared/useCourseGate";

import HeroSection from "@/components/sections/course/HeroSection";
import StatsBanner from "@/components/sections/course/StatsBanner";
import NextBatchGrid from "@/components/sections/course/NextBatchGrid";
import WhyUsDifferentiators from "@/components/sections/course/WhyUsDifferentiators";
import FeesAndInclusions from "@/components/sections/course/FeesAndInclusions";
import ComparisonTable from "@/components/sections/course/ComparisonTable";
import AIToolsCurriculum from "@/components/sections/course/AIToolsCurriculum";
import CourseCurriculum from "@/components/sections/course/CourseCurriculum";
import PlacementReportTable from "@/components/sections/course/PlacementReportTable";
import FreelanceSuccessStats from "@/components/sections/course/FreelanceSuccessStats";
import PlacementProcess from "@/components/sections/course/PlacementProcess";
import TrainersProfile from "@/components/sections/course/TrainersProfile";
import StudentReviewsGrid from "@/components/sections/course/StudentReviewsGrid";
import ContactAndMap from "@/components/sections/course/ContactAndMap";
import MediaAndFAQ from "@/components/sections/course/MediaAndFAQ";
import EnrollmentProcess from "@/components/sections/course/EnrollmentProcess";

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
    location: "Anna Nagar | Nungambakkam | Korattur |Online & Offline Campuses",
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
,
  "creative-design-and-video-editing": {
    "title": "Advanced Creative Design & Video Editing Program with AI",
    "subtitle": "Master Visual Design, Branding & Professional Video Editing",
    "description": "Learn to create stunning digital creatives, edit high-performing videos, build complete brand assets, and confidently work on client projects.",
    "format": "Online & Offline Campuses",
    "duration": "2 to 3 Months",
    "batchInfo": "New Batches Starting Soon | 16 Modules",
    "location": "Online & Offline Campuses",
    "originalPrice": "—",
    "discountedPrice": "Contact Us",
    "usps": [
        "Live Interactive Classes",
        "Industry Expert Trainers",
        "Hands-on Real-Time Projects",
        "AI Tools & Industry Exposure",
        "Placement Guidance & Career Support",
        "Beginner-Friendly Curriculum"
    ],
    "whoIsThisFor": [
        {
            "role": "Graphic Designer",
            "desc": "Design high-quality digital assets.",
            "points": [
                "Master Adobe tools",
                "Create branding elements"
            ]
        },
        {
            "role": "Video Editor",
            "desc": "Edit professional videos.",
            "points": [
                "Learn Premiere Pro",
                "Create reels and ads"
            ]
        },
        {
            "role": "Freelancer",
            "desc": "Work with global clients.",
            "points": [
                "Build a portfolio",
                "Learn client management"
            ]
        },
        {
            "role": "Content Creator",
            "desc": "Create viral social media content.",
            "points": [
                "Use AI for faster workflows",
                "Design engaging content"
            ]
        }
    ],
    "curriculum": [
        {
            "module": "Design Fundamentals",
            "topics": [
                "Principles of Design",
                "Color Theory",
                "Typography Basics",
                "Layout & Composition",
                "Visual Hierarchy"
            ]
        },
        {
            "module": "Design Thinking & Creative Strategy",
            "topics": [
                "Design Thinking Process",
                "Creative Research",
                "Audience Psychology",
                "Content Planning",
                "Visual Communication"
            ]
        },
        {
            "module": "Adobe Photoshop Fundamentals",
            "topics": [
                "Photoshop Interface",
                "Layers & Tools",
                "Selection Techniques",
                "Image Retouching",
                "Basic Poster Design"
            ]
        },
        {
            "module": "Advanced Photoshop",
            "topics": [
                "Photo Manipulation",
                "Advanced Retouching",
                "Mockup Design",
                "Creative Effects",
                "Advertisement Creatives"
            ]
        },
        {
            "module": "Adobe Illustrator Vector Design",
            "topics": [
                "Illustrator Interface",
                "Pen Tool Mastery",
                "Vector Shapes",
                "Logo Creation",
                "Icon Design"
            ]
        },
        {
            "module": "Branding & Visual Identity",
            "topics": [
                "Logo Systems",
                "Brand Color Palette",
                "Typography Systems",
                "Brand Guidelines",
                "Visual Identity Kit"
            ]
        },
        {
            "module": "Social Media Creative Design",
            "topics": [
                "Post Design",
                "Carousel Design",
                "Story Creatives",
                "Ad Creatives",
                "Content Branding"
            ]
        },
        {
            "module": "Canva Design Mastery",
            "topics": [
                "Canva Interface",
                "Templates & Layouts",
                "Brand Kit",
                "Marketing Creatives",
                "Presentation Design"
            ]
        },
        {
            "module": "Advertising Creative Design",
            "topics": [
                "Ad Psychology",
                "Conversion Design",
                "CTA Placement",
                "Offer Creatives"
            ]
        },
        {
            "module": "Video Editing Fundamentals",
            "topics": [
                "Video Editing Basics",
                "Cuts & Transitions",
                "Storytelling",
                "Audio Syncing",
                "Color Grading Basics"
            ]
        },
        {
            "module": "Advanced Video Editing",
            "topics": [
                "Cinematic Workflows",
                "Special Effects",
                "Multicam Editing",
                "Advanced Audio Mixing",
                "Export Settings"
            ]
        },
        {
            "module": "Motion Graphics & Animation",
            "topics": [
                "Animation Basics",
                "Keyframing",
                "Text Animation",
                "Visual Effects",
                "Tracking"
            ]
        },
        {
            "module": "Reels & Short Video Editing",
            "topics": [
                "Viral Content Formats",
                "Engagement Hooks",
                "Fast-Paced Editing",
                "Captions & Subtitles",
                "Platform Optimization"
            ]
        },
        {
            "module": "AI-Powered Creative Workflows",
            "topics": [
                "AI Design Tools",
                "AI Video Editing",
                "Automated Subtitles",
                "AI Voiceovers",
                "Workflow Optimization"
            ]
        },
        {
            "module": "Portfolio Development",
            "topics": [
                "Portfolio Building",
                "Case Studies",
                "Showreel Creation",
                "Behance/Dribbble Setup",
                "Personal Branding"
            ]
        },
        {
            "module": "Freelancing & Client Handling",
            "topics": [
                "Finding Clients",
                "Project Management",
                "Pricing & Contracts",
                "Communication Skills",
                "Client Feedback"
            ]
        }
    ],
    "outcomes": [
        "Create stunning digital creatives",
        "Edit high-performing videos",
        "Build complete brand assets",
        "Work on client projects confidently",
        "Unlock freelance opportunities",
        "Use AI to speed up creative workflows"
    ],
    "tools": [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Canva",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "CapCut",
        "Figma",
        "AI Design Tools"
    ],
    "faqs": [
        {
            "question": "Is this program for absolute beginners?",
            "answer": "Yes, this program is designed for absolute beginners with a step-by-step structured creative learning approach."
        },
        {
            "question": "Will I learn both design and video editing?",
            "answer": "Yes, the program covers graphic design, branding, social media design, as well as video editing, motion graphics, and short-form video content creation."
        },
        {
            "question": "Do you provide placement support?",
            "answer": "Yes, we provide placement guidance, portfolio development, and career support for job roles and freelance opportunities."
        }
    ]
},
  "data-science-with-ai": {
    "title": "Advanced Data Science with AI Program",
    "subtitle": "Master Data Analysis, Machine Learning & AI",
    "description": "Learn to analyze complex data, build predictive models, and leverage artificial intelligence to solve real-world business problems.",
    "format": "Online & Offline Campuses",
    "duration": "4 to 6 Months",
    "batchInfo": "New Batches Starting Soon | 14 Modules",
    "location": "Online & Offline Campuses",
    "originalPrice": "—",
    "discountedPrice": "Contact Us",
    "usps": [
        "Industry-Relevant Curriculum",
        "Hands-on Real-Time Projects",
        "Expert Trainers",
        "AI & Machine Learning Focus",
        "Placement Guidance",
        "Portfolio Building"
    ],
    "whoIsThisFor": [
        {
            "role": "Data Enthusiast",
            "desc": "Start a career in data.",
            "points": [
                "Learn Python and SQL",
                "Understand data visualization"
            ]
        },
        {
            "role": "Software Developer",
            "desc": "Transition to AI/ML.",
            "points": [
                "Master machine learning algorithms",
                "Build AI models"
            ]
        },
        {
            "role": "Business Analyst",
            "desc": "Upgrade your analytical skills.",
            "points": [
                "Learn predictive analytics",
                "Master data storytelling"
            ]
        },
        {
            "role": "Students & Graduates",
            "desc": "Kickstart your career.",
            "points": [
                "Build a strong portfolio",
                "Get placement support"
            ]
        }
    ],
    "curriculum": [
        {
            "module": "Introduction to Data Science",
            "topics": [
                "What is Data Science?",
                "Data Science Lifecycle",
                "Applications of Data Science",
                "Data Ethics",
                "Career Paths"
            ]
        },
        {
            "module": "Python for Data Science",
            "topics": [
                "Python Basics",
                "Data Structures",
                "Control Flow",
                "Functions & Modules",
                "Object-Oriented Programming"
            ]
        },
        {
            "module": "Data Manipulation with Pandas",
            "topics": [
                "Introduction to Pandas",
                "Series & DataFrames",
                "Data Cleaning",
                "Handling Missing Values",
                "Data Aggregation"
            ]
        },
        {
            "module": "Data Visualization",
            "topics": [
                "Matplotlib",
                "Seaborn",
                "Plotly",
                "Interactive Dashboards",
                "Data Storytelling"
            ]
        },
        {
            "module": "Statistical Foundations",
            "topics": [
                "Descriptive Statistics",
                "Inferential Statistics",
                "Probability Distributions",
                "Hypothesis Testing",
                "A/B Testing"
            ]
        },
        {
            "module": "SQL for Data Analysis",
            "topics": [
                "Relational Databases",
                "SQL Queries",
                "Joins & Subqueries",
                "Window Functions",
                "Database Management"
            ]
        },
        {
            "module": "Machine Learning Basics",
            "topics": [
                "Supervised Learning",
                "Unsupervised Learning",
                "Model Evaluation",
                "Overfitting & Underfitting",
                "Cross-Validation"
            ]
        },
        {
            "module": "Supervised Learning Algorithms",
            "topics": [
                "Linear Regression",
                "Logistic Regression",
                "Decision Trees",
                "Random Forests",
                "Support Vector Machines"
            ]
        },
        {
            "module": "Unsupervised Learning Algorithms",
            "topics": [
                "K-Means Clustering",
                "Hierarchical Clustering",
                "Principal Component Analysis (PCA)",
                "Anomaly Detection"
            ]
        },
        {
            "module": "Deep Learning Foundations",
            "topics": [
                "Artificial Neural Networks",
                "Backpropagation",
                "Activation Functions",
                "Optimization Algorithms",
                "Introduction to Keras/TensorFlow"
            ]
        },
        {
            "module": "Natural Language Processing (NLP)",
            "topics": [
                "Text Processing",
                "Sentiment Analysis",
                "Word Embeddings",
                "Transformers",
                "LLMs (Large Language Models)"
            ]
        },
        {
            "module": "Computer Vision",
            "topics": [
                "Image Processing",
                "Convolutional Neural Networks (CNNs)",
                "Object Detection",
                "Image Classification",
                "Transfer Learning"
            ]
        },
        {
            "module": "AI & Generative Models",
            "topics": [
                "Introduction to GenAI",
                "Prompt Engineering",
                "Fine-tuning Models",
                "AI Applications in Business",
                "Ethical AI"
            ]
        },
        {
            "module": "Capstone Project & Portfolio",
            "topics": [
                "End-to-End ML Project",
                "Model Deployment",
                "GitHub Portfolio",
                "Resume Building",
                "Mock Interviews"
            ]
        }
    ],
    "outcomes": [
        "Analyze and interpret complex datasets",
        "Build predictive machine learning models",
        "Develop AI-powered applications",
        "Create interactive data visualizations",
        "Master Python, SQL, and ML libraries",
        "Deploy models to production"
    ],
    "tools": [
        "Python",
        "SQL",
        "Pandas & NumPy",
        "Scikit-Learn",
        "TensorFlow & Keras",
        "Tableau / PowerBI",
        "Jupyter Notebooks",
        "Git & GitHub"
    ],
    "faqs": [
        {
            "question": "Do I need programming experience to join?",
            "answer": "While prior programming experience is helpful, we start with Python basics, making it accessible for beginners who are willing to put in the effort."
        },
        {
            "question": "What kind of projects will I work on?",
            "answer": "You will work on real-world datasets involving predictive modeling, natural language processing, computer vision, and building interactive dashboards."
        },
        {
            "question": "Is AI covered in this course?",
            "answer": "Yes, the course covers Deep Learning, NLP, Computer Vision, and Generative AI concepts."
        }
    ]
},
  "react-js-full-stack-development": {
    "title": "React JS Full Stack Development Program",
    "subtitle": "Master Frontend, Backend & Full Stack Web Development",
    "description": "Learn to build scalable, modern web applications from scratch using React, Node.js, Express, and MongoDB.",
    "format": "Online & Offline Campuses",
    "duration": "4 to 6 Months",
    "batchInfo": "New Batches Starting Soon | 15 Modules",
    "location": "Online & Offline Campuses",
    "originalPrice": "—",
    "discountedPrice": "Contact Us",
    "usps": [
        "MERN Stack Mastery",
        "Real-World Project Development",
        "Industry Expert Instructors",
        "Code Reviews & Mentorship",
        "Placement Assistance",
        "Modern Web Technologies"
    ],
    "whoIsThisFor": [
        {
            "role": "Beginner Coders",
            "desc": "Start your web development journey.",
            "points": [
                "Learn HTML, CSS, JS",
                "Build your first website"
            ]
        },
        {
            "role": "Frontend Developers",
            "desc": "Upgrade to Full Stack.",
            "points": [
                "Learn Node.js & MongoDB",
                "Master API integration"
            ]
        },
        {
            "role": "Students & Graduates",
            "desc": "Get job-ready skills.",
            "points": [
                "Build a strong GitHub portfolio",
                "Prepare for technical interviews"
            ]
        },
        {
            "role": "Freelancers",
            "desc": "Build complete web apps for clients.",
            "points": [
                "End-to-end development",
                "Deployment and hosting"
            ]
        }
    ],
    "curriculum": [
        {
            "module": "Web Development Fundamentals",
            "topics": [
                "How the Web Works",
                "HTML5 Basics",
                "CSS3 Styling",
                "Responsive Design",
                "Flexbox & Grid"
            ]
        },
        {
            "module": "JavaScript Essentials",
            "topics": [
                "Variables & Data Types",
                "Functions & Scope",
                "DOM Manipulation",
                "ES6+ Features",
                "Asynchronous JavaScript (Promises, Async/Await)"
            ]
        },
        {
            "module": "Advanced JavaScript",
            "topics": [
                "Closures",
                "Prototypes",
                "Classes",
                "Modules",
                "Error Handling"
            ]
        },
        {
            "module": "React JS Basics",
            "topics": [
                "Introduction to React",
                "JSX",
                "Components & Props",
                "State & Lifecycle",
                "Handling Events"
            ]
        },
        {
            "module": "Advanced React Concepts",
            "topics": [
                "React Hooks (useState, useEffect)",
                "Custom Hooks",
                "Context API",
                "React Router",
                "Performance Optimization"
            ]
        },
        {
            "module": "State Management",
            "topics": [
                "Redux Fundamentals",
                "Redux Toolkit",
                "Zustand / Recoil (Overview)",
                "Async Actions with Redux Thunk"
            ]
        },
        {
            "module": "Frontend Tooling & Styling",
            "topics": [
                "Webpack & Vite",
                "Tailwind CSS",
                "Styled Components",
                "Material UI / Chakra UI",
                "Version Control with Git"
            ]
        },
        {
            "module": "Backend Development with Node.js",
            "topics": [
                "Introduction to Node.js",
                "NPM & Packages",
                "File System Operations",
                "Event Loop",
                "Building a Simple Server"
            ]
        },
        {
            "module": "Express JS Framework",
            "topics": [
                "Routing",
                "Middleware",
                "Handling Requests & Responses",
                "RESTful API Design",
                "Error Handling in Express"
            ]
        },
        {
            "module": "Database Management with MongoDB",
            "topics": [
                "NoSQL Concepts",
                "MongoDB Setup",
                "CRUD Operations",
                "Mongoose ODM",
                "Data Modeling & Relationships"
            ]
        },
        {
            "module": "Authentication & Authorization",
            "topics": [
                "User Authentication Flow",
                "JWT (JSON Web Tokens)",
                "Password Hashing (Bcrypt)",
                "Role-Based Access Control",
                "OAuth Integration"
            ]
        },
        {
            "module": "API Integration & Frontend Connectivity",
            "topics": [
                "Fetch API & Axios",
                "Handling API Responses",
                "CORS",
                "Data Fetching Strategies",
                "Error Handling in UI"
            ]
        },
        {
            "module": "Deployment & DevOps Basics",
            "topics": [
                "Hosting Frontend (Vercel, Netlify)",
                "Hosting Backend (Render, Heroku)",
                "Database Hosting (MongoDB Atlas)",
                "Environment Variables",
                "CI/CD Concepts"
            ]
        },
        {
            "module": "Testing & Quality Assurance",
            "topics": [
                "Unit Testing (Jest)",
                "Component Testing (React Testing Library)",
                "API Testing (Postman)",
                "Debugging Techniques"
            ]
        },
        {
            "module": "Final Capstone Project",
            "topics": [
                "Project Planning & Architecture",
                "Full Stack Implementation",
                "Code Review",
                "Deployment",
                "Portfolio Presentation"
            ]
        }
    ],
    "outcomes": [
        "Build responsive, modern user interfaces with React",
        "Develop robust backend APIs with Node.js and Express",
        "Manage databases effectively using MongoDB",
        "Implement secure authentication systems",
        "Deploy full-stack applications to the cloud",
        "Collaborate using Git and GitHub"
    ],
    "tools": [
        "HTML5, CSS3, JavaScript",
        "React JS",
        "Node.js",
        "Express JS",
        "MongoDB",
        "Git & GitHub",
        "Tailwind CSS",
        "Postman",
        "Vercel & Render"
    ],
    "faqs": [
        {
            "question": "Do I need to know JavaScript before joining?",
            "answer": "The course includes a JavaScript essentials module, so beginners can join, but having a basic understanding of programming concepts will help you grasp advanced topics faster."
        },
        {
            "question": "What stack will we learn?",
            "answer": "The course focuses on the MERN stack: MongoDB, Express, React, and Node.js, which is one of the most popular tech stacks in the industry."
        },
        {
            "question": "Will I build a complete project?",
            "answer": "Yes, you will build multiple smaller projects during the modules and one large Full Stack Capstone project at the end of the course."
        }
    ]
}
};

/* ─── Premium Landing Page ─── */
export default function CoursePage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;
  const course = courseMap[slug];

  const { triggerAction, GateModalComponent } = useCourseGate(course?.title || "");

  if (!course) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4 text-[var(--tw-colors-ink-900)]">Course Not Found</h1>
        <p className="body-lg mb-8 text-ink-500">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" href="/">
          Back to Home
        </Button>
      </div>
    );
  }

  const isDigitalMarketing = course.title.includes("Digital Marketing");

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <HeroSection course={course} />
      <StatsBanner course={course} />
      <NextBatchGrid course={course} />
      <WhyUsDifferentiators course={course} />
      <FeesAndInclusions course={course} />
      <ComparisonTable course={course} />
      {isDigitalMarketing ? <AIToolsCurriculum /> : <CourseCurriculum course={course} />}
      <PlacementReportTable course={course} />
      {isDigitalMarketing && <FreelanceSuccessStats />}
      <PlacementProcess />
      <TrainersProfile course={course} />
      <StudentReviewsGrid course={course} />
      <ContactAndMap course={course} />
      <MediaAndFAQ course={course} />
      <EnrollmentProcess />
      
      <GateModalComponent />
    </main>
  );
}
