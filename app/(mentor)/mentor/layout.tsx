import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MentorSidebar from "./MentorSidebar";

export default async function MentorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Ensure only INSTRUCTOR/MENTOR or ADMIN can access this portal
  if ((session.user as any).role !== "INSTRUCTOR" && (session.user as any).role !== "ADMIN") {
    redirect("/dashboard"); 
  }

  return (
    <div className="flex h-screen bg-ink-50 overflow-hidden">
      {/* Mentor Sidebar */}
      <aside className="w-64 bg-white border-r border-ink-100 shrink-0 hidden md:block">
        <div data-lenis-prevent="true" className="h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-ink-100">
              <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-display font-bold text-xl">
                {(session.user.name || "M").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-ink-900 line-clamp-1">{session.user.name}</p>
                <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">Mentor</p>
              </div>
            </div>

            <MentorSidebar />
          </div>
      </aside>

      {/* Mentor Main Content */}
      <main data-lenis-prevent="true" className="flex-1 overflow-y-auto p-8 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-6xl mx-auto pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
