import React from "react";
import { Flame } from "lucide-react";

interface StreakWidgetProps {
  count: number;
  bestStreak: number;
  days: { label: string; active: boolean }[];
}

export default function StreakWidget({ count, bestStreak, days }: StreakWidgetProps) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 mb-6 shadow-card hover:shadow-card-hover hover:border-amber-500/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Decorative Accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 pb-6 border-b border-ink-50 relative z-10">
        <div>
          <h3 className="font-heading text-xs font-semibold text-amber-500 uppercase tracking-[0.15em] mb-1.5 group-hover:text-amber-600 transition-colors duration-200">Learning Streak</h3>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <Flame className="h-5 w-5 text-amber-600" />
            </div>
            <span className="font-display text-3xl font-bold text-ink-900">{count} Day{count !== 1 ? "s" : ""}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-brand-orange font-bold uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            Best: {bestStreak}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-1.5 relative z-10">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1">
            <div 
              className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${
                day.active 
                  ? "bg-gradient-to-br from-amber-400 to-brand-orange text-white shadow-md transform -translate-y-1" 
                  : "bg-ink-50 text-transparent border-2 border-ink-100"
              }`}
            >
              {day.active && <Flame className="h-4 w-4" />}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${day.active ? "text-brand-orange" : "text-ink-400"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
