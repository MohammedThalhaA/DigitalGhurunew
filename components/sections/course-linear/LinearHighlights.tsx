import React from "react";
import { LucideIcon } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface HighlightItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient: string;
  border: string;
  iconColor: string;
}

interface LinearHighlightsProps {
  highlights: HighlightItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

export default function LinearHighlights({ highlights }: LinearHighlightsProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="py-14 border-b border-ink-200">
      <div className="mb-10">
        <h2 className="heading-md text-ink-900 mb-2">Program Highlights</h2>
        <p className="body-lg text-ink-500">
          Everything you need to succeed in the digital ecosystem.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, idx) => {
          const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
          const gradient = highlight.gradient || palette.gradient;
          const border = highlight.border || palette.border;
          const iconColor = highlight.iconColor || palette.iconColor;
          const iconBg = palette.iconBg;
          const Icon = highlight.icon;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
            >
              {/* Background Gradient Blob on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div className={`p-3 rounded-2xl bg-white border border-ink-100 shadow-sm ${iconColor} ${iconBg} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                  {highlight.iconName ? (
                    <IconRenderer name={highlight.iconName} className={`h-6 w-6 ${iconColor}`} />
                  ) : Icon ? (
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  ) : (
                    <IconRenderer name="Star" className={`h-6 w-6 ${iconColor}`} />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
