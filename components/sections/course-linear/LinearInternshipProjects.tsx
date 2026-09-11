import React from "react";
import { LucideIcon, Briefcase, Code2, FolderOpen, GraduationCap, FileText, Users, MessageSquare, Award, Handshake } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface InternshipItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient?: string;
  border?: string;
  iconColor?: string;
  iconBg?: string;
}

export interface PlacementItem {
  icon?: LucideIcon;
  iconName?: string;
  title: string;
  description: string;
  gradient?: string;
  border?: string;
  iconColor?: string;
  iconBg?: string;
}

interface LinearInternshipProjectsProps {
  internshipTitle?: string;
  internshipDesc?: string;
  internshipItems?: InternshipItem[];
  placementTitle?: string;
  placementDesc?: string;
  placementItems?: PlacementItem[];
}

const COLOR_PALETTES = [
  { gradient: "from-blue-500/10 to-indigo-500/10", border: "group-hover:border-blue-500/30", iconColor: "text-blue-600", iconBg: "bg-blue-50/60" },
  { gradient: "from-emerald-500/10 to-teal-500/10", border: "group-hover:border-emerald-500/30", iconColor: "text-emerald-600", iconBg: "bg-emerald-50/60" },
  { gradient: "from-amber-500/10 to-orange-500/10", border: "group-hover:border-amber-500/30", iconColor: "text-amber-600", iconBg: "bg-amber-50/60" },
  { gradient: "from-rose-500/10 to-pink-500/10", border: "group-hover:border-rose-500/30", iconColor: "text-rose-600", iconBg: "bg-rose-50/60" },
  { gradient: "from-purple-500/10 to-fuchsia-500/10", border: "group-hover:border-purple-500/30", iconColor: "text-purple-600", iconBg: "bg-purple-50/60" },
  { gradient: "from-cyan-500/10 to-blue-500/10", border: "group-hover:border-cyan-500/30", iconColor: "text-cyan-600", iconBg: "bg-cyan-50/60" }
];

const defaultInternshipItems: InternshipItem[] = [
  { icon: Briefcase, title: "Work on Live Industry Projects", description: "Get hands-on experience by working on real client projects and industry challenges." },
  { icon: Code2, title: "Solve Real Business Problems", description: "Apply your skills to solve actual business challenges and build practical solutions." },
  { icon: FolderOpen, title: "Build a Strong Portfolio", description: "Create a professional portfolio showcasing your projects and measurable results." },
  { icon: GraduationCap, title: "Gain Internship Experience", description: "Earn real-world internship experience that makes your resume stand out to employers." },
];

const defaultPlacementItems: PlacementItem[] = [
  { icon: FileText, title: "Resume & Portfolio Building", description: "Professional resume crafting and portfolio development with expert guidance." },
  { icon: Users, title: "Mock Technical Interviews", description: "Practice with realistic technical interview simulations and get actionable feedback." },
  { icon: MessageSquare, title: "HR Interview Training", description: "Master behavioral questions, salary negotiation, and professional communication." },
  { icon: Award, title: "Communication Skill Development", description: "Build confidence in presentations, team collaboration, and workplace readiness." },
  { icon: Handshake, title: "Job Referrals & Hiring Support", description: "Get connected to hiring partners with dedicated job referral and placement support." },
];

export default function LinearInternshipProjects({
  internshipTitle,
  internshipDesc,
  internshipItems,
  placementTitle,
  placementDesc,
  placementItems,
}: LinearInternshipProjectsProps) {
  const internships = internshipItems && internshipItems.length > 0 ? internshipItems : defaultInternshipItems;
  const placements = placementItems && placementItems.length > 0 ? placementItems : defaultPlacementItems;

  return (
    <div className="py-14 border-b border-ink-200">
      {/* Internship Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {internshipTitle || "Internship & Real-Time Projects"}
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            {internshipDesc || "Practical exposure is key to becoming job-ready. Gain hands-on experience with real industry projects."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((item, idx) => {
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
                      <IconRenderer name="Briefcase" className={`h-7 w-7 ${iconColor}`} />
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

      {/* Placement Support Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-lg text-ink-900 mb-4">
            {placementTitle || "Placement Support System"}
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-ink-500">
            {placementDesc || "We don't just train — we prepare you for your career with comprehensive placement support."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((item, idx) => {
            const palette = COLOR_PALETTES[(idx + 2) % COLOR_PALETTES.length];
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative z-10 flex gap-5 items-start">
                  <div className={`h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {item.iconName ? (
                      <IconRenderer name={item.iconName} className={`h-6 w-6 ${iconColor}`} />
                    ) : Icon ? (
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                    ) : (
                      <IconRenderer name="Award" className={`h-6 w-6 ${iconColor}`} />
                    )}
                  </div>
                  <div className="space-y-2">
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
    </div>
  );
}
