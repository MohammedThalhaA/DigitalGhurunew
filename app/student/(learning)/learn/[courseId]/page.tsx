import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CheckCircle2, Circle, PlayCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CourseSidebarClient from "@/components/student/CourseSidebarClient";

export default async function CourseLearningPage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return redirect("/signin");

  const rawCourseId = params.courseId;
  const parsedCourseId = parseInt(rawCourseId);
  let course: any = null;
  let isEnrolled = true;
  
  // Generic Mock Data Fallback
  let courseTitle = rawCourseId === "marketing-mastery" ? "Digital Marketing Mastery" : "AI Marketing Blueprint";
  let modules: any[] = [
    { title: "Module 1: Foundations of Marketing", completed: true, lessons: [
      { id: 1, title: "Introduction to the Course", duration: "12:04", completed: true, videoUrl: "https://drive.google.com/example" },
      { id: 2, title: "Understanding Your Audience", duration: "24:15", completed: true, videoUrl: "" },
    ]},
    { title: "Module 2: Advanced Strategies", completed: false, lessons: [
      { id: 3, title: "Funnel Optimization", duration: "18:30", completed: false, active: true, videoUrl: "" },
      { id: 4, title: "Conversion Tracking", duration: "31:45", completed: false, videoUrl: "" },
    ]},
    { title: "Module 3: Scaling Ads", completed: false, lessons: [
      { id: 5, title: "Facebook Ads Deep Dive", duration: "45:00", completed: false, videoUrl: "" },
      { id: 6, title: "Google Search Intent", duration: "28:20", completed: false, videoUrl: "" },
    ]},
  ];

  try {
    if (!isNaN(parsedCourseId)) {
      // 1. Verify Enrollment
      const enrollmentRes = await pool.query(
        `SELECT * FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
        [parseInt(session.user.id), parsedCourseId]
      );

      if (enrollmentRes.rows.length === 0) {
        isEnrolled = false;
        // In a real app we'd redirect, but to allow UI dev we proceed with warning
        console.warn("User not enrolled, but allowing access for development UI");
      }

      // 2. Fetch Course Data
      const courseRes = await pool.query(`SELECT * FROM courses WHERE id = $1`, [parsedCourseId]);
      if (courseRes.rows.length > 0) {
        course = courseRes.rows[0];
        courseTitle = course.title;
        
        // Fetch Modules & Chapters
        const modulesRes = await pool.query(`SELECT * FROM modules WHERE "courseId" = $1 ORDER BY position ASC`, [parsedCourseId]);
        const allModules = modulesRes.rows;
        
        const chaptersRes = await pool.query(`
          SELECT c.*, p."isCompleted" 
          FROM chapters c
          LEFT JOIN user_progress p ON p."chapterId" = c.id AND p."userId" = $1
          WHERE c."moduleId" = ANY($2)
          ORDER BY c.position ASC
        `, [parseInt(session.user.id), allModules.map(m => m.id)]);

        // Map to UI Structure
        if (allModules.length > 0) {
          modules = allModules.map(mod => {
            const modChapters = chaptersRes.rows.filter(c => c.moduleId === mod.id);
            const allCompleted = modChapters.length > 0 && modChapters.every(c => c.isCompleted);
            
            return {
              id: mod.id,
              title: mod.title,
              completed: allCompleted,
              lessons: modChapters.map(ch => ({
                id: ch.id,
                title: ch.title,
                duration: "10:00", // Hardcoded mock since no duration in schema
                completed: ch.isCompleted || false,
                active: false, // We'll compute this on client
                videoUrl: ch.videoUrl
              }))
            };
          });
        }
      }
    }
  } catch (error) {
    console.warn("Database unavailable for course player, falling back to mock data:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7FA] font-sans">
      
      {/* Top Navbar */}
      <header className="h-20 bg-white border-b border-ink-100 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30 shadow-[0_4px_20px_rgba(20,20,40,0.02)]">
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Back Button */}
          <Link href="/student/dashboard" className="flex items-center justify-center h-10 w-10 rounded-full bg-ink-50 hover:bg-ink-100 transition-colors shrink-0 group shadow-sm border border-ink-100">
            <ArrowLeft className="h-5 w-5 text-ink-600 group-hover:text-ink-900 group-hover:-translate-x-0.5 transition-all" />
          </Link>

          <Link href="/student/dashboard" className="shrink-0 flex items-center gap-3 hover:scale-105 transition-transform group hidden md:flex">
            <img 
              src="/logo-final dG.webp" 
              alt="Digital Ghuru Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-xl font-display font-bold text-ink-900 leading-none tracking-tight">Digital<span className="text-brand-blue">Ghuru</span></span>
            </div>
          </Link>
          <div className="h-8 w-px bg-ink-200 hidden sm:block"></div>
          <div>
            <h1 className="font-display text-ink-900 font-bold text-lg truncate max-w-[200px] sm:max-w-sm">{courseTitle}</h1>
            <p className="text-xs font-bold text-ink-400 uppercase tracking-[0.15em]">Course Player</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.15em] block mb-1">Your Progress</span>
            <span className="text-sm font-bold text-ink-900 block">22% Complete</span>
          </div>
          <div className="w-40 h-3 bg-ink-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-amber-400 to-brand-orange relative" style={{ width: '22%' }}>
               <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Full Screen Layout on Desktop */}
      <div className="flex flex-col lg:flex-row flex-1 lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#F7F7FA]">
        
        {/* Left Column: Player & Info (Scrollable on Desktop) */}
        <div className="flex-1 lg:overflow-y-auto min-w-0 flex flex-col bg-[#F7F7FA]">
          
          {/* Video Player Container (Edge to Edge) */}
          <div className="w-full relative bg-black flex items-center justify-center shrink-0 shadow-xl" style={{ aspectRatio: '16/9', maxHeight: 'calc(100vh - 80px)' }}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 backdrop-blur-sm group">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF5C00] flex items-center justify-center shadow-[0_8px_30px_rgba(255,92,0,0.4)] transform group-hover:scale-110 transition-transform">
                <PlayCircle className="h-12 w-12 text-white fill-white/20 ml-1" />
              </div>
            </div>

            {/* Video Title Overlay (Top Left) */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
              <h2 className="text-white font-display text-2xl font-bold tracking-wide drop-shadow-md">Funnel Optimization</h2>
              <p className="text-white/70 font-bold text-sm tracking-[0.15em] uppercase drop-shadow-sm mt-1">Module 2: Advanced Strategies</p>
            </div>

            {/* Mock Player Controls (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent z-20 px-6 flex items-end pb-4">
              <div className="w-full flex items-center gap-4">
                <PlayCircle className="h-8 w-8 text-white cursor-pointer hover:text-[#FFB800] transition-colors" />
                <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-[#FFB800]"></div>
                  <div className="absolute top-1/2 left-1/3 h-3 w-3 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white text-xs font-bold font-mono tracking-wider">18:30 / 45:00</span>
              </div>
            </div>
            
            {/* Initial State text */}
            <div className="text-center relative z-0">
               <h2 className="text-white/60 font-bold text-3xl uppercase tracking-[0.15em] mb-3 drop-shadow-md">Funnel Optimization</h2>
               <p className="text-[#FFB800]/80 text-sm font-bold tracking-[0.15em] uppercase">Click to play video</p>
            </div>
          </div>

          {/* Lesson Info Card Area */}
          <div className="p-4 sm:p-8 xl:p-10 flex-1">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-card hover:shadow-card-hover border border-ink-100 relative overflow-hidden transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                <div>
                  <p className="text-xs font-bold text-[#FFB800] uppercase tracking-[0.15em] mb-2">Module 2: Advanced Strategies</p>
                  <h2 className="font-display text-2xl font-bold text-ink-900 leading-tight">Funnel Optimization</h2>
                </div>
                <button className="shrink-0 px-8 py-4 bg-gradient-to-r from-[#FFB800] to-[#FF5C00] hover:brightness-110 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm tracking-[0.15em] uppercase flex items-center gap-2 group">
                  Complete & Continue <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>
              <div className="prose prose-ink max-w-none relative z-10">
                <p className="text-lg leading-relaxed text-ink-600 font-medium">In this lesson, we dive deep into optimizing your conversion funnels. You will learn how to identify drop-off points, improve your copywriting for higher CTRs, and set up proper A/B tests to continuously scale your campaigns.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Curriculum / Resources / Discussion */}
        <CourseSidebarClient modules={modules} />
      </div>
    </div>
  );
}
