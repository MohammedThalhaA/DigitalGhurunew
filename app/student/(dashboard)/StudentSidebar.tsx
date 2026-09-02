"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Compass, 
  Library, 
  LineChart, 
  Award,
  User,
  Bell, 
  HelpCircle,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function StudentSidebar() {
  const pathname = usePathname();

  const navItems = [
    { section: "Learning", items: [
      { name: "My Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { name: "Browse Courses", href: "/student/browse", icon: Compass },
      { name: "My Courses", href: "/student/courses", icon: Library },
      { name: "Learning Progress", href: "/student/progress", icon: LineChart },
      { name: "Certificates", href: "/student/certificates", icon: Award },
    ]},
    { section: "Account", items: [
      { name: "Profile", href: "/student/profile", icon: User },
      { name: "Notifications", href: "/student/notifications", icon: Bell },
      { name: "Help & Support", href: "/student/support", icon: HelpCircle },
    ]}
  ];

  return (
    <nav className="space-y-8 flex-1 flex flex-col">
      {navItems.map((group) => (
        <div key={group.section}>
          <p className="text-[11px] font-bold text-ink-400 uppercase tracking-[0.2em] mb-3 px-4">{group.section}</p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${
                    isActive 
                      ? "bg-gradient-to-r from-brand-blue/10 to-transparent text-brand-blue" 
                      : "hover:bg-ink-50/80 hover:text-ink-900 text-ink-500"
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] ${isActive ? "text-brand-blue" : "text-ink-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={isActive ? "font-extrabold" : "font-semibold"}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="pt-6 border-t border-ink-100/50 mt-auto mb-2">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-colors hover:bg-red-50/50 text-red-500 hover:text-red-600"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
          Log Out
        </button>
      </div>
    </nav>
  );
}
