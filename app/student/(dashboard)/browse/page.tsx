import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Search, Filter, PlayCircle } from "lucide-react";

export default async function BrowseCoursesPage() {
  const session = await getServerSession(authOptions);

  // Fetch all published courses
  const coursesRes = await pool.query(
    `SELECT * FROM courses WHERE "isPublished" = true ORDER BY "createdAt" DESC`
  );
  const courses = coursesRes.rows;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">Course Catalog</h1>
        <p className="text-lg text-ink-500 font-medium">Discover new skills and accelerate your career.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-ink-50 text-ink-900"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 border border-ink-200 rounded-xl font-bold text-ink-700 bg-white hover:bg-ink-50 transition-colors shrink-0">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white/90 backdrop-blur-md group border border-ink-100/50 rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="aspect-video bg-ink-50 relative overflow-hidden shrink-0">
              {course.imageUrl ? (
                <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-300">
                  <PlayCircle className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ink-900 shadow-sm">
                {course.price ? `₹${course.price}` : "Free"}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display font-bold text-lg text-ink-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-ink-500 line-clamp-2 mb-6 flex-1">{course.description}</p>
              
              <div className="mt-auto">
                <Button variant="primary" className="w-full">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-ink-500">
            No courses available at the moment. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
