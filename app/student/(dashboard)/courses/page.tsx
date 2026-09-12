import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Award, Clock, ArrowRight, BookOpen } from "lucide-react";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import { getEnrolledCourses } from "@/lib/student-data";

export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = parseInt(session.user.id);
  const enrolledCourses = await getEnrolledCourses(userId);

  return (
    <RightSidebarWrapper>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="heading-md text-ink-900 tracking-tight mb-2">My Learning</h1>
          <p className="body-md">Pick up right where you left off and continue your journey.</p>
        </div>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 p-12 text-center shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-16 w-16 rounded-xl bg-white shadow-md flex items-center justify-center border border-ink-100/50 mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-200">No courses yet</h3>
            <p className="text-ink-500 font-medium mb-8">Browse our catalog to enroll in your first course!</p>
            <Link href="/student/browse" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFB800] to-[#FF5C00] text-white font-heading font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all shadow-md">
              Browse Courses
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {enrolledCourses.map((course) => (
            <Link 
              key={course.id} 
              href={`/student/learn/${course.id}`}
              className="group relative block bg-white rounded-3xl border border-ink-100 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex flex-col sm:flex-row relative z-10">
                
                {/* Left Column: Minimalist Thumbnail */}
                <div className="w-full sm:w-[280px] md:w-[320px] shrink-0 bg-ink-50 relative overflow-hidden flex items-center justify-center p-8 border-r border-ink-100">
                  {course.imageUrl ? (
                    <Image src={course.imageUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-8 w-8 text-brand-blue" />
                      </div>
                      <span className="font-bold text-ink-900 leading-tight">
                        {course.title.split(":")[0] || course.title}
                      </span>
                    </div>
                  )}
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Right Column: Clean Content & Progress */}
                <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
                  
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors">
                        {course.title}
                      </h3>
                      <p className="body-md text-ink-500 line-clamp-2 max-w-xl">
                        {course.description}
                      </p>
                    </div>
                    
                    {/* Badges */}
                    <div className="shrink-0 flex gap-2">
                      {course.progress === 100 && (
                        <span className="h-fit bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full flex items-center gap-1">
                          <Award className="h-3 w-3" /> Completed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-ink-500 text-xs font-bold uppercase tracking-wider mb-8">
                    <div className="flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4 text-ink-400" /> {course.modules} Module{course.modules !== 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-ink-400" /> {course.timeEstimate}
                    </div>
                  </div>
                  
                  <div className="mt-auto flex flex-col md:flex-row md:items-center gap-6">
                    {/* Subtle Progress Bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">Overall Progress</span>
                        <span className="text-sm font-bold text-ink-900">{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${course.progress === 100 ? 'bg-emerald-500' : 'bg-brand-blue'}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Clean Action Button */}
                    <div className="shrink-0">
                      <div className={`py-3 px-8 rounded-full font-bold text-sm transition-all border flex items-center justify-center gap-2 ${
                        course.progress === 100 
                          ? 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                          : course.progress === 0
                          ? 'bg-white border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
                          : 'bg-gradient-to-r from-[#FFB800] to-[#FF5C00] border-none text-white hover:shadow-lg shadow-md'
                      }`}>
                        {course.progress === 0 ? "Start Learning" : course.progress === 100 ? "Review Course" : "Resume Course"}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </RightSidebarWrapper>
  );
}
