"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialCard from "@/components/cards/TestimonialCard";
import Button from "@/components/ui/Button";

/* PLACEHOLDER: Replace with real student success stories */
const successStories = [
  {
    quote: "Digital Ghuru transformed my career path. The hands-on training gave me real confidence. I got hired at a top agency within weeks of finishing.",
    name: "Student Name",
    role: "Digital Marketing Executive — Agency",
  },
  {
    quote: "The lessons match what employers look for. I went from zero marketing knowledge to managing big ad budgets.",
    name: "Student Name",
    role: "Performance Marketing Manager — Startup",
  },
  {
    quote: "Joining Digital Ghuru was the best career move I made. The mentors care about every student. They guide you every step of the way.",
    name: "Student Name",
    role: "SEO Lead — E-commerce Company",
  },
  {
    quote: "I worked in traditional sales for years. Digital Ghuru helped me shift to digital fast. The AI modules gave me a big edge.",
    name: "Student Name",
    role: "Digital Marketing Manager — MNC",
  },
  {
    quote: "I got my first paid client while taking the course. The live projects gave me a portfolio that clients loved.",
    name: "Student Name",
    role: "Freelance Digital Marketer",
  },
  {
    quote: "The placement team helped me prepare for interviews. Within two weeks of finishing, I had three solid job offers.",
    name: "Student Name",
    role: "Social Media Strategist — Brand Agency",
  },
];

const staggerContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpItem: any = {
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
        description="Read inspiring stories from our students. See how they built rewarding marketing careers from scratch."
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
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-brand-blue/90 section-padding">
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-lg text-white mb-4">
            Your Success Story Starts Here
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join hundreds of thriving graduates. Take the first step toward your new career today.
          </p>
          <Button variant="accent" size="lg" href="/contact">
            Enroll Now
          </Button>
        </div>
      </section>
    </>
  );
}
