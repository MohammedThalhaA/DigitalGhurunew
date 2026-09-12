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
  const [navData, setNavData] = useState({ streak: 0, unreadNotifications: 0 });

  const user = session?.user;

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/student/navbar-data")
        .then(res => res.json())
        .then(data => setNavData(data))
        .catch(() => {});
    }
  }, [session?.user?.id, pathname]);

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
          
          <Link href="/student/dashboard" className="flex items-center gap-3 group shrink-0 h-full py-2 lg:-ml-2 xl:-ml-4">
            <Image 
              src="/resources/student portal navbar logo.png" 
              alt="Digital Ghuru Student Portal" 
              width={400} 
              height={100} 
              className="h-14 sm:h-16 md:h-20 w-auto object-contain scale-125 md:scale-[1.35] origin-left hover:scale-[1.3] md:hover:scale-[1.4] transition-transform"
              priority
            />
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

          <Link href="/student/notifications" className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors relative">
            <Bell className="h-5 w-5" />
            {navData.unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-brand-orange ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white">
                {navData.unreadNotifications > 9 ? '9+' : navData.unreadNotifications}
              </span>
            )}
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              className="group flex items-center gap-2 sm:gap-3 p-1 pr-2 sm:pr-3 rounded-full border border-white/20 hover:bg-ink-50 transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-[#006FFF] flex items-center justify-center text-white font-heading font-semibold text-sm shadow-sm overflow-hidden">
                {user?.image ? (
                  <Image src={user.image} alt={user.name || "User"} width={32} height={32} className="object-cover" />
                ) : (
                  (user?.name || "S").charAt(0).toUpperCase()
                )}
              </div>
              <span className="hidden sm:block text-sm font-heading font-semibold text-white group-hover:text-ink-900 max-w-[120px] truncate transition-colors">
                {user?.name || "Student"}
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
                  className="absolute right-0 top-full mt-2 w-64 bg-white border border-ink-100 shadow-[0_20px_40px_rgb(0,0,0,0.1)] rounded-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-ink-100 bg-ink-50/50">
                    <p className="font-heading font-semibold text-ink-900 truncate">{user?.name}</p>
                    <p className="font-body text-xs text-ink-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/student/profile" className="px-4 py-2 font-body text-sm text-ink-700 hover:bg-ink-50 rounded-xl transition-colors text-left w-full">
                      My Profile
                    </Link>
                    <Link href="/student/certificates" className="px-4 py-2 font-body text-sm text-ink-700 hover:bg-ink-50 rounded-xl transition-colors text-left w-full">
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
                    src="/resources/student portal navbar logo.png" 
                    alt="Digital Ghuru Student Portal" 
                    width={250} 
                    height={70} 
                    className="h-10 sm:h-12 w-auto object-contain scale-125 origin-left"
                  />
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
