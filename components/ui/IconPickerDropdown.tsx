"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

const COMMON_ICONS = [
  "Star", "BrainCircuit", "Users", "Target", "Rocket", "CheckCircle", "Search", 
  "Laptop2", "TrendingUp", "RefreshCcw", "Cpu", "DollarSign", "PenTool", 
  "FolderOpen", "Video", "Award", "BookOpen", "Clock", "Heart", "MessageCircle", 
  "BarChart", "Code", "Database", "Compass", "Smartphone", "Server", "FileText", 
  "Briefcase", "Zap", "Layers", "Layout", "Monitor", "LineChart", "PieChart"
];

interface IconPickerDropdownProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

export default function IconPickerDropdown({ value, onChange, className = "" }: IconPickerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredIcons = COMMON_ICONS.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-ink-200 rounded-lg focus:outline-none focus:border-brand-blue"
      >
        <div className="flex items-center gap-2">
          {value ? (
            <IconRenderer name={value} className="h-4 w-4 text-ink-600" />
          ) : (
            <span className="h-4 w-4 block" />
          )}
          <span className="font-body text-sm text-ink-900 truncate">
            {value || "Select Icon"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-ink-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-ink-200 rounded-xl shadow-lg max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-ink-100 flex items-center gap-2">
            <SearchIcon className="h-4 w-4 text-ink-400" />
            <input 
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 font-body text-sm outline-none bg-transparent"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto p-1 flex-1">
            {filteredIcons.length === 0 ? (
              <div className="p-3 text-center text-sm text-ink-500 font-body">No icons found</div>
            ) : (
              <div className="grid grid-cols-4 gap-1 p-1">
                {filteredIcons.map(iconName => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    title={iconName}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                      value === iconName 
                        ? "bg-brand-blue/10 text-brand-blue" 
                        : "hover:bg-ink-50 text-ink-600"
                    }`}
                  >
                    <IconRenderer name={iconName} className="h-5 w-5 mb-1" />
                    <span className="text-[10px] w-full text-center truncate">{iconName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
