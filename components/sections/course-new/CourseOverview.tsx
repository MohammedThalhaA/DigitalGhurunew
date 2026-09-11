import React from "react";
import { Check } from "lucide-react";

interface CourseOverviewProps {
  description: string;
  outcomes?: string[];
}

export default function CourseOverview({ description, outcomes }: CourseOverviewProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Course Overview</h2>
      
      {/* Main Description */}
      <div className="prose max-w-none text-ink-600 font-medium mb-8">
        <p className="whitespace-pre-line">{description}</p>
      </div>

      {/* What you'll learn (Outcomes) */}
      {outcomes && outcomes.length > 0 && (
        <div className="bg-white border border-ink-100/60 p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-black text-ink-900 mb-8">What you'll learn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium text-ink-700 leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
