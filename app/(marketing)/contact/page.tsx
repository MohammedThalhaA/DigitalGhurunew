"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import LocationCard from "@/components/cards/LocationCard";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";

const offices = [
  {
    title: "Anna Nagar Office",
    address: "45, A Block, 3rd Avenue, Kumaran Nagar, Anna Nagar East, Chennai - 600102.",
    phone: "+91 8825948859",
    email: "contact@digitalghuru.com",
    mapQuery: "45, A Block, 3rd Avenue, Kumaran Nagar, Anna Nagar East, Chennai 600102",
  },
  {
    title: "Ameerpet Office",
    address: "F8, First Floor, Kallu Compound Rd, Pratap Nagar, Nagarjuna Nagar colony, Yella Reddy Guda, Ameerpet, Hyderabad - 500073.",
    phone: "+91 8825948859",
    email: "contact@digitalghuru.com",
    mapQuery: "F8, First Floor, Kallu Compound Rd, Pratap Nagar, Nagarjuna Nagar colony, Yella Reddy Guda, Ameerpet, Hyderabad 500073",
  },
  {
    title: "Korattur Office",
    address: '2nd Floor, No. 1A, "Gurudev Complex", S1, 57th St, Venkatraman Nagar, Korattur, Chennai, Tamil Nadu 600050',
    phone: "+91 8825948859",
    email: "contact@digitalghuru.com",
    mapQuery: "Gurudev Complex, S1, 57th St, Venkatraman Nagar, Korattur, Chennai 600050",
  },
];

const contactFaqs = [
  {
    question: "How do I book a free demo class?",
    answer: "You can book a free demo class by filling out the form on this page, calling us directly, or visiting our campus. We offer both online and offline demo sessions.",
  },
  {
    question: "What are your office hours?",
    answer: "Our campuses are open Monday through Saturday, from 9:00 AM to 7:00 PM IST. You can also reach our support team via email or WhatsApp outside of these hours.",
  },
  {
    question: "Can I visit the campus before enrolling?",
    answer: "Absolutely! We strongly encourage prospective students to visit our campus, meet the mentors, and experience our agency-style learning environment firsthand.",
  },
  {
    question: "How quickly will I hear back after submitting an inquiry?",
    answer: "Our admissions and support teams typically respond within 2-4 hours during business hours. For immediate assistance, please call us directly.",
  },
  {
    question: "Do you offer corporate training or agency partnerships?",
    answer: "Yes, we collaborate with leading agencies and brands for corporate training and hiring partnerships. Please select 'Partnerships' in the form subject to connect with our B2B team.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all required fields.");
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
    <>
      {/* 1. Dedicated Hero Section */}
      <HeroSection
        trustBadges={[
          { label: "24/7 Support" },
          { label: "Free Career Counseling" },
        ]}
        eyebrow="CONTACT US"
        title="Get in Touch with"
        titleHighlight="Digital Ghuru"
        description="Whether you have questions about our curriculum, need career guidance, or want to explore corporate partnerships, our team is ready to help you take the next step."
        imageUrl="/Gallery Images/IMG-20260831-WA0015.jpg"
        primaryCta={{ label: "Send a Message", href: "#messaging-form" }}
      />

      {/* 2. Quick Contact Cards Grid */}
      <section className="section-padding bg-ink-50 border-y border-ink-100">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Admissions */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group bg-white rounded-3xl p-8 border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue transition-all duration-300">
                <PhoneCall className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">Talk to Admissions</h3>
              <p className="text-base text-ink-500 mb-6 flex-1">Call us directly to get immediate answers about courses, fees, and batches.</p>
              <a href="tel:+918825948859" className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:text-brand-orange transition-colors">
                +91 88259 48859 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>

            {/* General Inquiries */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group bg-white rounded-3xl p-8 border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue transition-all duration-300">
                <Mail className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">General Inquiries</h3>
              <p className="text-base text-ink-500 mb-6 flex-1">Drop us an email for partnerships, support, or detailed syllabus requests.</p>
              <a href="mailto:contact@digitalghuru.com" className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:text-brand-orange transition-colors">
                contact@digitalghuru.com <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>

            {/* Visit Campus */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group bg-white rounded-3xl p-8 border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue transition-all duration-300">
                <MapPin className="h-6 w-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">Visit Our Campus</h3>
              <p className="text-base text-ink-500 mb-6 flex-1">Experience our agency-style setup in person. Open Mon-Sat, 9AM to 7PM.</p>
              <a href="#locations" className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:text-brand-orange transition-colors">
                View Locations <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Rich Messaging Form */}
      <section className="section-padding bg-white relative overflow-hidden" id="messaging-form">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <p className="eyebrow">MESSAGE US</p>
              <h2 className="heading-lg text-ink-900">
                How Can We Help You Succeed?
              </h2>
              <p className="body-lg text-ink-500">
                Fill out the form with your inquiry, and our specialized team will get back to you within 24 hours. For faster resolution, please select the most relevant subject.
              </p>
            </motion.div>

            {/* Right Column Form */}
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
                          Send a Direct Message
                        </h3>
                        <p className="text-base text-ink-500">
                          We ensure your message reaches the right department.
                        </p>
                      </div>

                      {errorMsg && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name *"
                            className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address *"
                            className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 font-medium text-ink-500"
                          >
                            <option value="general">Subject: General Inquiry</option>
                            <option value="demo">Subject: Book a Free Demo</option>
                            <option value="courses">Subject: Course Information & Fees</option>
                            <option value="partnership">Subject: Corporate Partnerships</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Message *"
                          className="w-full px-4 py-3 rounded-xl border border-ink-100 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors bg-ink-50/30 resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-heading text-2xl font-bold text-ink-900">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-base text-ink-500 max-w-sm mx-auto leading-relaxed">
                          Thank you for reaching out, <span className="font-semibold text-ink-900">{formData.name}</span>. Our team will review your message and get back to you shortly at <span className="font-semibold text-ink-900">{formData.email}</span>.
                        </p>
                      </div>
                      <div className="pt-6">
                        <button
                          onClick={() => setIsSuccess(false)}
                          className="px-6 py-2.5 rounded-xl border border-ink-200 text-xs font-semibold text-ink-600 hover:bg-ink-50 transition-colors"
                        >
                          Send another message
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

      {/* 4. Campus Locations */}
      <section className="section-padding bg-ink-50/50" id="locations">
        <div className="section-container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-ink-900 flex items-center justify-center gap-5">
              <img
                src="/logo-final dG.webp"
                alt="Digital Ghuru Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
              Digital Ghuru Address
            </h2>
          </div>
          
          <div className="space-y-24">
            {offices.map((office, idx) => (
              <div key={idx}>
                <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-ink-900 mb-10 underline decoration-2 underline-offset-8 decoration-brand-blue">
                  {office.title}
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                  {/* Left Column: Info Cards */}
                  <div className="space-y-6 flex flex-col justify-between">
                    {/* Address Card */}
                    <div className="bg-white p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center h-full min-h-[220px]">
                      <h4 className="font-heading text-xl font-bold text-ink-900 mb-4">Address</h4>
                      <p className="text-ink-700 font-medium leading-relaxed max-w-sm">{office.address}</p>
                    </div>
                    
                    {/* Call / Email Cards */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-6 shadow-[0_4px_24px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center h-[180px]">
                        <h4 className="font-heading text-xl font-bold text-ink-900 mb-3">Call Us</h4>
                        <p className="text-ink-700 font-medium">{office.phone}</p>
                      </div>
                      <div className="bg-white p-6 shadow-[0_4px_24px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center h-[180px]">
                        <h4 className="font-heading text-xl font-bold text-ink-900 mb-3">Email Us</h4>
                        <p className="text-ink-700 font-medium">{office.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Map */}
                  <div className="h-full min-h-[400px] shadow-[0_4px_24px_rgb(0,0,0,0.04)] bg-white overflow-hidden p-2">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full min-h-[400px] rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact FAQ */}
      <FAQAccordion
        eyebrow="SUPPORT FAQ"
        title="Common Contact Questions"
        items={contactFaqs}
      />
    </>
  );
}
