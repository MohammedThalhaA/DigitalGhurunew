"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialCard from "@/components/cards/TestimonialCard";
import Button from "@/components/ui/Button";

/* PLACEHOLDER: Replace with real student success stories */
const successStories = [
  {
    quote: "Digital Ghuru completely transformed my career. The hands-on training and placement support helped me land my dream job at a leading agency within weeks of completing the course.",
    name: "Student Name",
    role: "Digital Marketing Executive — Agency",
  },
  {
    quote: "The curriculum was exactly what the industry needs. I went from knowing nothing about digital marketing to managing campaigns for major brands.",
    name: "Student Name",
    role: "Performance Marketing Manager — Startup",
  },
  {
    quote: "Best decision I ever made. The mentors didn't just teach — they genuinely cared about each student's progress and career goals.",
    name: "Student Name",
    role: "SEO Lead — E-commerce Company",
  },
  {
    quote: "After years in a traditional marketing role, Digital Ghuru helped me make the switch to digital. The AI modules were especially valuable.",
    name: "Student Name",
    role: "Digital Marketing Manager — MNC",
  },
  {
    quote: "I started freelancing while still in the course. The practical projects gave me a portfolio that impressed clients immediately.",
    name: "Student Name",
    role: "Freelance Digital Marketer",
  },
  {
    quote: "The placement cell worked tirelessly to match me with the right opportunity. Within 2 weeks of completing the course, I had 3 job offers.",
    name: "Student Name",
    role: "Social Media Strategist — Brand Agency",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <HeroSection
        eyebrow="SUCCESS STORIES"
        title="Real Students, Real"
        titleHighlight="Transformations"
        description="Hear from our alumni who turned their passion for digital marketing into thriving careers."
        primaryCta={{ label: "Start Your Story", href: "/contact" }}
      />

      {/* Stories Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {successStories.map((story, idx) => (
              <motion.div key={idx} variants={fadeUpItem}>
                <TestimonialCard {...story} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-brand-blue/90 py-16 md:py-20">
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-lg text-white mb-4">
            Your Success Story Starts Here
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join the ranks of our successful alumni. Enroll in our next batch today.
          </p>
          <Button variant="accent" size="lg" href="/contact">
            Enroll Now
          </Button>
        </div>
      </section>
    </>
  );
}
