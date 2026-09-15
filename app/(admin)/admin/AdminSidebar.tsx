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
  FileText,
  PhoneCall
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
    ]},
    { section: "User Management", items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Enrollments", href: "/admin/enrollments", icon: BadgeDollarSign },
    ]},
    { section: "Sales & Leads", items: [
      { name: "Course Leads", href: "/admin/leads", icon: PhoneCall },
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
          <p className="font-heading text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-2 px-4">{group.section}</p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + "/")) : false;
              // Special case to prevent /admin/courses from matching /admin/courses/new
              const isStrictActive = isActive && !(item.href === "/admin/courses" && pathname?.startsWith("/admin/courses/new"));

              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-heading font-semibold transition-colors ${
                    isStrictActive 
                      ? "bg-white/10 text-brand-gold shadow-sm" 
                      : "hover:bg-white/10 text-white/80 hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isStrictActive ? "text-brand-gold" : "text-white/60"}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="pt-6 border-t border-white/10 mt-6">
        <button 
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-heading font-semibold transition-colors hover:bg-red-500/20 text-red-300 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </nav>
  );
}
