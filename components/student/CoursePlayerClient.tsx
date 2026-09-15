"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, FileText, ChevronDown, ChevronUp, CheckCircle2, CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { markChapterComplete } from "@/app/actions/progress";
import { useRouter } from "next/navigation";

export default function CoursePlayerClient({ 
  modules, 
  courseTitle = "Course Title", 
  courseImage = "/images/Hero Image.jpeg",
  courseId
}: { 
  modules: any[], 
  courseTitle?: string, 
  courseImage?: string,
  courseId: number
}) {
  const router = useRouter();
  
  // Find first uncompleted lesson, or just the first lesson
  let defaultModuleIdx = 0;
  let defaultLesson = modules[0]?.lessons?.[0] || null;
  
  for (let i = 0; i < modules.length; i++) {
    const uncompletedLesson = modules[i].lessons?.find((l: any) => !l.isCompleted);
    if (uncompletedLesson) {
      defaultModuleIdx = i;
      defaultLesson = uncompletedLesson;
      break;
    }
  }

  const [expandedModule, setExpandedModule] = useState<number>(defaultModuleIdx);
  const [activeLesson, setActiveLesson] = useState<any>(defaultLesson);
  const [isCompleting, setIsCompleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Calculate overall progress
  let totalLessons = 0;
  let completedLessons = 0;
  modules.forEach(m => {
    if (m.lessons) {
      m.lessons.forEach((l: any) => {
        totalLessons++;
        if (l.isCompleted) completedLessons++;
      });
    }
  });
  
  // Use state for completed counts so it updates immediately on click
  const [localCompletedCount, setLocalCompletedCount] = useState(completedLessons);
  const progressPercent = totalLessons === 0 ? 0 : Math.round((localCompletedCount / totalLessons) * 100);

  const handleLessonSelect = (lesson: any, moduleIdx: number) => {
    setActiveLesson(lesson);
    setExpandedModule(moduleIdx);
  };

  const handleNextLesson = async () => {
    if (!activeLesson || isCompleting) return;
    
    setIsCompleting(true);
    
    try {
      // 1. Hit the server action to mark complete and grant XP
      const res = await markChapterComplete(activeLesson.id, courseId);
      
      // 2. Update local state to reflect completion
      if (!activeLesson.isCompleted) {
        activeLesson.isCompleted = true;
        setLocalCompletedCount(prev => prev + 1);
        
        if (res.xpEarned > 0) {
          setToastMessage(`+${res.xpEarned} XP Earned!`);
          setTimeout(() => setToastMessage(""), 3000);
        }
        if (res.leveledUp) {
          setTimeout(() => {
            setToastMessage(`Level Up! You are now Level ${res.newLevel} 🏆`);
            setTimeout(() => setToastMessage(""), 4000);
          }, 1000);
        }
      }

      // 3. Find next lesson and advance
      let foundCurrent = false;
      let nextLesson = null;
      let nextModuleIdx = -1;

      for (let i = 0; i < modules.length; i++) {
        if (!modules[i].lessons) continue;
        
        for (let j = 0; j < modules[i].lessons.length; j++) {
          const lesson = modules[i].lessons[j];
          if (foundCurrent) {
            nextLesson = lesson;
            nextModuleIdx = i;
            break;
          }
          if (lesson.id === activeLesson.id) {
            foundCurrent = true;
          }
        }
        if (nextLesson) break;
      }

      if (nextLesson) {
        setActiveLesson(nextLesson);
        setExpandedModule(nextModuleIdx);
      } else {
        setToastMessage("Course Completed! 🎉");
        setTimeout(() => setToastMessage(""), 3000);
      }
      
      router.refresh(); // Refresh server state in background
      
    } catch (error) {
      console.error(error);
      setToastMessage("Failed to save progress");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-brand-blue text-white px-6 py-3 rounded-full shadow-2xl font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Left Column: Curriculum Sidebar */}
      <div className="w-[320px] lg:w-[380px] shrink-0 border-r border-gray-200 bg-white h-full flex flex-col overflow-hidden">
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
                 <div className="absolute top-0 left-0 h-full bg-[#0088cc] transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className="text-right mt-1.5">
                 <span className="text-[11px] font-bold text-white drop-shadow-md">{progressPercent}% Complete</span>
              </div>
           </div>
        </div>

        {/* Curriculum Area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300">
           <div className="flex flex-col">
              {modules.map((mod, i) => {
                 const isExpanded = expandedModule === i;
                 
                 return (
                    <div key={mod.id || i} className="border-b border-gray-100">
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
                       
                       {isExpanded && mod.lessons && (
                          <div className="bg-white">
                             {mod.lessons.map((lesson: any, j: number) => {
                                const isCurrent = activeLesson?.id === lesson.id;
                                const isCompleted = lesson.isCompleted;
                                
                                return (
                                   <div 
                                      key={lesson.id || j} 
                                      onClick={() => handleLessonSelect(lesson, i)}
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
           </div>
        </div>
      </div>

      {/* Right Column: Player Area */}
      <div className="flex-1 bg-white h-full overflow-y-auto relative flex flex-col p-6">
        
        {/* Breadcrumbs */}
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
           <span>Module {expandedModule + 1}</span>
           <span>/</span>
           <span className="text-gray-800 font-medium">Video: {activeLesson?.title || "Select a lesson"}</span>
        </div>

        {/* Video Player Container */}
        <div className="w-full relative bg-black flex items-center justify-center shrink-0 rounded-md overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
          {(() => {
            if (!activeLesson?.videoUrl) {
              return (
                <div className="text-center relative z-0 pointer-events-none group/video">
                   <h2 className="text-white font-display font-bold text-2xl tracking-[0.1em] mb-3 drop-shadow-md">{activeLesson?.title || "No Lesson Selected"}</h2>
                   <p className="text-[#FFB800] text-[12px] font-bold tracking-[0.15em] uppercase">No Video Available</p>
                </div>
              );
            }

            const url = activeLesson.videoUrl;
            
            // Google Drive Link
            if (url.includes('drive.google.com')) {
              const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
              if (fileIdMatch && fileIdMatch[1]) {
                return (
                  <iframe 
                    src={`https://drive.google.com/file/d/${fileIdMatch[1]}/preview`} 
                    className="w-full h-full border-0"
                    allow="autoplay"
                    allowFullScreen
                  />
                );
              }
            }

            // YouTube Link
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
              let videoId = "";
              if (url.includes('youtu.be')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
              } else {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v') || "";
              }
              
              if (videoId) {
                return (
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              }
            }

            // Standard Video Tag (mp4, webm, etc)
            return (
              <video 
                src={url} 
                controls 
                autoPlay
                className="w-full h-full object-contain"
                onEnded={handleNextLesson}
              >
                Your browser does not support the video tag.
              </video>
            );
          })()}
        </div>
        
        {/* Next Lesson Button */}
        <div className="absolute bottom-6 right-6">
           <button 
              onClick={handleNextLesson}
              disabled={isCompleting || !activeLesson}
              className={`bg-gradient-to-r from-[#FFB800] to-[#FF5C00] hover:shadow-lg hover:-translate-y-0.5 text-white px-6 py-2.5 rounded text-sm font-bold shadow-md flex items-center gap-2 transition-all ${isCompleting ? 'opacity-70 cursor-wait' : ''}`}
           >
              {isCompleting ? "Saving..." : "Next Lesson"} <CheckCircle className="h-4 w-4" />
           </button>
        </div>

      </div>
    </div>
  );
}
