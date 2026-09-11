"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, PhoneCall, Mail } from "lucide-react";

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "classroom",
    course: "ai-powered-digital-marketing",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    if (formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="inquiry-form">
      {/* Decorative gradient blur in background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text and Trust Points (Left Column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="eyebrow">ADMISSIONS OPEN</p>
            <h2 className="heading-lg text-ink-900">
              Start Your Digital Marketing Career Today
            </h2>
            <p className="body-lg text-ink-500">
              Have questions about our course fee, duration, classroom location, or placement record? Get in touch with our admissions specialist for a free 1-on-1 counseling session.
            </p>

            {/* Quick Contact Info */}
            <div className="space-y-4 pt-4 border-t border-ink-100">
              <div className="flex items-center gap-4 text-ink-700">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-400 font-semibold uppercase">Call Admissions</p>
                  <a href="tel:+918825948859" className="text-sm font-bold hover:text-brand-blue transition-colors">
                    +91 88259 48859
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-ink-700">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-400 font-semibold uppercase">Email Us</p>
                  <a href="mailto:admissions@digitalghuru.com" className="text-sm font-bold hover:text-brand-blue transition-colors">
                    admissions@digitalghuru.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card (Right Column) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-heading text-xl font-bold text-ink-900 mb-1">
                        Book a Free Demo Seat
                      </h3>
                      <p className="text-sm text-ink-500">
                        Fill in your details below and we will contact you to block your seat.
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
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="form-name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="form-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="form-email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="form-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="form-phone">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="form-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          required
                        />
                      </div>

                      {/* Learning Mode */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="form-mode">
                          Learning Mode *
                        </label>
                        <select
                          id="form-mode"
                          name="mode"
                          value={formData.mode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 font-medium"
                        >
                          <option value="classroom">Classroom (Main Campus)</option>
                          <option value="online">Live Online Interactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Course */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink-700 uppercase" htmlFor="form-course">
                        Course of Interest *
                      </label>
                      <select
                        id="form-course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 font-medium"
                      >
                        <option value="ai-powered-digital-marketing">
                          AI-Powered Digital Marketing Course
                        </option>
                        <option value="react-js-full-stack-development">
                          React JS Full Stack Development Course
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-blue text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Secure My Seat Now
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-bold text-ink-900">
                        Seat Reservation Successful!
                      </h3>
                      <p className="text-sm text-ink-500 max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-ink-900">{formData.name}</span>. An admissions coordinator has reserved your demo seat and will call you at <span className="font-semibold text-ink-900">{formData.phone}</span> within 24 hours.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2.5 rounded-xl border border-ink-200 text-xs font-semibold text-ink-600 hover:bg-ink-50 transition-colors"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
