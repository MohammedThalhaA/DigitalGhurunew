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
        description="Get smart marketing tips every week. Join over 10,000 readers learning AI tools, growth hacks, and career skills."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-xl text-center">
          {!subscribed ? (
            <div className="bg-ink-50 rounded-3xl border border-ink-100 p-8 shadow-card text-left">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ink-200">
                <Mail className="h-6 w-6 text-brand-blue" />
                <h2 className="font-display text-xl font-bold text-ink-900">
                  Subscribe to Digital Ghuru Insider
                </h2>
              </div>
              <p className="text-base text-ink-600 mb-6 leading-relaxed">
                We never send spam. Each week you get fresh ad tips, free AI prompts, and real marketing case studies.
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
                Thank you for joining. Check your inbox for our welcome email and free marketing checklist.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="section-container max-w-4xl">
          <h2 className="heading-md text-ink-900 mb-6 text-center font-display">What You Get Every Thursday</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">AI Marketing Prompts</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Copy our tested ChatGPT prompts to write ads, emails, and social posts fast.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">Real Case Studies</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                See exact campaign results from Indian brands. Learn what works and what fails.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">Career Tips</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Get interview tips, salary trends, and fresh marketing job openings every week.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
