"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Highlights", id: "highlights" },
  { label: "Who Should Join", id: "audience" },
  { label: "Modules", id: "modules" },
  { label: "Tools", id: "tools" },
  { label: "FAQ", id: "faq" },
];

export default function StickyCourseNav() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      // Logic to highlight active section based on scroll position could go here.
      // For now, we will just stick it and allow clicking.
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm hidden md:block">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`py-5 font-semibold text-sm transition-colors relative whitespace-nowrap ${
                  activeId === item.id ? "text-[#0B1730]" : "text-[#52627A] hover:text-[#0B1730]"
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4f46e5] rounded-t-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
