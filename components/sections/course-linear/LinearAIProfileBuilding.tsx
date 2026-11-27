import React from "react";
import { LucideIcon, BrainCircuit, FileText, UserCheck, Sparkles, Target, RefreshCcw } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface AIProfileItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient?: string;
  border?: string;
  iconColor?: string;
  iconBg?: string;
}

interface LinearAIProfileBuildingProps {
  title?: string;
  description?: string;
  items?: AIProfileItem[];
  courseTitle?: string;
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

const defaultItems: AIProfileItem[] = [
  { icon: BrainCircuit, title: "AI Resume Building", description: "Build a sharp resume with AI. Match real job posts and impress top employers." },
  { icon: FileText, title: "Portfolio Building with AI", description: "Showcase your best projects with AI. Create a clean portfolio that wins interviews." },
  { icon: UserCheck, title: "LinkedIn Profile Tuning", description: "Optimize your LinkedIn with AI tools. Get noticed by tech recruiters and leaders." },
  { icon: Sparkles, title: "Personal Career Branding", description: "Stand out in the job market. Shape your unique personal brand with smart AI prompts." },
  { icon: Target, title: "Job Matching & Targeting", description: "Find the best job matches fast. AI scans your skills and highlights top roles for you." },
  { icon: RefreshCcw, title: "Ongoing Profile Updates", description: "Keep your profile fresh. Update your skills as new market trends emerge." },
];

export default function LinearAIProfileBuilding({ title, description, items, courseTitle }: LinearAIProfileBuildingProps) {
  const profileItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="py-14 border-b border-ink-200">
      <div className="text-center mb-12">
        <h3 className="heading-lg text-ink-900 mb-4">
          {title || (courseTitle ? `AI Profile Building for ${courseTitle}` : "AI Enhanced Profile Building")}
        </h3>
        <p className="body-lg max-w-2xl mx-auto text-ink-500">
          {description || "Use smart AI tools to build your resume, portfolio, and LinkedIn profile to land top jobs faster."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileItems.map((item, idx) => {
          const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
          const gradient = item.gradient || palette.gradient;
          const border = item.border || palette.border;
          const iconColor = item.iconColor || palette.iconColor;
          const iconBg = item.iconBg || palette.iconBg;
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
            >
              {/* Background Gradient Blob on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex gap-5 items-start">
                {/* Icon Wrapper with colored tint & hover scale */}
                <div className={`h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                  {item.iconName ? (
                    <IconRenderer name={item.iconName} className={`h-6 w-6 ${iconColor}`} />
                  ) : Icon ? (
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  ) : (
                    <IconRenderer name="Sparkles" className={`h-6 w-6 ${iconColor}`} />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-base text-ink-500 leading-relaxed">
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
