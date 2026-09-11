import React from "react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface NumberedFeatureItem {
  num: string;
  iconName?: string;
  title: string;
  description: string;
  gradient: string;
  border: string;
  iconColor: string;
}

interface LinearAIInMarketingProps {
  title: string;
  description: string;
  features: NumberedFeatureItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

export default function LinearAIInMarketing({ title, description, features }: LinearAIInMarketingProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="py-14 border-b border-ink-200">
      <div className="mb-10 text-center">
        <h2 className="heading-md text-ink-900 mb-4">{title}</h2>
        <p className="body-lg text-ink-500 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
          const gradient = item.gradient || palette.gradient;
          const border = item.border || palette.border;
          const iconColor = item.iconColor || palette.iconColor;
          const iconBg = palette.iconBg;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
            >
              {/* Background Gradient Blob on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col gap-5 items-start">
                <div className="flex w-full items-center justify-between">
                  {/* Icon Wrapper */}
                  <div className={`h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {item.iconName ? <IconRenderer name={item.iconName} className={`h-6 w-6 ${iconColor}`} /> : null}
                  </div>
                  
                  {/* Number Badge */}
                  <span className="font-display text-xl font-black text-ink-200 group-hover:text-ink-300 transition-colors">
                    {item.num}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 mt-2">
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {item.description}
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
