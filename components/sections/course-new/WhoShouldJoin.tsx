import React from "react";
import { Users } from "lucide-react";

interface WhoShouldJoinProps {
  whoIsThisFor?: {
    role: string;
    desc: string;
    points: string[];
  }[];
}

export default function WhoShouldJoin({ whoIsThisFor }: WhoShouldJoinProps) {
  if (!whoIsThisFor || whoIsThisFor.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-ink-900 mb-6">Who this course is for:</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {whoIsThisFor.map((persona, idx) => (
          <div key={idx} className="bg-white border border-ink-100/60 rounded-3xl p-8 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-14 w-14 bg-gradient-to-br from-ink-50 to-ink-100/50 rounded-2xl flex items-center justify-center shrink-0 border border-ink-200/50">
                <Users className="h-6 w-6 text-ink-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black text-ink-900">{persona.role}</h3>
            </div>
            
            <p className="text-base font-medium text-ink-600 mb-6 min-h-[3rem] leading-relaxed">
              {persona.desc}
            </p>
            
            <ul className="space-y-3 bg-ink-50/30 p-5 rounded-2xl">
              {persona.points.map((point, pIdx) => (
                <li key={pIdx} className="flex gap-3 items-start text-sm text-ink-700 font-bold">
                  <span className="text-brand-blue font-black mt-0.5">•</span>
                  <span className="leading-tight">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
