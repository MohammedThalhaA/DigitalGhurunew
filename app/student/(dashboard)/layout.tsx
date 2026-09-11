import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LMSNavbar from "@/components/layout/LMSNavbar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Assuming default users have role "USER" or similar. Admin should be blocked from student portal.
  if ((session.user as any).role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-brand-blue/20 flex flex-col font-sans">
      <LMSNavbar />
      
      {/* Student Main Content */}
      <main className="flex-1 pt-[112px]">
        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
