"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Curriculum", id: "curriculum" },
  { label: "Instructor", id: "instructor" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

export default function LinearStickyNav() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    // Scroll spy could go here
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-ink-200 hidden md:block pt-2">
      <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`py-4 font-heading font-bold text-sm transition-colors relative whitespace-nowrap ${
                activeId === item.id ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {item.label}
              {activeId === item.id && (
                <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-ink-900" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
