import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, PlayCircle, ChevronDown, CheckCircle2, FileText } from "lucide-react";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  // Mock Data
  const course = {
    title: "Mission 1: Customer Acquisition Primer",
    lessonsCompleted: 11,
    totalLessons: 11,
    image: "/resources/hero-student.png", // Fallback
    modules: [
      {
        id: "m1",
        title: "Introduction to Mission 1",
        lessonsCount: 2,
        lessons: [
          { id: "l1", title: "Video 1: Introduction to complete Ai Content Marketing Course", type: "video", completed: true },
          { id: "l2", title: "Video 2: Introduction to Mission 1 and how to proceed", type: "video", completed: true },
        ]
      },
      {
        id: "m2",
        title: "Must Watch Completely and in order",
        lessonsCount: 9,
        lessons: [
          { id: "l3", title: "Part 1: What is Digital Marketing? 360° View of Digital Marketing", type: "video", completed: true },
          { id: "l4", title: "Part 2: Deep Dive into Social Media Marketing", type: "video", completed: true },
          { id: "l5", title: "Part 3: Basics of Blogging and Content Amplification", type: "video", completed: true },
          { id: "l6", title: "Part 4: What is Influencer Marketing", type: "video", completed: true },
          { id: "l7", title: "Part 5: What is Affiliate Marketing", type: "video", completed: true },
          { id: "l8", title: "Part 6: Funnel Designing", type: "video", completed: true },
          { id: "l9", title: "Part 7: Digital Marketing Strategies to Scale any Businesses 100x", type: "video", completed: true },
          { id: "l10", title: "Part 8: How to do Competitor Research", type: "video", completed: true },
          { id: "l11", title: "Part 9: Designing Your Customer Avator", type: "video", completed: true },
        ]
      }
    ]
  };

  const progressPercent = Math.round((course.lessonsCompleted / course.totalLessons) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      
      {/* Dark Header Banner */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row border border-ink-100 relative">
        <div className="md:w-1/3 aspect-video md:aspect-auto relative bg-brand-blue/10 flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-brand-blue" />
          <span className="text-white font-bold text-2xl relative z-10 px-6 text-center">{course.title}</span>
          <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold uppercase px-2 py-1 rounded">Mission 1</div>
        </div>
        
        <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative bg-white">
          <h1 className="font-display text-xl font-bold text-ink-900 mb-6">{course.title}</h1>
          
          <div>
            <p className="text-sm font-bold text-ink-600 mb-2">{course.lessonsCompleted} / {course.totalLessons} Lessons Completed</p>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-700 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-xl font-bold text-ink-900 text-center mb-8">Course Curriculum</h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          {course.modules.map((module, mIdx) => (
            <div key={module.id} className="relative flex items-start gap-6 md:justify-center">
              
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#fafafa] bg-slate-600 z-10 shadow-sm shrink-0 top-6" />

              <div className="w-full pl-10 md:pl-0 md:w-full relative group">
                <details className="w-full bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group-open:shadow-md transition-all duration-300" open={mIdx === 0}>
                  <summary className="list-none p-5 md:p-6 cursor-pointer flex items-start justify-between select-none hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-ink-900 leading-tight">{module.title}</h3>
                      <p className="text-xs font-bold text-ink-500 mt-1">{module.lessonsCount} Lessons</p>
                    </div>
                    <ChevronDown className="h-5 w-5 text-ink-400 group-open:-rotate-180 transition-transform duration-300" />
                  </summary>

                  <div className="border-t border-slate-100 bg-slate-50/50">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:px-6 border-b border-slate-100 last:border-0 hover:bg-white transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1.5 bg-white rounded-lg border border-slate-200 shrink-0 text-slate-400">
                            {lesson.type === 'video' ? <PlayCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </div>
                          <p className="text-sm font-medium text-ink-700 leading-snug pr-4">{lesson.title}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 shrink-0 pl-11 sm:pl-0">
                          {lesson.completed && <Check className="h-4 w-4 text-slate-400" />}
                          <Link href={`/student/learn/${params.id}`} className="px-5 py-1.5 bg-[#334155] hover:bg-slate-800 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-lg shadow-sm transition-colors text-center w-full sm:w-auto">
                            {lesson.completed ? "REVISIT" : "START"}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-16 max-w-4xl mx-auto text-center border-t border-slate-200 mt-16">
        <h2 className="font-display text-xl font-bold text-ink-900 mb-6">Reviews</h2>
        <button className="px-6 py-2 border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 font-bold rounded-lg transition-colors text-sm shadow-sm">
          Add your review now
        </button>
      </div>

    </div>
  );
}
