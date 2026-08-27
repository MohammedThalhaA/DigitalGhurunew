"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  CheckCircle,
  Award,
} from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import StatCard from "@/components/cards/StatCard";
import LocationCard from "@/components/cards/LocationCard";
import FounderCard from "@/components/cards/FounderCard";
import Timeline from "@/components/sections/Timeline";
import Button from "@/components/ui/Button";



/* ─── Placeholder Data — Replace with real DigitalGhuru content ─── */

const stats = [
  { value: 5000, suffix: "+", label: "Students Trained", color: "blue" as const },
  { value: 95, suffix: "%", label: "Placement Rate", color: "gold" as const },
  { value: 50, suffix: "+", label: "Industry Partners", color: "orange" as const },
  { value: 8, suffix: "+", label: "Years of Excellence", color: "blue" as const },
  { value: 100, suffix: "+", label: "Expert Sessions", color: "gold" as const },
  { value: 15, suffix: "+", label: "Courses Offered", color: "orange" as const },
];

const locations = [
  {
    name: "Chennai Campus",
    address: "123 Anna Salai, Teynampet, Chennai, Tamil Nadu 600018",
    phone: "+91 98765 43210",
    /* PLACEHOLDER: Add real campus image URL */
  },
];

const founders = [
  {
    name: "Founder Name",
    role: "Founder & Chief Mentor",
    bio: "A visionary digital marketing professional dedicated to making quality digital education accessible to everyone. With over a decade of industry experience, they have trained thousands of students and built DigitalGhuru into a leading institute.",
    credentials: [
      "Google Certified Digital Marketing Expert",
      "10+ years in digital marketing industry",
      "Trained 5000+ students across India",
      "Speaker at major digital marketing summits",
    ],
    socialStats: [
      { platform: "LinkedIn", count: "50K+" },
      { platform: "YouTube", count: "100K+" },
    ],
  },
];

const milestones = [
  { year: "2016", milestone: "DigitalGhuru founded with a vision to democratize digital marketing education in India." },
  { year: "2017", milestone: "First 100 students graduated with 90%+ placement rate. Launched online courses." },
  { year: "2018", milestone: "Partnered with Google and Meta for dual certification programs." },
  { year: "2019", milestone: "Expanded campus. Crossed 1,000 students trained milestone." },
  { year: "2020", milestone: "Successfully transitioned to hybrid learning during COVID. Launched AI modules." },
  { year: "2021", milestone: "3,000+ students trained. Recognized as a top digital marketing institute." },
  { year: "2022", milestone: "Launched advanced program with agency-style training on live campaigns." },
  { year: "2023", milestone: "5,000+ alumni network. Industry partnerships expanded to 50+ companies." },
  { year: "2024", milestone: "AI-integrated curriculum launch. Multiple new short-term courses added." },
];

const whyUsChecklist = [
  "Industry-aligned curriculum updated every quarter",
  "Small batch sizes for personalized attention",
  "Real client projects and live campaign training",
  "Dedicated placement cell with 100% interview guarantee",
  "AI-integrated learning modules",
  "Lifetime access to course materials and alumni network",
  "Guest lectures by industry leaders",
  "Google, Meta, and HubSpot certification preparation",
];

const missionPoints = [
  {
    title: "Practical Training",
    description: "We believe in learning by doing. Every student works on real projects for real clients.",
  },
  {
    title: "Accessible Education",
    description: "Making quality digital marketing education accessible to students from all backgrounds.",
  },
  {
    title: "Industry Readiness",
    description: "Preparing students not just for their first job, but for a lifelong career in digital marketing.",
  },
  {
    title: "Innovation First",
    description: "Staying ahead of industry trends and integrating emerging technologies into our curriculum.",
  },
];

/* ─── Animation Variants ─── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── About Us Page ─── */
export default function AboutUsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSection
        eyebrow="ABOUT DIGITALGHURU"
        title="Empowering the Next Generation of"
        titleHighlight="Digital Marketers"
        description="Since our founding, we've been on a mission to bridge the gap between traditional education and the skills the digital industry actually demands."
        primaryCta={{ label: "Explore Our Courses", href: "/courses/digital-marketing-chennai" }}
        secondaryCta={{ label: "Meet Our Team", href: "#founders" }}
      />

      {/* ─── Vision Block ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-brand-blue" />
                </div>
                <p className="eyebrow">OUR VISION</p>
              </div>
              <h2 className="heading-lg mb-6">
                To Be India&apos;s Most Trusted Digital Marketing Institute
              </h2>
              <p className="body-lg">
                We envision a future where every aspiring marketer has access to world-class digital marketing education, 
                practical training on live campaigns, and a clear pathway to a rewarding career in the digital industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-blue/5 via-brand-gold/5 to-brand-orange/5 flex items-center justify-center border border-ink-100"
            >
              <div className="text-center p-8">
                <Eye className="h-16 w-16 text-brand-blue/30 mx-auto mb-4" />
                <p className="font-heading text-ink-400 text-sm">
                  {/* PLACEHOLDER: Add vision image */}
                  Vision image placeholder
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Mission Block ─── */}
      <section className="section-padding bg-ink-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-brand-orange" />
              </div>
              <p className="eyebrow">OUR MISSION</p>
            </div>
            <h2 className="heading-lg mb-4">
              Transforming Digital Marketing Education
            </h2>
            <p className="body-lg max-w-3xl mx-auto">
              Our mission is to provide industry-relevant, practical digital marketing training that prepares students 
              for the challenges and opportunities of the modern marketing landscape.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {missionPoints.map((point, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="bg-white rounded-2xl border border-ink-100 p-6 shadow-card"
              >
                <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                  {idx + 1}. {point.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Achievement Counters ─── */}
      <section className="bg-white border-y border-ink-100">
        <div className="section-container">
          <div className="text-center pt-12 mb-4">
            <p className="eyebrow mb-3">BY THE NUMBERS</p>
            <h2 className="heading-lg">Our Impact So Far</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-ink-100">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Campus Locations ─── */}
      <section className="section-padding bg-ink-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">OUR CAMPUS</p>
            <h2 className="heading-lg">Where Learning Happens</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {locations.map((loc, idx) => (
              <LocationCard key={idx} {...loc} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Us Checklist ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">WHY DIGITALGHURU</p>
              <h2 className="heading-lg mb-8">
                Everything You Need to Succeed
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="space-y-4"
              >
                {whyUsChecklist.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpItem}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-ink-700 text-sm md:text-base">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-blue/5 via-brand-gold/5 to-brand-orange/5 flex items-center justify-center border border-ink-100">
              <div className="text-center p-8 space-y-3">
                <Award className="h-16 w-16 text-brand-gold mx-auto" />
                <p className="font-heading text-ink-400 text-sm">
                  {/* PLACEHOLDER: Add "why us" visual */}
                  Why Us visual placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founders / Trainers ─── */}
      <section id="founders" className="section-padding bg-ink-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">LEADERSHIP</p>
            <h2 className="heading-lg mb-4">Meet Our Mentors</h2>
            <p className="body-lg max-w-2xl mx-auto">
              Our team of seasoned professionals brings years of real-world experience to every class.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {founders.map((founder, idx) => (
              <FounderCard key={idx} {...founder} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <Timeline milestones={milestones} />

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-brand-blue/90 py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-lg text-white mb-4">
            Begin Your Digital Marketing Journey Today
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join DigitalGhuru and become part of a thriving community of digital marketing professionals.
          </p>
          <Button variant="accent" size="lg" href="/contact">
            Book a Free Demo Class
          </Button>
        </div>
      </section>
    </>
  );
}
