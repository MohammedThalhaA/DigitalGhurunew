import React from "react";
import { Clock, BookOpen, CheckCircle2, UserPlus, MessageSquare, LogIn } from "lucide-react";

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
}

interface RecentActivitiesWidgetProps {
  activities: Activity[];
}

const iconMap: Record<string, { icon: any; color: string; bg: string }> = {
  complete: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  enroll: { icon: BookOpen, color: "text-brand-blue", bg: "bg-blue-50" },
  post: { icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
  join: { icon: UserPlus, color: "text-amber-500", bg: "bg-amber-50" },
  login: { icon: LogIn, color: "text-ink-400", bg: "bg-ink-50" },
};

export default function RecentActivitiesWidget({ activities }: RecentActivitiesWidgetProps) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="p-6 border-b border-ink-50 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
            <Clock className="h-5 w-5 text-ink-500" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-ink-900 tracking-wider uppercase group-hover:text-brand-blue transition-colors duration-200">Recent Activity</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-2 relative z-10">
        {activities.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm font-medium text-ink-400">No recent activity yet. Start learning!</p>
          </div>
        ) : (
          activities.slice(0, 4).map((activity) => {
            const mapping = iconMap[activity.type] || iconMap.login;
            const Icon = mapping.icon;
            return (
              <div key={activity.id} className="flex gap-4 p-4 rounded-2xl hover:bg-ink-50 transition-colors">
                <div className={`h-12 w-12 shrink-0 rounded-full ${mapping.bg} flex items-center justify-center shadow-inner`}>
                  <Icon className={`h-5 w-5 ${mapping.color}`} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="font-heading text-sm font-semibold text-ink-900 truncate mb-1">{activity.title}</p>
                  <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-wider">{activity.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
