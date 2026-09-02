"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import LocationCard from "@/components/cards/LocationCard";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";

const locations = [
  {
    name: "Anna Nagar Office",
    address: "45, A Block, 3rd Avenue, Kumaran Nagar, Anna Nagar East, Chennai - 600102",
    phone: "+91 8825948859",
  },
];

const contactFaqs = [
  {
    question: "How do I book a free demo class?",
    answer: "Simply fill out the contact form above or call us directly. Our team will schedule a free demo class at your convenience — weekday or weekend.",
  },
  {
    question: "What are your office hours?",
    answer: "Our office is open Monday through Saturday, 9:00 AM to 7:00 PM IST. You can also reach us via email or WhatsApp outside these hours.",
  },
  {
    question: "Can I visit the campus before enrolling?",
    answer: "Absolutely! We encourage campus visits. Call us or fill out the form to schedule a visit and experience our learning environment firsthand.",
  },
  {
    question: "How quickly will I hear back after submitting the form?",
    answer: "Our admissions team typically responds within 2-4 hours during business hours. For immediate assistance, please call us directly.",
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        eyebrow="GET IN TOUCH"
        title="Let's Start Your"
        titleHighlight="Learning Journey"
        description="Have questions? Want to book a free demo class? We're here to help you take the first step."
        primaryCta={{ label: "Call Us Now", href: "tel:+918825948859" }}
      />

      {/* Contact Form + Info */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-md mb-2">Send Us a Message</h2>
              <p className="body-md mb-8">
                Fill out the form below and our team will get back to you within hours.
              </p>

              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-ink-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-ink-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-ink-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-ink-700 mb-1.5">
                    Course Interested In
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm text-ink-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white">
                    <option value="">Select a course</option>
                    <option value="chennai">Digital Marketing — Chennai</option>
                    <option value="online">Online Digital Marketing</option>
                    <option value="advanced">Advanced Program</option>
                    <option value="short-term">Short-term Courses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-ink-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your learning goals..."
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition resize-none"
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-ink-50 rounded-2xl border border-ink-100 p-6 space-y-5">
                <h3 className="font-display text-lg font-bold text-ink-900">
                  Contact Information
                </h3>

                {/* PLACEHOLDER: Replace with real contact info */}
                <div className="space-y-4">
                  <a
                    href="tel:+918825948859"
                    className="flex items-center gap-3 text-sm text-ink-600 hover:text-brand-blue transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-ink-800">Phone</p>
                      <p>+91 88259 48859</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@digitalghuru.com"
                    className="flex items-center gap-3 text-sm text-ink-600 hover:text-brand-blue transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-ink-800">Email</p>
                      <p>hello@digitalghuru.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-sm text-ink-600">
                    <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-ink-800">Office Hours</p>
                      <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-3">
                <Button variant="secondary" className="w-full" href="tel:+918825948859">
                  📞 Call Us Now
                </Button>
                <Button variant="outline" className="w-full" href="https://wa.me/918825948859">
                  💬 WhatsApp Us
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="section-padding bg-ink-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">VISIT US</p>
            <h2 className="heading-lg">Our Campus Locations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {locations.map((loc, idx) => (
              <LocationCard key={idx} {...loc} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <FAQAccordion
        eyebrow="COMMON QUESTIONS"
        title="Frequently Asked Questions"
        items={contactFaqs}
      />
    </>
  );
}
