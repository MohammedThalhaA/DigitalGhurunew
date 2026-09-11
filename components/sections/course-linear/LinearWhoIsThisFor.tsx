import React from "react";
import { LucideIcon } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface AudienceItem {
  role: string;
  icon?: LucideIcon;
  iconName?: string;
  desc: string;
  points: string[];
  gradient: string;
  border: string;
  iconColor: string;
  dotColor: string;
}

interface LinearWhoIsThisForProps {
  audiences: AudienceItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", dotColor: "bg-blue-500", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", dotColor: "bg-emerald-500", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", dotColor: "bg-amber-500", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", dotColor: "bg-rose-500", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", dotColor: "bg-purple-500", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", dotColor: "bg-cyan-500", iconBg: "bg-cyan-50/60" }
];

export default function LinearWhoIsThisFor({ audiences }: LinearWhoIsThisForProps) {
  if (!audiences || audiences.length === 0) return null;

  return (
    <div className="py-14 border-b border-ink-200">
      <div className="text-center mb-12">
        <h2 className="heading-md text-ink-900 mb-2 uppercase tracking-wide text-sm font-bold text-brand-blue">
          WHO IS THIS PROGRAM FOR?
        </h2>
        <p className="heading-lg text-ink-900 max-w-2xl mx-auto">
          Tailored For Diverse Career Paths
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((audience, idx) => {
          const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
          const gradient = audience.gradient || palette.gradient;
          const border = audience.border || palette.border;
          const iconColor = audience.iconColor || palette.iconColor;
          const dotColor = audience.dotColor || palette.dotColor;
          const iconBg = palette.iconBg;
          const Icon = audience.icon;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${border} flex flex-col h-full`}
            >
              {/* Background Gradient Blob on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-4 rounded-2xl bg-white border border-ink-100 shadow-sm ${iconColor} ${iconBg} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {audience.iconName ? (
                      <IconRenderer name={audience.iconName} className={`h-7 w-7 ${iconColor}`} />
                    ) : Icon ? (
                      <Icon className={`h-7 w-7 ${iconColor}`} />
                    ) : (
                      <IconRenderer name="Star" className={`h-7 w-7 ${iconColor}`} />
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                    {audience.role || (audience as any).title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm font-medium text-ink-600 mb-6 pb-6 border-b border-ink-100/60 flex-grow">
                  {audience.desc || (audience as any).description}
                </p>

                {/* Points List */}
                {audience.points && audience.points.length > 0 && (
                  <ul className="space-y-3">
                    {audience.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dotColor}`} />
                        <span className="text-sm text-ink-500 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
