"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Zap, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const navLinks = [
  { name: "Dashboard", href: "/student/dashboard" },
  { name: "My Courses", href: "/student/courses" },
  { name: "Community", href: "/student/community" },
  { name: "Leaderboard", href: "/student/leaderboard" },
  { name: "Support", href: "/student/support" },
];

export default function LMSNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navData, setNavData] = useState({ streak: 0, unreadNotifications: 0, name: "", image: "" });
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/student/navbar-data")
        .then(res => res.json())
        .then(data => setNavData(data))
        .catch(() => {});
    }
  }, [session?.user?.id, pathname]);

  const fetchNotifications = async () => {
    setLoadingNotifs(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setNavData(prev => ({ ...prev, unreadNotifications: data.unreadCount || 0 }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingNotifs(false);
    }
  };

  const markRead = async (id: number) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setNavData(prev => ({ ...prev, unreadNotifications: Math.max(0, prev.unreadNotifications - 1) }));
    } catch (e) {}
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: "{}" });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setNavData(prev => ({ ...prev, unreadNotifications: 0 }));
    } catch (e) {}
  };

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-50 flex justify-center pointer-events-none">
      <nav className="h-[72px] bg-[#006FFF] border border-white/10 rounded-[32px] flex items-center shadow-[0_8px_30px_rgba(20,20,40,0.06)] pointer-events-auto w-full max-w-[1600px] transition-all duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        
        {/* Left: Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 -ml-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/student/dashboard" className="flex items-center gap-3 group shrink-0 h-full py-2 ml-2 sm:ml-4 lg:ml-6">
              <Image 
                src="/logo-for-logins.png" 
                alt="Digital Ghuru" 
                width={120} 
                height={120} 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform hover:scale-105"
                priority
              />
              <div className="relative w-28 sm:w-36 md:w-48 h-8 sm:h-10 md:h-12 -ml-8 sm:-ml-10 md:-ml-12 overflow-hidden flex items-center justify-center pointer-events-none">
                <Image 
                  src="/resources/student portal.png" 
                  alt="Student Portal" 
                  fill
                  className="object-contain scale-[2.5] sm:scale-[3] origin-center"
                  priority
                />
              </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2.5 text-[15px] font-heading font-semibold rounded-full transition-all duration-300 relative group ${
                  isActive 
                    ? "text-brand-gold" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Premium Active Indicator Pill */}
                {isActive ? (
                  <motion.div
                    layoutId="lms-nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 scale-95 group-hover:scale-100"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Streak Indicator (Hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full cursor-help group transition-colors hover:bg-amber-100">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-brand-orange flex items-center justify-center shadow-inner">
              <Zap className="h-3.5 w-3.5 text-white fill-white" />
            </div>
            <span className="text-sm font-heading font-semibold text-amber-900">{navData.streak}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
                if (!isNotifOpen && notifications.length === 0) {
                  fetchNotifications();
                }
              }}
              className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              {navData.unreadNotifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-brand-orange ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white">
                  {navData.unreadNotifications > 9 ? '9+' : navData.unreadNotifications}
                </span>
              )}
            </button>
            
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-ink-100 shadow-[0_20px_40px_rgb(0,0,0,0.1)] rounded-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-ink-100 bg-ink-50/50 flex items-center justify-between">
                    <p className="font-heading font-semibold text-ink-900">Notifications</p>
                    {navData.unreadNotifications > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-xs font-bold text-brand-blue hover:text-blue-800 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {loadingNotifs ? (
                      <div className="p-8 text-center text-ink-400 font-medium text-sm">Loading...</div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center text-ink-400 font-medium text-sm">No new notifications</div>
                    ) : (
                      <div className="flex flex-col">
                        {notifications.map((notif: any) => (
                          <div 
                            key={notif.id} 
                            onClick={() => markRead(notif.id)}
                            className={`p-4 border-b border-ink-50 last:border-0 hover:bg-ink-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${!notif.isRead ? 'bg-brand-blue' : 'bg-transparent'}`} />
                              <div>
                                <p className={`text-sm ${!notif.isRead ? 'font-bold text-ink-900' : 'font-medium text-ink-700'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-xs text-ink-500 mt-1 line-clamp-2">{notif.message}</p>
                                <p className="text-[10px] text-ink-400 mt-2 uppercase font-bold tracking-wider">
                                  {new Date(notif.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              className="group flex items-center gap-2 sm:gap-3 p-1 pr-2 sm:pr-3 rounded-full border border-white/20 hover:bg-ink-50 transition-colors"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
            >
              <div className="h-8 w-8 rounded-full bg-[#006FFF] flex items-center justify-center text-white font-heading font-semibold text-sm shadow-sm overflow-hidden">
                {navData.image || user?.image ? (
                  <img src={(navData.image || user?.image) as string} alt={navData.name || user?.name || "User"} className="object-cover w-full h-full" />
                ) : (
                  (navData.name || user?.name || "S").charAt(0).toUpperCase()
                )}
              </div>
              <span className="hidden sm:block text-sm font-heading font-semibold text-white group-hover:text-ink-900 max-w-[120px] truncate transition-colors">
                {navData.name || user?.name || "Student"}
              </span>
              <ChevronDown className="h-4 w-4 text-white/80 group-hover:text-ink-900 hidden sm:block transition-colors" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white border border-ink-100 shadow-[0_20px_40px_rgb(0,0,0,0.1)] rounded-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-ink-100 bg-ink-50/50">
                    <p className="font-heading font-semibold text-ink-900 truncate">{user?.name}</p>
                    <p className="font-body text-xs text-ink-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/student/profile" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 font-body text-sm text-ink-700 hover:bg-ink-50 rounded-xl transition-colors text-left w-full">
                      My Profile
                    </Link>
                    <Link href="/student/certificates" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 font-body text-sm text-ink-700 hover:bg-ink-50 rounded-xl transition-colors text-left w-full">
                      My Certificates
                    </Link>
                    <div className="h-px bg-ink-100 my-1 mx-2" />
                    <button 
                      onClick={() => signOut({ callbackUrl: '/signin' })}
                      className="px-4 py-2 font-heading text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-ink-100 flex items-center justify-between">
                <Link href="/student/dashboard" className="flex items-center gap-3 group ml-2 mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image 
                    src="/logo-for-logins.png" 
                    alt="Digital Ghuru" 
                    width={100} 
                    height={100} 
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                  <div className="relative w-24 sm:w-32 h-6 sm:h-8 -ml-6 sm:-ml-8 overflow-hidden flex items-center justify-center pointer-events-none">
                    <Image 
                      src="/resources/student portal.png" 
                      alt="Student Portal" 
                      fill
                      className="object-contain scale-[2.5] sm:scale-[3] origin-center"
                    />
                  </div>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-ink-500 hover:text-ink-900 hover:bg-ink-50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl font-heading font-semibold transition-colors ${
                        isActive 
                          ? "bg-brand-blue/10 text-brand-blue" 
                          : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </div>
              <div className="p-4 border-t border-ink-100 bg-ink-50/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-xs font-semibold text-ink-500 uppercase tracking-[0.15em]">Your Streak</span>
                  <div className="flex items-center gap-1.5 bg-white border border-amber-100 px-2.5 py-1 rounded-full">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-brand-orange flex items-center justify-center">
                      <Zap className="h-2.5 w-2.5 text-white fill-white" />
                    </div>
                    <span className="font-heading text-xs font-semibold text-amber-900">4 Days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
