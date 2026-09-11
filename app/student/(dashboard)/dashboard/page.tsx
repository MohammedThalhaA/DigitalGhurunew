import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import CourseProgressCard from "@/components/student/CourseProgressCard";
import { Zap, Star, BookOpen, TrendingUp, PlayCircle } from "lucide-react";
import Image from "next/image";
import { getStudentStats, getEnrolledCourses } from "@/lib/student-data";
import pool from "@/lib/db";
import Greeting from "@/components/student/Greeting";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = parseInt(session.user.id);

  // Fetch real data
  const stats = await getStudentStats(userId);
  const enrolledCourses = await getEnrolledCourses(userId);

  // Active course = first enrolled course with progress < 100, or the first course
  const activeCourse = enrolledCourses.find(c => c.progress < 100) || enrolledCourses[0] || null;

  // My courses = all enrolled
  const myCourses = enrolledCourses.map(c => ({
    id: c.id,
    title: c.title,
    subtitle: c.description?.substring(0, 60) || "",
    progress: c.progress,
    imageUrl: c.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  }));

  // Recommended courses: courses NOT enrolled in
  let recommendedCourses: any[] = [];
  try {
    const recommendedRes = await pool.query(
      `SELECT c.id, c.title, c.description, c."imageUrl" as image 
       FROM courses c 
       LEFT JOIN enrollments e ON c.id = e."courseId" AND e."userId" = $1
       WHERE e.id IS NULL AND c."isPublished" = true
       LIMIT 4`,
      [userId]
    );
    recommendedCourses = recommendedRes.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      subtitle: row.description?.substring(0, 60) || "",
      image: row.image || "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800",
    }));
  } catch (error) {
    console.warn("Failed to fetch recommended courses:", error);
  }

  // Calculate total chapters for active course
  const activeCourseChapters = { completed: 0, total: 0 };
  if (activeCourse) {
    try {
      const chapRes = await pool.query(
        `SELECT 
           (SELECT COUNT(*) FROM chapters ch JOIN modules m ON ch."moduleId" = m.id WHERE m."courseId" = $1) as total,
           (SELECT COUNT(*) FROM user_progress up JOIN chapters ch ON up."chapterId" = ch.id JOIN modules m ON ch."moduleId" = m.id WHERE m."courseId" = $1 AND up."userId" = $2 AND up."isCompleted" = true) as completed`,
        [parseInt(activeCourse.id), userId]
      );
      if (chapRes.rows.length > 0) {
        activeCourseChapters.total = parseInt(chapRes.rows[0].total) || 0;
        activeCourseChapters.completed = parseInt(chapRes.rows[0].completed) || 0;
      }
    } catch {}
  }

  return (
    <RightSidebarWrapper>
      
      {/* Greeting Row */}
      <div className="mb-8">
        <h1 className="heading-md text-ink-900 mb-2">
          <Greeting name={session.user.name?.split(' ')[0] || "Student"} />
        </h1>
        <p className="body-md">Continue your learning journey and reach your next milestone.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-amber-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-amber-600 transition-colors duration-200">Current Streak</p>
              <p className="font-display text-xl font-bold text-ink-900">{stats.streakCount} Day{stats.streakCount !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
        
        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors duration-200">Total Points</p>
              <p className="font-display text-xl font-bold text-ink-900">{stats.xpPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-emerald-600 transition-colors duration-200">Courses</p>
              <p className="font-display text-xl font-bold text-ink-900">{stats.totalCoursesDone} Done</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-6 shadow-card hover:shadow-card-hover hover:border-rose-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] group-hover:text-rose-600 transition-colors duration-200">Progress</p>
              <p className="font-display text-xl font-bold text-ink-900">{stats.percentile}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Continue Learning */}
      {activeCourse ? (
        <div className="mb-10 relative">
          <h2 className="eyebrow !text-amber-500 mb-4">Continue Learning</h2>
          <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden flex flex-col md:flex-row group relative z-10 hover:shadow-card-hover transition-all duration-300">
            <div className="md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden shrink-0">
               <Image 
                 src={activeCourse.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
                 alt={activeCourse.title} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
               <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                 <span className="text-white text-xs font-bold tracking-[0.15em] uppercase shadow-sm">In Progress</span>
               </div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center bg-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

              <h3 className="font-display text-lg font-bold text-ink-900 mb-3">{activeCourse.title}</h3>
              <p className="body-md mb-8">{activeCourse.description}</p>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <span className="font-heading text-sm font-semibold text-ink-900">{activeCourse.progress}% Complete</span>
                  <span className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">
                    {activeCourseChapters.completed} / {activeCourseChapters.total} lessons
                  </span>
                </div>
                <div className="w-full bg-ink-100/80 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-amber-400 to-brand-orange h-full rounded-full transition-all duration-1000 relative" style={{ width: `${activeCourse.progress}%` }}>
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                  </div>
                </div>
              </div>

              <Link href={`/student/learn/${activeCourse.id}`} className="inline-flex items-center justify-center gap-3 bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md w-full sm:w-auto uppercase tracking-wide">
                Resume Module <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10 group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-12 text-center shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-16 w-16 rounded-xl bg-white shadow-md flex items-center justify-center border border-ink-100/50 mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-200">No courses yet</h3>
            <p className="text-ink-500 font-medium mb-8">Browse our course catalog to start your learning journey!</p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-brand-blue text-white font-heading font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all shadow-md">
              Browse Courses
            </Link>
          </div>
        </div>
      )}

      {/* My Learning Section */}
      {myCourses.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold text-ink-900">My Learning</h2>
            <Link href="/student/courses" className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue hover:text-blue-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.map(course => (
              <CourseProgressCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      )}

      {/* Recommended Section */}
      {recommendedCourses.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold text-ink-900">Recommended for you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedCourses.map((course) => (
              <Link key={course.id} href={`/student/courses/${course.id}`} className="group bg-white rounded-[32px] border border-ink-100 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(20,20,40,0.03)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] flex flex-col hover:-translate-y-1 transition-all overflow-hidden relative h-full">
                
                <div className="w-full aspect-video flex items-center justify-center shrink-0 relative overflow-hidden bg-ink-900 border-b border-ink-50">
                   <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                   <PlayCircle className="h-14 w-14 text-white/90 group-hover:text-white group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-lg" />
                </div>
                
                <div className="p-8 flex-1 flex flex-col min-w-0 bg-white">
                  <h3 className="font-display font-bold text-ink-900 text-base mb-3 group-hover:text-brand-blue transition-colors line-clamp-1">{course.title}</h3>
                  <p className="font-body text-sm text-ink-500 mb-8 line-clamp-2 leading-relaxed">{course.subtitle}</p>
                  
                  <div className="mt-auto flex justify-between items-center text-xs font-bold uppercase tracking-[0.15em] pt-5 border-t border-ink-100">
                     <span className="text-amber-500 group-hover:text-amber-600 transition-colors">Explore Course</span>
                     <span className="text-amber-500 group-hover:translate-x-1 transition-transform group-hover:text-amber-600">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </RightSidebarWrapper>
  );
}
