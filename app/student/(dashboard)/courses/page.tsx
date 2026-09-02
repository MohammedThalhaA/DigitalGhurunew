import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { PlayCircle, CheckCircle2 } from "lucide-react";

export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  // Fetch enrolled courses
  const enrollmentsRes = await pool.query(
    `
    SELECT c.id, c.title, c."imageUrl", c.description
    FROM courses c
    INNER JOIN enrollments e ON e."courseId" = c.id
    WHERE e."userId" = $1
    ORDER BY e."createdAt" DESC
    `,
    [parseInt(session.user.id)]
  );

  const enrolledCourses = enrollmentsRes.rows;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">My Library</h1>
        <p className="text-lg text-ink-500 font-medium">All the courses you are currently enrolled in.</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-100 p-16 text-center shadow-sm">
          <h3 className="text-xl font-bold text-ink-900 mb-2">Your library is empty</h3>
          <p className="text-ink-500 max-w-md mx-auto mb-8">
            You haven't enrolled in any courses yet. Head over to the catalog to find your next skill!
          </p>
          <Button variant="primary" href="/student/browse">
            Explore Catalog
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white group border border-ink-100 rounded-2xl overflow-hidden hover:shadow-card transition-shadow duration-200 flex flex-col">
              <div className="aspect-video bg-ink-50 relative overflow-hidden shrink-0">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-300">
                    <PlayCircle className="h-12 w-12" />
                  </div>
                )}
                
                {/* Dummy completion badge for UI sake */}
                {course.id % 2 === 0 && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg text-ink-900 mb-2 line-clamp-1">{course.title}</h3>
                
                <div className="mb-6 mt-auto">
                  <div className="flex justify-between text-xs font-bold text-ink-500 mb-1">
                    <span>{course.id % 2 === 0 ? "100%" : "24%"} Complete</span>
                  </div>
                  <div className="w-full bg-ink-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${course.id % 2 === 0 ? "bg-green-500" : "bg-brand-blue"}`} style={{ width: course.id % 2 === 0 ? "100%" : "24%" }}></div>
                  </div>
                </div>
                
                <Button 
                  variant={course.id % 2 === 0 ? "outline" : "primary"} 
                  className="w-full" 
                  href={`/student/courses/${course.id}`}
                >
                  {course.id % 2 === 0 ? "Review Course" : "Continue Learning"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
