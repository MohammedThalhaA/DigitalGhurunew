import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Ensure only ADMIN can access this portal
  if ((session.user as any).role !== "ADMIN") {
    redirect("/student/dashboard"); 
  }

  return (
    <div className="flex h-screen bg-[#fafafa] selection:bg-brand-blue/20 font-sans overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-ink-100 shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-ink-100 shrink-0">
          <Link href="/admin/dashboard" className="block">
            <Image 
              src="/resources/student portal navbar logo.png" 
              alt="Digital Ghuru Admin Portal" 
              width={200} 
              height={50} 
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-ink-100">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-bold text-xl shadow-sm">
                {(session.user.name || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-heading font-semibold text-ink-900 line-clamp-1">{session.user.name}</p>
                <p className="font-heading text-xs font-semibold text-brand-blue uppercase tracking-[0.15em]">Admin</p>
              </div>
            </div>

            <AdminSidebar />
          </div>
      </aside>

      {/* Admin Main Content */}
      <main data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-full max-w-[1650px] mx-auto pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
