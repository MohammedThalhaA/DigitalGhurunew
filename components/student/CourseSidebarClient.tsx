"use client";

import React, { useState } from "react";
import { CheckCircle2, PlayCircle, FileText, Download, MessageSquare } from "lucide-react";

export default function CourseSidebarClient({ modules }: { modules: any[] }) {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [activeLesson, setActiveLesson] = useState<string>("Funnel Optimization");

  return (
    <div className="w-full xl:w-[450px] shrink-0">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-ink-200 mb-8 px-2">
        <button 
          onClick={() => setActiveTab("curriculum")}
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] relative top-[2px] transition-colors ${activeTab === 'curriculum' ? 'text-brand-blue border-b-4 border-brand-blue' : 'text-ink-400 hover:text-ink-900 border-b-4 border-transparent'}`}
        >
          Curriculum
        </button>
        <button 
          onClick={() => setActiveTab("resources")}
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] relative top-[2px] transition-colors flex items-center gap-2 ${activeTab === 'resources' ? 'text-brand-blue border-b-4 border-brand-blue' : 'text-ink-400 hover:text-ink-900 border-b-4 border-transparent'}`}
        >
          Resources <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'resources' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-amber-100 text-amber-700'}`}>2</span>
        </button>
        <button 
          onClick={() => setActiveTab("discussion")}
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] relative top-[2px] transition-colors ${activeTab === 'discussion' ? 'text-brand-blue border-b-4 border-brand-blue' : 'text-ink-400 hover:text-ink-900 border-b-4 border-transparent'}`}
        >
          Discussion
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "curriculum" && (
        <div className="bg-white rounded-[32px] border border-ink-100 shadow-[0_4px_20px_rgba(20,20,40,0.03)] overflow-hidden">
          {modules.map((mod, i) => (
            <div key={i} className="border-b border-ink-100 last:border-0">
              <div className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${mod.completed ? 'bg-ink-50/50 hover:bg-ink-50' : 'bg-white hover:bg-ink-50/50'}`}>
                <h3 className={`text-[15px] font-bold ${mod.completed ? 'text-ink-500' : 'text-ink-900'}`}>{mod.title}</h3>
                {mod.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 ml-4" />
                ) : (
                  <span className="text-xs font-bold text-ink-400 uppercase tracking-[0.15em] shrink-0 ml-4 bg-ink-100 px-3 py-1 rounded-full">{mod.lessons?.length || 0} Lessons</span>
                )}
              </div>
              
              {/* Lessons */}
              {(!mod.completed || i === 0) && (
                <div className="bg-white px-4 pb-4 pt-2">
                  {mod.lessons.map((lesson: any, j: number) => {
                    const isCurrent = lesson.title === activeLesson;
                    return (
                      <div 
                        key={j} 
                        onClick={() => setActiveLesson(lesson.title)}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group mb-2 last:mb-0 ${isCurrent ? 'bg-gradient-to-r from-amber-50 to-white border border-amber-200 shadow-sm' : 'hover:bg-ink-50 border border-transparent'}`}
                      >
                        {lesson.completed ? (
                          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          </div>
                        ) : isCurrent ? (
                          <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                            <div className="h-3 w-3 bg-white rounded-full animate-pulse shadow-sm"></div>
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-ink-100 flex items-center justify-center shrink-0 group-hover:bg-brand-blue/10 transition-colors">
                            <PlayCircle className="h-4 w-4 text-ink-400 group-hover:text-brand-blue" />
                          </div>
                        )}
                        <span className={`text-sm font-bold flex-1 line-clamp-2 ${isCurrent ? 'text-ink-900' : lesson.completed ? 'text-ink-400' : 'text-ink-600'}`}>
                          {lesson.title}
                        </span>
                        <span className={`text-xs font-bold shrink-0 ${isCurrent ? 'text-amber-600' : 'text-ink-400'}`}>{lesson.duration}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "resources" && (
        <div className="bg-white rounded-[32px] p-8 border border-ink-100 shadow-[0_4px_20px_rgba(20,20,40,0.03)]">
          <h3 className="font-bold text-ink-900 text-xl mb-6">Downloads & Links</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center p-5 border border-ink-100 rounded-[24px] hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mr-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ink-900 text-[15px] group-hover:text-brand-blue transition-colors">Funnel Worksheets (PDF)</h4>
                <p className="text-sm text-ink-500 mt-1">2.4 MB</p>
              </div>
              <Download className="h-6 w-6 text-ink-300 group-hover:text-brand-blue transition-colors" />
            </div>
            
            <div className="flex items-center p-5 border border-ink-100 rounded-[24px] hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue shrink-0 mr-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ink-900 text-[15px] group-hover:text-brand-blue transition-colors">Swipe File Templates</h4>
                <p className="text-sm text-ink-500 mt-1">External Link (Google Drive)</p>
              </div>
              <Download className="h-6 w-6 text-ink-300 group-hover:text-brand-blue transition-colors" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "discussion" && (
        <div className="bg-white rounded-[32px] p-8 border border-ink-100 shadow-[0_4px_20px_rgba(20,20,40,0.03)] flex flex-col items-center justify-center min-h-[350px] text-center">
          <div className="h-20 w-20 bg-ink-50 rounded-full flex items-center justify-center mb-6">
            <MessageSquare className="h-10 w-10 text-ink-300" />
          </div>
          <h3 className="font-bold text-ink-900 text-xl mb-3">Join the Conversation</h3>
          <p className="text-[15px] text-ink-500 mb-8 max-w-[280px]">Ask questions, share your funnel results, and interact with other students.</p>
          <button className="px-8 py-4 bg-ink-900 text-white text-sm font-bold uppercase tracking-[0.15em] rounded-full hover:bg-ink-800 transition-colors shadow-md hover:scale-105 transform">
            Start a Discussion
          </button>
        </div>
      )}

    </div>
  );
}
