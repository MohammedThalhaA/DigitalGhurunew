"use client";

import React from "react";
import TimelineCard from "@/components/cards/TimelineCard";

interface TimelineMilestone {
  year: string;
  milestone: string;
}

interface TimelineProps {
  title?: string;
  eyebrow?: string;
  milestones: TimelineMilestone[];
}

export default function Timeline({
  title = "Our Journey",
  eyebrow = "MILESTONES",
  milestones,
}: TimelineProps) {
  return (
    <section className="section-padding bg-ink-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="heading-lg">{title}</h2>
        </div>

        {/* Desktop: Horizontal scroll-snap */}
        <div className="hidden md:block relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-blue/20" />

          <div
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {milestones.map((m, idx) => (
              <TimelineCard key={idx} year={m.year} milestone={m.milestone} />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-brand-blue/20" />

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className="absolute -left-[22px] top-6 h-3 w-3 rounded-full bg-brand-blue border-2 border-white shadow-sm" />

                <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5">
                  <div className="font-display text-2xl font-bold text-brand-blue mb-2">
                    {m.year}
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {m.milestone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
