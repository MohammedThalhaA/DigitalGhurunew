import React from "react";
import { LucideIcon } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

export interface TreeReason {
  num: string;
  iconName?: string;
  title: string;
  description: string;
  color: string;
  numBg: string;
  dotColor: string;
}

interface LinearWhyDigitalGhuruProps {
  title: string;
  reasons: TreeReason[];
}

const REASON_PALETTES = [
  { color: "border-blue-200 bg-blue-50/80 text-brand-blue", numBg: "bg-brand-blue text-white", dotColor: "bg-brand-blue" },
  { color: "border-orange-200 bg-orange-50/80 text-brand-orange", numBg: "bg-brand-orange text-white", dotColor: "bg-brand-orange" },
  { color: "border-emerald-200 bg-emerald-50/80 text-emerald-600", numBg: "bg-emerald-500 text-white", dotColor: "bg-emerald-500" },
  { color: "border-red-200 bg-red-50/80 text-red-600", numBg: "bg-red-500 text-white", dotColor: "bg-red-500" },
  { color: "border-purple-200 bg-purple-50/80 text-purple-600", numBg: "bg-purple-500 text-white", dotColor: "bg-purple-500" },
  { color: "border-amber-200 bg-amber-50/80 text-amber-600", numBg: "bg-amber-500 text-white", dotColor: "bg-amber-500" },
  { color: "border-cyan-200 bg-cyan-50/80 text-cyan-600", numBg: "bg-cyan-500 text-white", dotColor: "bg-cyan-500" }
];

export default function LinearWhyDigitalGhuru({ title, reasons }: LinearWhyDigitalGhuruProps) {
  if (!reasons || reasons.length === 0) return null;

  // Enrich each reason with palette fallbacks if not explicitly provided
  const enrichedReasons = reasons.map((r, i) => {
    const palette = REASON_PALETTES[i % REASON_PALETTES.length];
    return {
      ...r,
      color: r.color || palette.color,
      numBg: r.numBg || palette.numBg,
      dotColor: r.dotColor || palette.dotColor
    };
  });

  const rowsCount = Math.ceil(enrichedReasons.length / 2);

  return (
    <div className="py-14 border-b border-ink-200">
      <h2 className="heading-md text-ink-900 text-center mb-12">{title}</h2>

      {/* Desktop Tree Layout */}
      <div className="hidden md:block relative">
        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink-200 -translate-x-1/2 z-0" />

        <div className="relative z-10 space-y-0">
          {Array.from({ length: rowsCount }).map((_, i) => {
            const leftItem = enrichedReasons[i * 2];
            const rightItem = enrichedReasons[i * 2 + 1];

            return (
              <div key={i} className="grid grid-cols-2 gap-x-16 relative">
                {leftItem ? (
                  <div className="flex justify-end py-6 pr-8">
                    <TreeCard {...leftItem} align="right" />
                  </div>
                ) : <div />}
                
                {rightItem ? (
                  <div className="flex justify-start py-6 pl-8">
                    <TreeCard {...rightItem} align="left" />
                  </div>
                ) : <div />}
                
                {leftItem && (
                  <TreeDot color={leftItem.dotColor} num={leftItem.num} numBg={leftItem.numBg} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Simple stacked cards */}
      <div className="md:hidden space-y-4">
        {enrichedReasons.map((reason, idx) => (
          <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl border border-ink-100 bg-white shadow-card hover:shadow-card-hover transition-all">
            <div className={`h-12 w-12 rounded-xl ${reason.numBg} flex items-center justify-center shrink-0 font-display font-black text-sm shadow-sm`}>
              {reason.num}
            </div>
            <div className={`h-12 w-12 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${reason.color}`}>
              {reason.iconName ? <IconRenderer name={reason.iconName} className="h-5 w-5" /> : null}
            </div>
            <div>
              <h3 className="font-heading font-bold text-ink-900 text-base">{reason.title}</h3>
              <p className="font-body text-sm text-ink-500 leading-relaxed mt-1">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Tree Card for desktop */
function TreeCard({ iconName, title, description, color, align }: { iconName?: string; title: string; description: string; color: string; align: "left" | "right" }) {
  return (
    <div className={`w-full max-w-[480px] p-6 rounded-3xl border border-ink-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group hover:border-brand-blue/30 ${align === "right" ? "text-right" : "text-left"} flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <div className={`inline-flex h-12 w-12 rounded-xl border items-center justify-center mb-4 shadow-sm ${color} group-hover:scale-110 transition-transform duration-300`}>
        {iconName ? <IconRenderer name={iconName} className="h-6 w-6" /> : null}
      </div>
      <h3 className="font-heading font-bold text-ink-900 text-lg mb-2 group-hover:text-brand-blue transition-colors">{title}</h3>
      <p className="font-body text-sm text-ink-500 leading-relaxed">{description}</p>
    </div>
  );
}

/* Central dot on the tree */
function TreeDot({ color, num, numBg }: { color: string; num: string; numBg: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className={`h-10 w-10 rounded-full ${numBg} flex items-center justify-center font-display font-black text-xs shadow-lg ring-4 ring-white`}>
        {num}
      </div>
    </div>
  );
}
