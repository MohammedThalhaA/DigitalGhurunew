import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function LearningLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col h-screen bg-ink-900 text-white overflow-hidden">
      {/* Minimal Top Nav */}
      <header className="h-16 bg-ink-950 border-b border-ink-800 flex items-center justify-between px-6 shrink-0">
        <Link href="/student/courses" className="flex items-center text-sm font-semibold text-ink-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">{session.user.name}</p>
            <p className="text-xs text-ink-400">Student</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold">
            {(session.user.name || "S").charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
