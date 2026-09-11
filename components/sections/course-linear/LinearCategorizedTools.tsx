import React from "react";

export interface CategorizedToolItem {
  name?: string;
  iconUrl?: string;
  iconSvg?: React.ReactNode;
  className?: string;
}

export interface CategorizedToolGroup {
  title?: string;
  category?: string;
  description?: string;
  bgClass?: string;
  textClass?: string;
  items?: CategorizedToolItem[];
  tools?: CategorizedToolItem[];
}

interface LinearCategorizedToolsProps {
  groups: CategorizedToolGroup[];
}

export default function LinearCategorizedTools({ groups }: LinearCategorizedToolsProps) {
  if (!groups || groups.length === 0) return null;

  return (
    <div className="py-14 border-b border-ink-200 space-y-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="heading-md text-ink-900 mb-2 uppercase tracking-wide text-sm font-bold text-brand-blue">
          Technologies You Will Master
        </h2>
        <p className="heading-lg text-ink-900 max-w-2xl mx-auto">
          Tools & Platforms Taught in This Course
        </p>
        <p className="body-lg text-ink-500 max-w-3xl mx-auto mt-2 text-sm sm:text-base">
          Gain hands-on proficiency with industry-leading software, automated workflows, and AI platforms.
        </p>
      </div>

      {/* Sequential Categories */}
      <div className="space-y-12">
        {groups.map((group, idx) => {
          const categoryTitle = (group.category || group.title || `Category ${idx + 1}`).replace(/\n/g, " ").trim();
          const toolsList = (group.tools || group.items || []).filter(Boolean);

          if (toolsList.length === 0) return null;

          return (
            <div key={idx} className="space-y-5 bg-ink-50/40 border border-ink-100 rounded-3xl p-6 sm:p-8 shadow-xs">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ink-200/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-brand-blue shrink-0 shadow-xs" />
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
                    {categoryTitle}
                  </h3>
                </div>
                {group.description && (
                  <p className="text-xs sm:text-sm font-medium text-ink-500 sm:text-right max-w-md">
                    {group.description}
                  </p>
                )}
              </div>

              {/* Linear Sequence of Tools */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pt-1">
                {toolsList.map((item, i) => {
                  const toolName = item.name || "Tool";

                  return (
                    <div
                      key={i}
                      className="group/tool bg-white rounded-2xl border border-ink-100 p-4 shadow-card hover:shadow-card-hover hover:border-brand-blue/40 transition-all duration-300 flex flex-col items-center text-center justify-center gap-3 cursor-default"
                    >
                      {/* Tool Logo Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-ink-50/80 border border-ink-100/70 flex items-center justify-center p-2.5 group-hover/tool:scale-110 group-hover/tool:bg-blue-50/40 group-hover/tool:border-brand-blue/30 transition-all duration-300 shadow-2xs">
                        {item.iconUrl ? (
                          <img
                            src={item.iconUrl}
                            alt={toolName}
                            className="w-9 h-9 object-contain drop-shadow-2xs"
                          />
                        ) : item.iconSvg ? (
                          <div className="w-9 h-9 flex items-center justify-center">
                            {item.iconSvg}
                          </div>
                        ) : (
                          <span className="font-bold text-xs text-brand-blue">
                            {toolName.slice(0, 3)}
                          </span>
                        )}
                      </div>

                      {/* Tool Name Label */}
                      <span className="font-heading text-xs sm:text-sm font-bold text-ink-800 group-hover/tool:text-brand-blue transition-colors line-clamp-1">
                        {toolName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
