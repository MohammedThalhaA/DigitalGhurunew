import React from "react";
import { Blocks, Sparkles, Rocket, Globe2, LucideIcon } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface BenefitItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient: string;
  border: string;
  iconColor: string;
}

interface LinearDesignedToHelpProps {
  title: string;
  description: string;
  benefits: BenefitItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

export default function LinearDesignedToHelp({ title, description, benefits }: LinearDesignedToHelpProps) {
  return (
    <div className="py-14 border-b border-ink-200">
      <div className="text-center mb-12">
        <h2 className="heading-lg text-ink-900 mb-4">
          {title}
        </h2>
        <p className="body-lg max-w-2xl mx-auto text-ink-500">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, idx) => {
          const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
          const gradient = benefit.gradient || palette.gradient;
          const border = benefit.border || palette.border;
          const iconColor = benefit.iconColor || palette.iconColor;
          const iconBg = palette.iconBg;
          const Icon = benefit.icon;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
            >
              {/* Background Gradient Blob on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-4 rounded-2xl bg-white border border-ink-100 shadow-sm mb-6 ${iconColor} ${iconBg} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                  {benefit.iconName ? (
                    <IconRenderer name={benefit.iconName} className={`h-8 w-8 ${iconColor}`} />
                  ) : Icon ? (
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                  ) : (
                    <IconRenderer name="Star" className={`h-8 w-8 ${iconColor}`} />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {benefit.description}
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
