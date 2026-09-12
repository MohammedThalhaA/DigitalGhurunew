"use client";

import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StreakWidgetProps {
  count: number;
  bestStreak: number;
  days: { label: string; active: boolean }[];
  justUpdated?: boolean;
}

export default function StreakWidget({ count, bestStreak, days, justUpdated = false }: StreakWidgetProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (justUpdated) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3000);
    }
  }, [justUpdated]);

  // Generate random embers for the fire effect
  const embers = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 200,
    delay: Math.random() * 0.5,
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <div className="relative">
      <AnimatePresence>
        {showAnimation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Big glowing center flame */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ 
                scale: [0, 1.5, 1.2, 1.4, 0], 
                opacity: [0, 1, 1, 1, 0],
                y: [50, 0, -10, -20, -100],
                rotate: [0, -10, 10, -5, 0]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute text-brand-orange drop-shadow-[0_0_30px_rgba(245,158,11,0.8)]"
            >
              <Flame size={120} fill="#f97316" strokeWidth={1} />
            </motion.div>

            {/* Little floating embers */}
            {embers.map((ember) => (
              <motion.div
                key={ember.id}
                initial={{ scale: 0, opacity: 0, x: 0, y: 20 }}
                animate={{
                  scale: [0, ember.scale, 0],
                  opacity: [0, 1, 0],
                  x: ember.x,
                  y: -150 - Math.random() * 100,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: ember.delay,
                  ease: "easeOut",
                }}
                className="absolute text-amber-400"
              >
                <Flame size={30} fill="#fbbf24" strokeWidth={1} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={false}
        animate={showAnimation ? { scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(245,158,11,0)", "0px 0px 30px rgba(245,158,11,0.5)", "0px 0px 0px rgba(245,158,11,0)"] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 mb-6 shadow-card hover:shadow-card-hover hover:border-amber-500/30 transition-all duration-300"
      >
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
            <motion.div 
              animate={showAnimation && day.active && idx === (new Date().getDay() || 7) - 1 ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${
                day.active 
                  ? "bg-gradient-to-br from-amber-400 to-brand-orange text-white shadow-md transform -translate-y-1" 
                  : "bg-ink-50 text-transparent border-2 border-ink-100"
              }`}
            >
              {day.active && <Flame className="h-4 w-4" />}
            </motion.div>
            <span className={`text-xs font-bold uppercase tracking-wider ${day.active ? "text-brand-orange" : "text-ink-400"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
      </motion.div>
    </div>
  );
}
