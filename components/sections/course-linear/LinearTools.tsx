import React from "react";

interface LinearToolsProps {
  tools: string[];
}

// Map tool names to the SVG files used in the homepage ToolsCovered section
const toolImages: Record<string, { iconUrl: string; description: string }> = {
  ChatGPT: {
    iconUrl: "/tools/openai.svg",
    description: "Master prompt engineering for copywriting, strategy planning, and ideation.",
  },
  Midjourney: {
    iconUrl: "/tools/midjourney.svg",
    description: "Generate photorealistic product renders and creative art via text prompts.",
  },
  Canva: {
    iconUrl: "/tools/canva.svg",
    description: "Design social media templates, ad banners, and pitch decks.",
  },
  WordPress: {
    iconUrl: "/tools/wordpress.svg",
    description: "Learn to build professional, optimized websites without complex coding.",
  },
  "Google Ads": {
    iconUrl: "/tools/googleads.svg",
    description: "Search, display, and video campaigns for instant, intent-driven visibility.",
  },
  "Meta Ads": {
    iconUrl: "/tools/meta.svg",
    description: "Highly targeted Facebook & Instagram campaigns to build engagement.",
  },
  Zapier: {
    iconUrl: "/tools/zapier.svg",
    description: "Connect apps and build automated AI agents to handle marketing tasks.",
  },
};

const fallbackTool = {
  iconUrl: "/tools/openai.svg", // safe fallback
  description: "Learn to use this essential tool to enhance your digital marketing workflow.",
};

export default function LinearTools({ tools }: LinearToolsProps) {
  const toolList = tools && tools.length > 0 ? tools : ["ChatGPT", "Midjourney", "Canva", "WordPress", "Google Ads", "Meta Ads", "Zapier"];

  return (
    <div className="py-10 border-b border-ink-200">
      <h2 className="heading-md text-ink-900 mb-6">Tools You Will Master</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolList.map((toolName, idx) => {
          const tool = toolImages[toolName] || fallbackTool;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 flex gap-4 items-start group"
            >
              {/* Tool Logo - matching home page style */}
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-ink-50 p-2 overflow-hidden border border-ink-100 group-hover:scale-110 transition-transform duration-300"
              >
                <img src={tool.iconUrl} alt={toolName} className="w-full h-full object-contain" />
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="font-heading text-base font-bold text-ink-900">
                  {toolName}
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
