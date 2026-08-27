import React from "react";

interface TimelineCardProps {
  year: string;
  milestone: string;
}

export default function TimelineCard({ year, milestone }: TimelineCardProps) {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-center">
      <div className="relative bg-white rounded-2xl border border-ink-100 shadow-card p-6 h-full">
        {/* Year */}
        <div className="font-display text-3xl font-bold text-brand-blue mb-3">
          {year}
        </div>
        {/* Milestone */}
        <p className="text-sm text-ink-600 leading-relaxed">{milestone}</p>
        {/* Connector dot */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-brand-blue border-2 border-white shadow-sm" />
      </div>
    </div>
  );
}
