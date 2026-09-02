import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StudentSidebar from "./StudentSidebar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Assuming default users have role "USER" or similar. Admin/Instructor should be blocked.
  if ((session.user as any).role === "INSTRUCTOR" || (session.user as any).role === "ADMIN") {
    redirect("/mentor/dashboard");
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative selection:bg-brand-blue/20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Student Sidebar */}
      <div className="hidden md:flex flex-col py-6 pl-6 z-10 shrink-0">
        <aside className="w-[280px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full rounded-3xl flex flex-col overflow-hidden">
          <div data-lenis-prevent="true" className="h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg shadow-brand-blue/20">
                {(session.user.name || "S").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-ink-900 line-clamp-1">{session.user.name}</p>
                <p className="text-xs text-brand-blue font-bold uppercase tracking-wider">Student</p>
              </div>
            </div>

            <StudentSidebar />
          </div>
        </aside>
      </div>

      {/* Student Main Content */}
      <main data-lenis-prevent="true" className="flex-1 overflow-y-auto p-8 md:p-10 min-w-0 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-6xl mx-auto pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
