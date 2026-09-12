"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Book, 
  Settings,
  LogOut,
  Video,
  Users,
  BadgeDollarSign,
  Briefcase,
  FileText
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { section: "Main", items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ]},
    { section: "Content Management", items: [
      { name: "Courses", href: "/admin/courses", icon: Book },
      { name: "Video Uploads", href: "/admin/courses/new", icon: Video },
    ]},
    { section: "User Management", items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Enrollments", href: "/admin/enrollments", icon: BadgeDollarSign },
    ]},
    { section: "Hiring Management", items: [
      { name: "Job Openings", href: "/admin/careers", icon: Briefcase },
      { name: "Applications", href: "/admin/applications", icon: FileText },
    ]},
    { section: "Account", items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]}
  ];

  return (
    <nav className="space-y-6">
      {navItems.map((group) => (
        <div key={group.section}>
          <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] mb-2 px-4">{group.section}</p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/") && item.href !== "/admin/courses";
              // Special case to prevent /admin/courses from matching /admin/courses/new
              const isStrictActive = isActive && !(pathname.startsWith("/admin/courses/new") && item.href === "/admin/courses");

              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-heading font-semibold transition-colors ${
                    isStrictActive 
                      ? "bg-brand-blue/10 text-brand-blue" 
                      : "hover:bg-brand-blue/5 hover:text-brand-blue text-ink-500"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isStrictActive ? "text-brand-blue" : "text-ink-400"}`} />
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
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-heading font-semibold transition-colors hover:bg-red-50 text-red-500 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </nav>
  );
}
