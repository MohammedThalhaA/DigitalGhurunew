"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: "blue" | "gold" | "orange";
}

export default function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  color = "blue",
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const colorMap = {
    blue: "text-brand-blue",
    gold: "text-brand-gold",
    orange: "text-brand-orange",
  };

  useEffect(() => {
    if (!cardRef.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayValue(Math.round(obj.val));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div ref={cardRef} className="text-center px-4 py-6">
      <div
        className={`font-display text-4xl md:text-5xl font-bold ${colorMap[color]} mb-2`}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <p className="font-body text-sm md:text-base text-ink-500">{label}</p>
    </div>
  );
}
