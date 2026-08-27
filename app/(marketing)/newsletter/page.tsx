"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import { Mail, CheckCircle, Send } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <HeroSection
        eyebrow="NEWSLETTER"
        title="Weekly Marketing"
        titleHighlight="Insights"
        description="Join over 10,000+ marketers, business owners, and students who receive our curated weekly newsletter with the latest trends, frameworks, and tools."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-xl text-center">
          {!subscribed ? (
            <div className="bg-ink-50 rounded-3xl border border-ink-100 p-8 shadow-card text-left">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ink-200">
                <Mail className="h-6 w-6 text-brand-blue" />
                <h2 className="font-display text-xl font-bold text-ink-900">
                  Subscribe to DigitalGhuru Insider
                </h2>
              </div>
              <p className="text-sm text-ink-600 mb-6 leading-relaxed">
                No spam, ever. Only actionable digital marketing strategies, AI tools recommendations, case studies, and career guidance written by our chief mentors.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-heading font-semibold text-ink-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white"
                  />
                </div>
                <Button variant="primary" type="submit" className="w-full flex items-center justify-center gap-2">
                  Subscribe Now
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 rounded-3xl border border-green-200 p-8 text-center animate-scale-in">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-green-800 mb-2">
                You&apos;re Subscribed!
              </h3>
              <p className="text-sm text-green-600 leading-relaxed max-w-md mx-auto">
                Thank you for joining. Please check your inbox for our welcome email and your free digital marketing checklist.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
