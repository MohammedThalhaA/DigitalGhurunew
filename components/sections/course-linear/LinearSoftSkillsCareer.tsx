import React from "react";
import { LucideIcon, MessageSquare, Award, Linkedin, Monitor, Building2, Rocket, Globe, Laptop, Presentation, Shield } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface SoftSkillItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient?: string;
  border?: string;
  iconColor?: string;
  iconBg?: string;
}

export interface CareerItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient?: string;
  border?: string;
  iconColor?: string;
  iconBg?: string;
}

interface LinearSoftSkillsCareerProps {
  softSkillsTitle?: string;
  softSkillsDesc?: string;
  softSkillItems?: SoftSkillItem[];
  careerTitle?: string;
  careerDesc?: string;
  careerItems?: CareerItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

const defaultSoftSkills: SoftSkillItem[] = [
  { icon: Presentation, title: "Communication & Presentation Skills", description: "Master professional communication, public speaking, and impactful presentations." },
  { icon: Shield, title: "Interview Confidence Building", description: "Build the confidence to ace technical and HR interviews with structured practice." },
  { icon: Linkedin, title: "LinkedIn Profile Optimization", description: "Create a compelling LinkedIn presence that attracts recruiters and opportunities." },
  { icon: Monitor, title: "Workplace Readiness Training", description: "Prepare for the professional environment with team collaboration and workplace etiquette." },
];

const defaultCareerItems: CareerItem[] = [
  { icon: Building2, title: "IT & Software Companies", description: "Join leading IT firms as a skilled professional ready for enterprise environments." },
  { icon: Rocket, title: "Startups & Product-Based Companies", description: "Build innovative products at fast-growing startups that value modern domain expertise." },
  { icon: Globe, title: "Digital Agencies & Consultancies", description: "Work with creative agencies building impactful campaigns and solutions for clients worldwide." },
  { icon: Laptop, title: "Freelancing & Remote Global Jobs", description: "Build a thriving independent client base or land high-paying remote international roles." },
];

export default function LinearSoftSkillsCareer({
  softSkillsTitle,
  softSkillsDesc,
  softSkillItems,
  careerTitle,
  careerDesc,
  careerItems,
}: LinearSoftSkillsCareerProps) {
  const skills = softSkillItems && softSkillItems.length > 0 ? softSkillItems : defaultSoftSkills;
  const careers = careerItems && careerItems.length > 0 ? careerItems : defaultCareerItems;

  return (
    <div className="py-14 border-b border-ink-200">
      {/* Soft Skills Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {softSkillsTitle || "Soft Skills & Career Training"}
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            {softSkillsDesc || "Technical skills alone are not enough. We train you to communicate clearly, interview with confidence, and succeed professionally."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((item, idx) => {
            const palette = COLOR_PALETTES[idx % COLOR_PALETTES.length];
            const gradient = item.gradient || palette.gradient;
            const border = item.border || palette.border;
            const iconColor = item.iconColor || palette.iconColor;
            const iconBg = item.iconBg || palette.iconBg;
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                  <div className={`h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {item.iconName ? (
                      <IconRenderer name={item.iconName} className={`h-7 w-7 ${iconColor}`} />
                    ) : Icon ? (
                      <Icon className={`h-7 w-7 ${iconColor}`} />
                    ) : (
                      <IconRenderer name="Presentation" className={`h-7 w-7 ${iconColor}`} />
                    )}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
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

      {/* Career Opportunities Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {careerTitle || "Career Opportunities"}
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            {careerDesc || "The demand for certified, practical professionals is rapidly growing across industries worldwide."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((item, idx) => {
            const palette = COLOR_PALETTES[(idx + 1) % COLOR_PALETTES.length];
            const gradient = item.gradient || palette.gradient;
            const border = item.border || palette.border;
            const iconColor = item.iconColor || palette.iconColor;
            const iconBg = item.iconBg || palette.iconBg;
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${border}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                  <div className={`h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {item.iconName ? (
                      <IconRenderer name={item.iconName} className={`h-7 w-7 ${iconColor}`} />
                    ) : Icon ? (
                      <Icon className={`h-7 w-7 ${iconColor}`} />
                    ) : (
                      <IconRenderer name="Building2" className={`h-7 w-7 ${iconColor}`} />
                    )}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-brand-blue transition-colors duration-200">
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
    </div>
  );
}
