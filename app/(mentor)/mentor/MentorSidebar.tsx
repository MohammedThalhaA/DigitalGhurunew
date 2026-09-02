"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  GraduationCap, 
  BarChart,
  MessageSquare,
  Bell, 
  Settings,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function MentorSidebar() {
  const pathname = usePathname();

  const navItems = [
    { section: "Main", items: [
      { name: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/mentor/courses", icon: Book },
    ]},
    { section: "Management", items: [
      { name: "Batches", href: "/mentor/batches", icon: Users },
      { name: "My Students", href: "/mentor/students", icon: GraduationCap },
    ]},
    { section: "Engagement", items: [
      { name: "Analytics", href: "/mentor/analytics", icon: BarChart },
      { name: "Feedback", href: "/mentor/feedback", icon: MessageSquare },
    ]},
    { section: "Account", items: [
      { name: "Notifications", href: "/mentor/notifications", icon: Bell },
      { name: "Settings", href: "/mentor/settings", icon: Settings },
    ]}
  ];

  return (
    <nav className="space-y-6">
      {navItems.map((group) => (
        <div key={group.section}>
          <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-2 px-4">{group.section}</p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-colors ${
                    isActive 
                      ? "bg-brand-orange/10 text-brand-orange" 
                      : "hover:bg-brand-orange/5 hover:text-brand-orange text-ink-500"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-brand-orange" : "text-ink-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="pt-6 border-t border-ink-100 mt-6">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-colors hover:bg-red-50 text-red-500 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </nav>
  );
}
