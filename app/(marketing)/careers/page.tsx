"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Bot,
  TrendingUp,
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  Briefcase,
  Send,
  CheckCircle2,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: "performance-marketing",
    title: "Senior Performance Marketing Executive",
    department: "Paid Media",
    experience: "2 - 5 Years",
    location: "Chennai Campus",
    type: "Full-Time",
    description: "We are looking for an analytical Paid Ads expert to formulate client campaign strategy, run Google & Meta ad setups, and mentor advanced mock agency batches.",
    responsibilities: [
      "Plan, set up, and optimize search, social, and display campaigns on Google, Meta, & LinkedIn Ads.",
      "Analyze analytics funnels, tag parameters, and conversion metrics to maintain campaign ROAS.",
      "Collaborate with the training division to run mock agency ad campaigns and review student-led pitches.",
      "Prepare monthly presentation decks showing clear performance stats and optimization pathways."
    ],
    requirements: [
      "In-depth command of Google Analytics 4, Meta Ads Manager, and Google Tag Manager.",
      "Proven track record of managing monthly budgets of ₹2L+ with positive ROI metrics.",
      "Strong communication and leadership skills to train and coordinate fresh recruits & students.",
      "Any Google Ads Search/Display or Meta Blueprint certification is highly preferred."
    ]
  },
  {
    id: "seo-trainer",
    title: "SEO Specialist & Mentor",
    department: "Organic Growth",
    experience: "1 - 3 Years",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    description: "Join us to shape organic visibility. You will manage client SEO audits, drive content marketing pipelines, and lead classroom sessions on technical and off-page SEO.",
    responsibilities: [
      "Execute full website audits (screaming frog audits, structural tags, internal linking structures).",
      "Draft content keyword maps and keyword clusters for client blogs and landing pages.",
      "Conduct daily interactive classes teaching SEO basics, keyword research, and on-page tactics.",
      "Direct outreach link-building campaigns and coordinate guest posting distributions."
    ],
    requirements: [
      "Experience with Ahrefs, SEMrush, Screaming Frog, and Google Search Console.",
      "Strong understanding of PageSpeed parameters and core web vitals optimization.",
      "A passion for teaching and explaining complex search ranking concepts to freshers.",
      "Basic understanding of Answer Engine Optimization (AEO) and AI overview optimization."
    ]
  },
  {
    id: "content-writer",
    title: "Creative Content Strategist & Prompt Writer",
    department: "Content & Copy",
    experience: "1 - 2 Years",
    location: "Chennai Campus",
    type: "Full-Time",
    description: "Write copy that hooks and convert! You will handle copy for campaigns, social channels, and train students to leverage generative AI writing tools safely.",
    responsibilities: [
      "Draft creative landing page copies, ad copies for paid channels, and marketing emails.",
      "Manage social media calendars, writing engaging hooks and descriptions for Instagram & LinkedIn.",
      "Incorporate generative AI prompts (ChatGPT, Claude) to scale research and format briefs.",
      "Review student copy submissions and teach prompt structures (CRAFT framework)."
    ],
    requirements: [
      "Portfolio showcasing landing page, email campaign, or creative social copywriting.",
      "Command over AI content drafting, editing, and prompt structures.",
      "Impeccable grammar, storytelling capacity, and active interest in digital trends.",
      "Familiarity with Canva or basic visual layout formatting is a plus."
    ]
  },
  {
    id: "sales-counselor",
    title: "Admissions Counselor & Sales Associate",
    department: "Admissions",
    experience: "0 - 2 Years (Freshers welcome)",
    location: "Chennai Campus",
    type: "Full-Time",
    description: "Interact with eager minds and help them find their perfect career path. You will address course queries, coordinate demo sessions, and manage lead registers.",
    responsibilities: [
      "Handle inbound course queries via phone, WhatsApp, and face-to-face walk-ins.",
      "Counsel students & parents on career pathways, syllabus structures, and placement opportunities.",
      "Coordinate weekly free demo classes and track attendee conversions in the CRM register.",
      "Engage with alumni networks to request success stories and program feedback reviews."
    ],
    requirements: [
      "Excellent interpersonal, counseling, and phone conversation skills.",
      "Empathetic listening skills to align students' ambitions to our course offerings.",
      "Basic familiarity with CRM software registers, Excel, and office tools.",
      "Prior experience in educational admissions sales or counseling is a big advantage."
    ]
  }
];

const benefits = [
  {
    icon: Bot,
    title: "AI-First Workflows",
    description: "We are an AI-integrated workplace. Master cutting-edge LLMs, prompting frameworks, and automated integrations in your daily tasks.",
  },
  {
    icon: Users,
    title: "Agency Environment",
    description: "Work alongside our active digital agency vertical, echoVME. Gain access to real-time client accounts, live spends, and campaign briefs.",
  },
  {
    icon: TrendingUp,
    title: "Accelerated Growth",
    description: "Double your skillset inside a year. We support you to lead premium courses, publish case studies, and present at industry meetups.",
  },
  {
    icon: Heart,
    title: "Employee Well-being",
    description: "Enjoy flexible hybrid setups, monthly performance bonuses, medical insurance benefits, and regular team bonding dinners.",
  },
];

export default function CareersPage() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "marketing",
    bio: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleJob = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-ink-50 min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-950 to-brand-blue/20 py-20 md:py-28 text-white text-center">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-45 -left-45 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 space-y-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-gold text-ink-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            We Are Hiring
          </span>
          <h1 className="heading-xl text-white max-w-3xl mx-auto leading-tight font-display">
            Build the Future of Digital Marketing Education
          </h1>
          <p className="body-lg max-w-2xl mx-auto text-ink-300">
            Work with India&apos;s leading agency-style digital marketing institute. Shape eager minds, manage real client campaigns, and scale your expertise alongside top industry leaders.
          </p>
          <div className="pt-4">
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm shadow-md shadow-brand-blue/20 transition-all duration-200"
            >
              Explore Open Openings
            </a>
          </div>
        </div>
      </section>

      {/* ─── Why Join Us (Culture & Benefits) ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">OUR CULTURE</p>
            <h2 className="heading-lg mb-4 text-ink-900">
              Why You&apos;ll Love Working Here
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-ink-500">
              We value execution, quick adaptation, and collaborative mentorship. Here are the core benefits of becoming a member of the DigitalGhuru crew:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-2xl border border-ink-100 bg-ink-50/50 hover:bg-white hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Open Roles Section ─── */}
      <section className="section-padding bg-ink-50" id="open-roles">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">JOB OPENINGS</p>
            <h2 className="heading-lg mb-4 text-ink-900">
              Active Career Opportunities
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-ink-500">
              Find a role that matches your skills. Click on any opening to view details, responsibilities, and requirements.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-ink-100 overflow-hidden shadow-sm hover:shadow-card hover:border-ink-200 transition-all duration-200"
                >
                  {/* Job Header Summary */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-ink-100 text-ink-600 text-[10px] font-bold uppercase tracking-wider">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-ink-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-400 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          Exp: {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-brand-blue text-sm font-semibold">
                      <span>{isExpanded ? "Show Less" : "View Details"}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Details Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-ink-100"
                      >
                        <div className="p-6 md:p-8 bg-ink-50/20 space-y-6">
                          <p className="text-sm text-ink-600 leading-relaxed">
                            {job.description}
                          </p>

                          {/* Responsibilities */}
                          <div className="space-y-3">
                            <h4 className="font-heading text-sm font-bold text-ink-900 uppercase tracking-wide">
                              Key Responsibilities:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-ink-500 leading-relaxed">
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div className="space-y-3">
                            <h4 className="font-heading text-sm font-bold text-ink-900 uppercase tracking-wide">
                              Requirements & Qualifications:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-ink-500 leading-relaxed">
                              {job.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Apply CTA link */}
                          <div className="pt-4 flex justify-start">
                            <a
                              href="#speculative-form"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  category: job.id,
                                });
                              }}
                              className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs shadow-md shadow-brand-blue/20 transition-all duration-200"
                            >
                              Apply For This Opening
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Hiring Process Roadmap ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">HOW WE HIRE</p>
            <h2 className="heading-lg mb-4 text-ink-900">Our Recruitment Funnel</h2>
            <p className="body-lg max-w-2xl mx-auto text-ink-500">
              We respect your time. Our simplified recruitment process focuses on practical talent evaluations and fast communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-brand-blue/20 -z-10" />

            {[
              { step: "01", label: "Submit Details", desc: "Share your resume, link your portfolio or past agency campaigns." },
              { step: "02", label: "Skills Check", desc: "Show your execution capacity via a short audit task or creative brief." },
              { step: "03", label: "Personal Pitch", desc: "Interact with our lead mentors to verify cultural fit and goals." },
              { step: "04", label: "Offer & Onboard", desc: "Get details, sign agreements, and align with your batch." }
            ].map((process, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-brand-blue text-white font-display font-extrabold text-sm flex items-center justify-center shadow-md">
                  {process.step}
                </div>
                <h3 className="font-heading text-base font-bold text-ink-900">{process.label}</h3>
                <p className="text-xs text-ink-500 leading-relaxed max-w-xs">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Speculative Form Section ─── */}
      <section className="section-padding bg-ink-50" id="speculative-form">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="careers-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="text-center pb-2">
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-ink-900 mb-2">
                        Submit Your Application
                      </h3>
                      <p className="text-xs md:text-sm text-ink-500 max-w-md mx-auto">
                        Don&apos;t find an active opening matching your domain? Submit a speculative application and we will reach out if a role opens.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="phone">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>

                      {/* Job Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="category">
                          Position of Interest *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 font-medium"
                        >
                          <option value="performance-marketing">Senior Performance Marketing Executive</option>
                          <option value="seo-trainer">SEO Specialist & Mentor</option>
                          <option value="content-writer">Creative Content Strategist</option>
                          <option value="sales-counselor">Admissions Counselor</option>
                          <option value="development">Web / Tech Development</option>
                          <option value="other">Other Speculative Role</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief Cover Note */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="bio">
                        Short Cover Pitch (Tell us why you want to join us)
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Briefly describe your experience and campaign accomplishments..."
                        className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 font-body resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-blue text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit My Application
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="careers-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-bold text-ink-900">
                        Application Submitted!
                      </h3>
                      <p className="text-sm text-ink-500 max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-ink-900">{formData.name}</span>. We have successfully registered your application for review and will contact you at <span className="font-semibold text-ink-900">{formData.email}</span> if a matching role is found.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            category: "marketing",
                            bio: "",
                          });
                        }}
                        className="px-6 py-2.5 rounded-xl border border-ink-200 text-xs font-semibold text-ink-600 hover:bg-ink-50 transition-colors"
                      >
                        Submit another application
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
