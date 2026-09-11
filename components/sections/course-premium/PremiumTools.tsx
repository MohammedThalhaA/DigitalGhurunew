import React from "react";
import { ArrowRight, Wrench } from "lucide-react";

interface PremiumToolsProps {
  tools: string[];
}

export default function PremiumTools({ tools }: PremiumToolsProps) {
  // Mock data for tools to match the high-fidelity design if exact strings are provided
  const toolDetails = [
    { name: "ChatGPT", category: "AI Assistant", level: "Beginner - Advanced", logoColor: "text-emerald-500", bgColor: "bg-emerald-50" },
    { name: "Canva", category: "Design", level: "Beginner - Advanced", logoColor: "text-purple-500", bgColor: "bg-purple-50" },
    { name: "Google Ads", category: "Paid Advertising", level: "Beginner - Advanced", logoColor: "text-blue-500", bgColor: "bg-blue-50" },
    { name: "Meta Ads", category: "Social Media Ads", level: "Beginner - Advanced", logoColor: "text-indigo-500", bgColor: "bg-indigo-50" },
    { name: "Zapier", category: "Automation", level: "Intermediate", logoColor: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  return (
    <section id="tools" className="py-24 bg-[#F6F8FC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Text */}
          <div className="col-span-1 lg:col-span-3 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center font-black text-[#4f46e5]">05</div>
              <span className="text-sm font-bold text-[#4f46e5] tracking-widest uppercase">Tools You Will Master</span>
            </div>
            
            <p className="text-[#52627A] font-medium leading-relaxed mb-8 text-lg">
              Work with industry-leading tools and build real-world skills.
            </p>

            <button className="px-6 py-3 bg-white hover:bg-gray-50 text-[#0B1730] border border-gray-200 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm">
              View all tools <ArrowRight className="h-4 w-4 text-[#4f46e5]" />
            </button>
          </div>

          {/* Right Column - Tool Pills */}
          <div className="col-span-1 lg:col-span-9">
            <div className="flex flex-wrap gap-4">
              {toolDetails.map((tool, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-100 rounded-full px-6 py-4 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-[#1476FF]/20 transition-all duration-300 cursor-default group hover:-translate-y-1"
                >
                  <div className={`h-12 w-12 rounded-full ${tool.bgColor} flex items-center justify-center shrink-0`}>
                    <Wrench className={`h-6 w-6 ${tool.logoColor} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div>
                    <h4 className="text-[#0B1730] font-black text-lg leading-tight">{tool.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-[#8793A5]">{tool.category}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-xs font-medium text-[#8793A5]">{tool.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
