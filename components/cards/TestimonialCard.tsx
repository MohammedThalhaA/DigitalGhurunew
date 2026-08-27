"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  photoUrl,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-shadow duration-200 p-6 md:p-8 flex flex-col h-full"
    >
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-brand-gold mb-4 shrink-0" />

      {/* Quote Text */}
      <p className="text-ink-600 leading-relaxed text-sm md:text-base flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 overflow-hidden flex items-center justify-center shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display text-sm font-bold text-brand-blue">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-ink-900">
            {name}
          </p>
          <p className="text-xs text-ink-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
