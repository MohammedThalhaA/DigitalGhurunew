"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/components/cards/TestimonialCard";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photoUrl?: string;
}

interface TestimonialCarouselProps {
  title?: string;
  eyebrow?: string;
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  title = "What Our Students Say",
  eyebrow = "TESTIMONIALS",
  testimonials,
}: TestimonialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="section-padding bg-ink-50">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="heading-lg">{title}</h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-xl border border-ink-200 flex items-center justify-center text-ink-500 hover:bg-brand-blue hover:border-brand-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-xl border border-ink-200 flex items-center justify-center text-ink-500 hover:bg-brand-blue hover:border-brand-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
            >
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                photoUrl={t.photoUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
