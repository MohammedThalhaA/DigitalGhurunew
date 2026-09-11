import React from "react";
import { Check } from "lucide-react";

interface LinearOverviewProps {
  learnings: string[];
  description: React.ReactNode[];
}

export default function LinearOverview({ learnings, description }: LinearOverviewProps) {
  return (
    <div id="overview" className="py-10 border-b border-ink-200">
      
      <h2 className="heading-md text-ink-900 mb-6">What you&apos;ll learn</h2>
      
      {learnings && learnings.length > 0 && (
        <div className="bg-ink-50 border border-ink-200 rounded-lg p-6 md:p-8 mb-10">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {learnings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="h-6 w-6 rounded-full bg-blue-50/90 text-brand-blue flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-200 shadow-2xs">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span className="font-body text-sm font-medium text-ink-800 leading-relaxed group-hover:text-ink-950 transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {description && description.length > 0 && (
        <div>
          <h3 className="heading-sm text-ink-900 mb-4">Course Description</h3>
          <div className="font-body text-ink-600 text-sm leading-relaxed space-y-4">
            {description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
