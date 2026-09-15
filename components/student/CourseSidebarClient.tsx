"use client";

import React, { useState } from "react";
import { PlayCircle, FileText, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, CheckCircle } from "lucide-react";

export default function CourseSidebarClient({ 
  modules, 
  courseTitle = "Course Title", 
  courseImage = "/images/Hero Image.jpeg" 
}: { 
  modules: any[], 
  courseTitle?: string, 
  courseImage?: string 
}) {
  const [activeTab, setActiveTab] = useState("path");
  const [activeLesson, setActiveLesson] = useState<string>("Funnel Optimization");
  const [expandedModule, setExpandedModule] = useState<number>(0);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      
      {/* Course Hero Banner & Progress */}
      <div className="shrink-0 relative overflow-hidden bg-[#0B1221] flex flex-col">
         <img 
            src={courseImage} 
            alt={courseTitle} 
            className="w-full h-44 object-cover"
         />
         
         {/* Progress Bar Overlay */}
         <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden relative shadow-sm">
               <div className="absolute top-0 left-0 h-full w-[25%] bg-[#0088cc]"></div>
            </div>
            <div className="text-right mt-1.5">
               <span className="text-[11px] font-bold text-white drop-shadow-md">25% Complete</span>
            </div>
         </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100 shrink-0">
         <div className="relative">
            <input 
               type="text" 
               placeholder="Search for a lesson" 
               className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
               <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
         </div>
      </div>

      {/* Curriculum Area */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300">
         <div className="flex flex-col">
            {modules.map((mod, i) => {
               const isExpanded = expandedModule === i;
               
               return (
                  <div key={i} className="border-b border-gray-100">
                     {/* Module Header */}
                     <button 
                        onClick={() => setExpandedModule(isExpanded ? -1 : i)}
                        className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors ${isExpanded ? 'bg-[#F4F7FB]' : 'hover:bg-gray-50 bg-white'}`}
                     >
                        <span className={`text-[13px] font-bold truncate pr-4 ${isExpanded ? 'text-[#0055A5]' : 'text-gray-700'}`}>
                           {mod.title}
                        </span>
                        {isExpanded ? (
                           <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
                        ) : (
                           <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                        )}
                     </button>
                     
                     {/* Lessons List */}
                     {isExpanded && mod.lessons && (
                        <div className="bg-white">
                           {mod.lessons.map((lesson: any, j: number) => {
                              const isCurrent = lesson.title === activeLesson;
                              const isCompleted = j === 0; // Mock completed state
                              
                              return (
                                 <div 
                                    key={j} 
                                    onClick={() => setActiveLesson(lesson.title)}
                                    className={`flex items-start justify-between px-5 py-3 cursor-pointer transition-colors relative border-b border-gray-50 last:border-0 ${
                                       isCurrent ? 'bg-gray-50' : 'hover:bg-gray-50'
                                    }`}
                                 >
                                    {isCurrent && (
                                       <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0055A5]"></div>
                                    )}
                                    <div className="flex gap-3">
                                       <div className={`mt-0.5 shrink-0 ${isCurrent ? 'text-[#0055A5]' : 'text-gray-400'}`}>
                                          <FileText className="h-4 w-4" />
                                       </div>
                                       <span className={`text-[13px] leading-tight ${isCurrent ? 'text-[#0055A5] font-medium' : 'text-gray-600'}`}>
                                          Video {j+1}: {lesson.title}
                                       </span>
                                    </div>
                                    <div className="shrink-0 ml-3">
                                       {isCompleted ? (
                                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                       ) : (
                                          <CheckCircle className="h-4 w-4 text-gray-200" />
                                       )}
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     )}
                  </div>
               )
            })}

            {/* Mock Extra Modules from Screenshot */}
            <div className="border-b border-gray-100">
               <button className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 bg-white">
                  <span className="text-[13px] font-bold text-gray-700 truncate pr-4">Must Watch Completely and in order</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
