"use client";

import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Button from "@/components/ui/Button";
import { Heart, Coffee, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";

/* PLACEHOLDER: Replace with real campus/life images */
const galleryImages = [
  { src: "/Gallery Images/IMG-20260831-WA0002.jpg", alt: "Digital Ghuru classroom lecture session" },
  { src: "/Gallery Images/IMG-20260831-WA0003.jpg", alt: "Students learning search engine marketing strategy" },
  { src: "/Gallery Images/IMG-20260831-WA0005.jpg", alt: "Interactive agency-style training session" },
  { src: "/Gallery Images/IMG-20260831-WA0006.jpg", alt: "Practical digital campaign setup presentation" },
  { src: "/Gallery Images/IMG-20260831-WA0007.jpg", alt: "Students pitching digital campaign performance" },
  { src: "/Gallery Images/IMG-20260831-WA0008.jpg", alt: "Collaborative group discussion in progress" },
  { src: "/Gallery Images/IMG-20260831-WA0009.jpg", alt: "Digital marketing workshop on live campaigns" },
  { src: "/Gallery Images/IMG-20260831-WA0010.jpg", alt: "Creative brainstorm session for social media strategy" },
  { src: "/Gallery Images/IMG-20260831-WA0011.jpg", alt: "Students working on search engine optimization tools" },
  { src: "/Gallery Images/IMG-20260831-WA0014.jpg", alt: "Expert mentor explaining digital funnel logic" },
  { src: "/Gallery Images/IMG-20260831-WA0015.jpg", alt: "Mentorship and career counseling discussion" },
  { src: "/Gallery Images/IMG-20260831-WA0016.jpg", alt: "Interactive tech session on generative AI marketing" },
  { src: "/Gallery Images/IMG-20260831-WA0017.jpg", alt: "Alumni sharing placement interview tips" },
  { src: "/Gallery Images/IMG-20260831-WA0018.jpg", alt: "Hands-on SEO audit lab practice" },
  { src: "/Gallery Images/IMG-20260831-WA0019.jpg", alt: "Celebrating student project completions" },
  { src: "/Gallery Images/IMG-20260831-WA0020.jpg", alt: "Mentorship guidance for digital campaign launch" },
];

const cultureHighlights = [
  {
    icon: Heart,
    title: "Supportive Community",
    description: "A welcoming environment where every student feels at home and supported in their learning journey.",
  },
  {
    icon: Coffee,
    title: "Engaging Sessions",
    description: "Interactive classes that feel more like collaborative workshops than traditional lectures.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We encourage creative thinking and experimenting with the latest tools and techniques.",
  },
  {
    icon: Users,
    title: "Lifelong Network",
    description: "Join a thriving alumni community that continues to support and inspire long after graduation.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LifeAtPage() {
  return (
    <>
      <HeroSection
        eyebrow="LIFE AT DIGITALGHURU"
        title="Experience the Digital Ghuru"
        titleHighlight="Difference"
        description="More than a classroom — a vibrant community of learners, creators, and future industry leaders."
        primaryCta={{ label: "Join Our Community", href: "/contact" }}
      />

      {/* Photo Gallery */}
      <PhotoGallery
        eyebrow="CAMPUS LIFE"
        title="Moments That Define Us"
        images={galleryImages}
      />

      {/* Culture Highlights */}
      <section className="section-padding bg-ink-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">OUR CULTURE</p>
            <h2 className="heading-lg">What Makes Us Special</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {cultureHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="bg-white rounded-2xl border border-ink-100 p-6 md:p-8 shadow-card"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-brand-blue/90 py-16 md:py-20">
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-lg text-white mb-4">
            Come Experience It Yourself
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Visit our campus, attend a free demo class, and see what life at Digital Ghuru is really like.
          </p>
          <Button variant="accent" size="lg" href="/contact">
            Book a Campus Visit
          </Button>
        </div>
      </section>
    </>
  );
}
