import { BellRing, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudentNotificationsPage() {
  const notifications = [
    { id: 1, type: "success", title: "Course Completed", message: "Congratulations! You have completed SEO Mastery. Your certificate is now available.", time: "1 day ago" },
    { id: 2, type: "info", title: "New Assignment", message: "Your mentor added a new assignment to Advanced Digital Marketing.", time: "3 days ago" },
    { id: 3, type: "alert", title: "Platform Update", message: "Scheduled maintenance will occur on Saturday at 2 AM IST.", time: "1 week ago" },
  ];

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">Notifications</h1>
        <p className="text-lg text-ink-500 font-medium">Stay updated on your courses and platform announcements.</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-ink-100">
          {notifications.map(notif => (
            <div key={notif.id} className="p-6 flex gap-4 hover:bg-ink-50/50 transition-colors cursor-pointer">
              <div className="shrink-0 mt-1">
                {notif.type === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                {notif.type === "info" && <BellRing className="h-6 w-6 text-brand-blue" />}
                {notif.type === "alert" && <AlertCircle className="h-6 w-6 text-brand-orange" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-ink-900">{notif.title}</h3>
                  <span className="text-xs font-semibold text-ink-400">{notif.time}</span>
                </div>
                <p className="text-ink-600 text-sm">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
