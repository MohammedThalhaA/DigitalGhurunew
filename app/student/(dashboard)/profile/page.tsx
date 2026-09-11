import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import ProfileClient from "@/components/student/ProfileClient";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return null;

  return (
    <RightSidebarWrapper>
      <div className="mb-8">
        <h1 className="heading-md text-ink-900 tracking-tight mb-2">Settings & Profile</h1>
        <p className="body-md">Manage your personal information, preferences, and security.</p>
      </div>

      <ProfileClient user={session.user} />
      
    </RightSidebarWrapper>
  );
}
