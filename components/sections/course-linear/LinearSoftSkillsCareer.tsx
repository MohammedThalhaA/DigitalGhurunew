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

const defaultSoftSkills: SoftSkillItem[] = [
  { icon: Presentation, title: "Communication Skills", description: "Learn clear speaking and presentation skills. Share ideas with ease." },
  { icon: Shield, title: "Interview Practice", description: "Ace mock interviews with structured practice. Speak with real confidence." },
  { icon: Linkedin, title: "LinkedIn Profile Growth", description: "Create a standout profile. Attract top recruiters and great job offers." },
  { icon: Monitor, title: "Workplace Readiness", description: "Learn team etiquette and real office workflows. Get job-ready." },
];

const defaultCareerItems: CareerItem[] = [
  { icon: Building2, title: "IT & Software Companies", description: "Join top IT firms. Work on enterprise teams as a skilled developer." },
  { icon: Rocket, title: "Startups & Tech Firms", description: "Build new products at fast startups that value modern tech skills." },
  { icon: Globe, title: "Digital Agencies", description: "Work at creative agencies. Run winning campaigns for global clients." },
  { icon: Laptop, title: "Freelancing & Remote Jobs", description: "Earn as an independent freelancer. Land high-paying remote global roles." },
];

export default function LinearSoftSkillsCareer({
  softSkillsTitle,
  softSkillsDesc,
  softSkillItems,
  careerTitle,
  careerDesc,
  careerItems,
  courseTitle,
}: LinearSoftSkillsCareerProps) {
  const skills = softSkillItems && softSkillItems.length > 0 ? softSkillItems : defaultSoftSkills;
  const careers = careerItems && careerItems.length > 0 ? careerItems : defaultCareerItems;

  return (
    <div className="py-14 border-b border-ink-200">
      {/* Soft Skills Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {softSkillsTitle || (courseTitle ? `Soft Skills for ${courseTitle}` : "Soft Skills & Career Training")}
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

      {/* Career Opportunities Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {careerTitle || (courseTitle ? `${courseTitle} Career Paths` : "Career Opportunities")}
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
    </div>
  );
}
