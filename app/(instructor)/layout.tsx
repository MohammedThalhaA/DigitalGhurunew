import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Book, LogOut } from "lucide-react";

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Ensure only INSTRUCTOR or ADMIN can access this portal
  if ((session.user as any).role !== "INSTRUCTOR" && (session.user as any).role !== "ADMIN") {
    redirect("/dashboard"); // Kick regular students out
  }

  return (
    <div className="min-h-screen bg-ink-50 pt-[72px]">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Instructor Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-ink-100 sticky top-24">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-ink-100">
              <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-display font-bold text-xl">
                {(session.user.name || "I").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-ink-900 line-clamp-1">{session.user.name}</p>
                <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">Instructor</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link href="/instructor" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ink-50 hover:text-ink-900 text-ink-600 transition-colors font-medium">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/instructor/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-orange/5 text-brand-orange font-semibold">
                <Book className="h-5 w-5" />
                My Courses
              </Link>
            </nav>
          </div>
        </aside>

        {/* Instructor Main Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
