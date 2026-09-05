"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Jibin Kumaren",
    avatar: "https://ui-avatars.com/api/?name=Jibin+Kumaren&background=f0f9ff&color=0284c7",
    text: "I recently completed 4 months AI-Powered digital marketing course from digital ghuru and I must say its a value for money and time spent! The mentors were too good and supported us whenever we got stuck anywhere. I loved this journey from having zero knowledge to gaining confidence in running campaigns."
  },
  {
    name: "Dhriti Thakker",
    avatar: "https://ui-avatars.com/api/?name=Dhriti+Thakker&background=fdf4ff&color=c026d3",
    text: "Digital Ghuru has the best AI-Powered digital marketing course. The training is practical, and the mentors are very helpful. I enjoyed the hands-on projects and real examples. It's perfect for beginners or even for those who want to upskill. Best decision I made."
  },
  {
    name: "Aakash Vasudevan",
    avatar: "https://ui-avatars.com/api/?name=Aakash+Vasudevan&background=f5f3ff&color=7c3aed",
    text: "My Name is Aakash and I just graduated my AI-Powered digital marketing course at Digital Ghuru, and I'm blown away! Their modules are too Good and understanding, covering everything from SEO to social media marketing, Google Ads, and AI."
  },
  {
    name: "Srijan S",
    avatar: "https://ui-avatars.com/api/?name=Srijan+S&background=fffbeb&color=b45309",
    text: "I joined Digital Ghuru as a student of batch 37. It was really a great journey overall... From the course, trainers, and friends I made along the way. The agency-styled practical learning is what separates digital ghuru from all other courses in the market."
  },
  {
    name: "Karthik Gnanasekar",
    avatar: "https://ui-avatars.com/api/?name=Karthik+Gnanasekar&background=f0fdf4&color=15803d",
    text: "I've been learning in digital ghuru for the past 1 month. Only one module have been completed till now and i can confidently say they are the best. If you want practical learning over theory, this is the place."
  },
  {
    name: "Mohamed Raiyan",
    avatar: "https://ui-avatars.com/api/?name=Mohamed+Raiyan&background=eff6ff&color=1d4ed8",
    text: "Learning is up to point and clear understanding of each topic, this is the best digital marketing institute. If you're new to digital marketing, go for this blindly."
  },
  {
    name: "Srinithi jayavel",
    avatar: "https://ui-avatars.com/api/?name=Srinithi+jayavel&background=fdf2f8&color=be185d",
    text: "Best institution for digital marketing! Very practical course with supportive and kind faculty. Highly recommend Digital Ghuru if you are serious about a career in DM."
  },
  {
    name: "kavitha shanmugam",
    avatar: "https://ui-avatars.com/api/?name=kavitha+shanmugam&background=fff7ed&color=c2410c",
    text: "digital ghuru is an awesome place to learn digital marketing. We get immense knowledge from this institution. SEO training was too good in particular."
  }
];

export default function StudentReviewsGrid({ course }: { course?: any }) {
  const isDM = !course || course.title.includes("Digital Marketing");

  // Create a localized copy of reviews so we can modify strings safely
  const displayReviews = reviews.map(review => {
    if (!isDM) {
      return {
        ...review,
        text: review.text.replace(/AI-Powered digital marketing course/gi, course.title)
                         .replace(/digital marketing course/gi, course.title)
                         .replace(/digital marketing/gi, "this")
      };
    }
    return review;
  });

  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAFAFA] via-white/80 to-[#FAFAFA]" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block bg-white border border-ink-100 text-amber-500 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm flex items-center gap-2 mx-auto w-fit">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span>150+ Verified Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
            What Students Say About Digital Ghuru <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">Online & Offline</span>
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            Digital Ghuru has more Google reviews than any other training institute: 150+ verified reviews at 4.7 stars. See why we're the most trusted institute.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
          {displayReviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white border border-ink-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all break-inside-avoid flex flex-col relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-ink-100 group-hover:text-amber-100 transition-colors" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Image 
                  src={review.avatar} 
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full shadow-sm ring-2 ring-white"
                />
                <div>
                  <span className="font-bold text-ink-900 block">{review.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex-grow">
                <p className="text-ink-700 text-sm leading-relaxed font-medium">
                  "{review.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-ink-900 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-ink-900/20 hover:bg-ink-800 transition-colors hover:scale-105 active:scale-95 duration-200">
            Read More Reviews on Google
          </button>
        </div>

      </div>
    </section>
  );
}
