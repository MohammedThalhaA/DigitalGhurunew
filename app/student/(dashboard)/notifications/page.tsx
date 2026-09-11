import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BellRing, CheckCircle2, AlertCircle } from "lucide-react";
import { getStudentNotifications } from "@/lib/student-data";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";

export default async function StudentNotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = parseInt(session.user.id);
  const notifications = await getStudentNotifications(userId);

  // Mark all as read on page visit
  try {
    const pool = (await import("@/lib/db")).default;
    await pool.query(
      `UPDATE notifications SET "isRead" = true WHERE "userId" = $1 AND "isRead" = false`,
      [userId]
    );
  } catch {}

  return (
    <RightSidebarWrapper>
      <div className="mb-10">
        <h1 className="heading-md text-ink-900 tracking-tight mb-3">Notifications</h1>
        <p className="text-lg text-ink-500 font-medium">Stay updated on your courses and platform announcements.</p>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <BellRing className="h-12 w-12 text-ink-300 mx-auto mb-4" />
            <h3 className="font-display text-base font-bold text-ink-900 mb-2">No notifications yet</h3>
            <p className="text-ink-500 font-medium">You&apos;re all caught up! Notifications will appear here as you progress.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-6 flex gap-4 hover:bg-ink-50/50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-brand-blue/5' : ''}`}>
                <div className="shrink-0 mt-1">
                  {notif.type === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                  {notif.type === "info" && <BellRing className="h-6 w-6 text-brand-blue" />}
                  {notif.type === "alert" && <AlertCircle className="h-6 w-6 text-brand-orange" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-ink-900">{notif.title}</h3>
                    <span className="text-xs font-semibold text-ink-400 whitespace-nowrap ml-4">{notif.time}</span>
                  </div>
                  <p className="text-ink-600 text-sm">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RightSidebarWrapper>
  );
}
