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
    <div className="min-h-screen bg-[#F7F7FA] flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
