import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

export default async function CourseLearningPage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return redirect("/signin");

  const courseId = parseInt(params.courseId);

  // 1. Verify Enrollment
  const enrollmentRes = await pool.query(
    `SELECT * FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
    [parseInt(session.user.id), courseId]
  );

  if (enrollmentRes.rows.length === 0) {
    return redirect("/student/browse");
  }

  // 2. Fetch Course Data
  const courseRes = await pool.query(`SELECT * FROM courses WHERE id = $1`, [courseId]);
  const course = courseRes.rows[0];

  // 3. Fetch Modules
  const modulesRes = await pool.query(
    `SELECT * FROM modules WHERE "courseId" = $1 ORDER BY position ASC`,
    [courseId]
  );
  const modules = modulesRes.rows;

  return (
    <div className="flex h-full">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-ink-900 data-lenis-prevent">
        <div className="w-full aspect-video bg-black relative flex items-center justify-center">
          {/* Here we would embed the Google Drive iframe or video player */}
          <div className="text-center">
            <PlayCircle className="h-20 w-20 text-ink-500 mx-auto mb-4 opacity-50" />
            <p className="text-ink-400 font-bold">Video Player Placeholder</p>
            <p className="text-ink-500 text-sm mt-2 max-w-sm mx-auto">
              Google Drive links and iframe embeds will be injected here dynamically based on the selected module.
            </p>
          </div>
        </div>

        <div className="p-8 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-display font-bold text-white mb-4">{course.title}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-ink-300 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-80 bg-ink-950 border-l border-ink-800 flex flex-col shrink-0 h-full">
        <div className="p-4 border-b border-ink-800">
          <h2 className="font-bold text-white">Course Content</h2>
          <div className="mt-2 w-full bg-ink-800 rounded-full h-1.5">
            <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: "24%" }}></div>
          </div>
          <p className="text-xs text-ink-400 mt-1">24% Complete</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 data-lenis-prevent">
          {modules.length === 0 ? (
            <p className="text-ink-500 text-sm italic text-center mt-4">No modules available yet.</p>
          ) : (
            modules.map((mod, index) => (
              <div 
                key={mod.id} 
                className={`p-3 rounded-lg border ${index === 0 ? 'bg-brand-blue/10 border-brand-blue/30' : 'bg-ink-900 border-ink-800'} hover:bg-ink-800 transition-colors cursor-pointer group`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {index === 0 ? (
                      <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                    ) : (
                      <Circle className="h-5 w-5 text-ink-500 group-hover:text-ink-300" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${index === 0 ? 'text-brand-blue' : 'text-ink-200'}`}>
                      {index + 1}. {mod.title}
                    </h4>
                    <p className="text-xs text-ink-500 mt-1 flex items-center gap-1">
                      <PlayCircle className="h-3 w-3" />
                      15 mins
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
