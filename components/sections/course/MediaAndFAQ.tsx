"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Newspaper } from "lucide-react";
import Image from "next/image";

const mediaLogos = [
  "NewsGhhuru"
];

const faqs = [
  {
    q: "What is the salary after a AI-Powered digital marketing course?",
    a: "For freshers, the average starting salary ranges from Rs 3 LPA to Rs 6 LPA. For professionals with 2+ years of prior experience, packages range from Rs 6 LPA to Rs 12 LPA, depending on their performance in the course and the interview."
  },
  {
    q: "Do you provide placement guarantee?",
    a: "We provide 100% placement assistance. We have a dedicated CAT (Career Advisory Team) that prepares your resume, conducts mock interviews, and sends you for interviews until you get placed. We do not offer fake \"guarantees\" because clearing the interview ultimately depends on your performance."
  },
  {
    q: "Is digital marketing a good career?",
    a: "The industry is home to major IT hubs, e-commerce brands, and thousands of startups. The demand for skilled digital marketers, especially those who know AI and automation, far exceeds the supply. It is one of the fastest-growing sectors in the city."
  },
  {
    q: "Can I do this course offline?",
    a: "Yes! We run weekend offline batches at our campus in Purasaiwakkam. It's a great opportunity to network directly with Our Expert Mentors, Our Expert Mentors, and your peers."
  },
  {
    q: "Do I need coding skills to learn digital marketing?",
    a: "No coding skills are required. Digital marketing relies on strategy, copywriting, analytics, and using platforms (like Meta Ads or Google Ads). If you can use a computer and are willing to learn, you can succeed in this field."
  }
];

export default function MediaAndFAQ({ course }: { course?: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const courseTitle = course?.title || "AI-Powered Digital Marketing Course";
  const displayFaqs = course?.faqs && course.faqs.length > 0 ? course.faqs : faqs;

  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Premium glowing background blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] opacity-70 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] opacity-70 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Media Section */}
        <div className="mb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-ink-100 text-orange-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm">
            <Newspaper className="w-4 h-4" />
            <span>Digital Ghuru in the News</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
            Featured By <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Top Media</span>
          </h2>
          <p className="text-ink-600 mb-12 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
            Digital Ghuru has been featured on NewsGhhuru and other local publications.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-ink-100 p-2 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group flex items-center justify-center"
            >
              <div className="relative w-72 h-32 md:w-80 md:h-36 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/images/news-ghuru-logo.jpg" 
                  alt="News Ghuru" 
                  fill 
                  className="object-contain mix-blend-multiply" 
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border border-ink-100 text-orange-600 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm uppercase">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
              {courseTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">FAQs</span>
            </h2>
            <p className="text-ink-600 text-lg font-medium leading-relaxed">
              These are the most common questions we receive from students considering our {courseTitle}. If your question isn't here, call us or visit our Main Campus directly.
            </p>
          </div>

          <div className="space-y-4">
            {displayFaqs.map((faq: any, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-blue/30 bg-white shadow-xl shadow-brand-blue/5 scale-[1.01]' : 'border-ink-200 bg-white hover:border-ink-300'}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left group"
                  >
                    <span className={`font-heading font-bold text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-brand-blue' : 'text-ink-900 group-hover:text-brand-blue'}`}>
                      {faq.q || faq.question}
                    </span>
                    <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand-blue text-white shadow-md' : 'bg-ink-50 text-ink-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue'}`}>
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-brand-blue/5 border-t border-brand-blue/10"
                      >
                        <div className="px-6 py-6 md:px-8 md:py-8 text-ink-700 font-medium leading-relaxed">
                          {faq.a || faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
