import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Search, Filter, PlayCircle } from "lucide-react";
import CourseCard from "@/components/cards/CourseCard";

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
        <h1 className="heading-md text-ink-900 tracking-tight mb-3">Course Catalog</h1>
        <p className="body-md">Discover new skills and accelerate your career.</p>
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
        {courses.map((course) => {
          const mData = course.marketing_data || {};
          const cardImage = mData.cardImage || course.imageUrl || mData.thumbnail || "";
          
          return (
            <div key={course.id} className="h-full">
              <CourseCard
                title={course.title || mData.title || "Course Title"}
                blurb={course.description || mData.description || ""}
                format={mData.format || "Classroom + Online"}
                duration={mData.duration || "3 to 6 Months"}
                brochureUrl={mData.brochureUrl || ""}
                originalPrice={mData.originalPrice || "—"}
                discountedPrice={mData.discountedPrice || (course.price ? `₹${Number(course.price).toLocaleString('en-IN')}` : "Contact Us")}
                cardImage={cardImage}
                image={cardImage}
                ctaText="View Details"
                ctaHref={`/student/courses/${course.id}`}
              />
            </div>
          );
        })}
        {courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-ink-500">
            No courses available at the moment. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
