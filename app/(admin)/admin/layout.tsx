import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import Image from "next/image";
import Link from "next/link";
import pool from "@/lib/db";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Ensure only ADMIN can access this portal
  if ((session.user as any).role !== "ADMIN") {
    redirect("/student/dashboard"); 
  }

  // Always fetch latest profile from DB for the admin layout
  let adminName = session.user.name;
  let adminImage = session.user.image || null;
  try {
    const res = await pool.query("SELECT name, image FROM users WHERE email = $1", [session.user.email]);
    if (res.rows.length > 0) {
      adminName = res.rows[0].name || adminName;
      adminImage = res.rows[0].image || adminImage;
    }
  } catch (error) {
    console.error("Failed to fetch admin profile for layout:", error);
  }

  return (
    <div className="flex h-screen bg-[#fafafa] selection:bg-brand-blue/20 font-sans overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-blue text-white shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10 shrink-0">
          <Link href="/admin/dashboard" className="block hover:scale-[1.02] transition-transform">
            <Image 
              src="/resources/student portal navbar logo.png" 
              alt="Digital Ghuru Admin Portal" 
              width={300} 
              height={80} 
              className="h-20 w-auto object-contain scale-150 origin-left ml-2"
            />
          </Link>
        </div>

          <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              {adminImage ? (
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0 relative">
                  <Image src={adminImage} alt="Admin" fill className="object-cover" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-display font-bold text-xl shadow-sm shrink-0">
                  {(adminName || "A").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-heading font-semibold text-white line-clamp-1" title={adminName ?? undefined}>{adminName}</p>
                <p className="font-heading text-xs font-semibold text-white/70 uppercase tracking-[0.15em]">Admin</p>
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
