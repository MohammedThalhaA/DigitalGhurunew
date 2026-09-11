"use client";

import React, { useState } from "react";
import { User, Calendar, Bell, Mail, CreditCard, Shield, Smartphone, Save } from "lucide-react";
import Image from "next/image";

interface ProfileClientProps {
  user: any;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="bg-white rounded-3xl border border-ink-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Vertical Tabs */}
      <div className="w-full md:w-64 bg-ink-50/50 border-r border-ink-100 shrink-0 p-4 flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full text-left transition-all ${
            activeTab === "general" 
              ? "bg-white shadow-sm border border-ink-100 text-brand-blue" 
              : "text-ink-600 hover:bg-white hover:text-ink-900 border border-transparent"
          }`}
        >
          <User className={`h-4 w-4 ${activeTab === "general" ? "" : "text-ink-400"}`} />
          General Profile
        </button>
        
        <button 
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full text-left transition-all ${
            activeTab === "security" 
              ? "bg-white shadow-sm border border-ink-100 text-brand-blue" 
              : "text-ink-600 hover:bg-white hover:text-ink-900 border border-transparent"
          }`}
        >
          <Shield className={`h-4 w-4 ${activeTab === "security" ? "" : "text-ink-400"}`} />
          Security
        </button>
        
        <button 
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full text-left transition-all ${
            activeTab === "notifications" 
              ? "bg-white shadow-sm border border-ink-100 text-brand-blue" 
              : "text-ink-600 hover:bg-white hover:text-ink-900 border border-transparent"
          }`}
        >
          <Bell className={`h-4 w-4 ${activeTab === "notifications" ? "" : "text-ink-400"}`} />
          Notifications
        </button>
        
        <button 
          onClick={() => setActiveTab("devices")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full text-left transition-all ${
            activeTab === "devices" 
              ? "bg-white shadow-sm border border-ink-100 text-brand-blue" 
              : "text-ink-600 hover:bg-white hover:text-ink-900 border border-transparent"
          }`}
        >
          <Smartphone className={`h-4 w-4 ${activeTab === "devices" ? "" : "text-ink-400"}`} />
          Connected Devices
        </button>
        
        <button 
          onClick={() => setActiveTab("billing")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full text-left transition-all ${
            activeTab === "billing" 
              ? "bg-white shadow-sm border border-ink-100 text-brand-blue" 
              : "text-ink-600 hover:bg-white hover:text-ink-900 border border-transparent"
          }`}
        >
          <CreditCard className={`h-4 w-4 ${activeTab === "billing" ? "" : "text-ink-400"}`} />
          Billing & Invoices
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-8">
        
        {activeTab === "general" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-2xl">
              <h2 className="font-display text-lg font-bold text-ink-900 mb-6 pb-4 border-b border-ink-100">Public Information</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-ink-100 to-ink-200 flex items-center justify-center text-ink-400 relative overflow-hidden shadow-inner shrink-0">
                  {user?.image ? (
                    <Image src={user.image} alt={user?.name || "User"} fill className="object-cover" />
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-ink-900 mb-1">Avatar</h3>
                  <p className="text-sm font-medium text-ink-500 mb-4">Recommended size 400x400px. Max size of 5MB.</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-2.5 bg-ink-900 hover:bg-brand-blue text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shadow-md">
                      Upload New
                    </button>
                    <button className="px-6 py-2.5 rounded-full bg-ink-50 hover:bg-ink-100 text-ink-600 font-bold text-sm uppercase tracking-[0.15em] transition-colors border border-ink-100">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative p-8 relative overflow-hidden max-w-3xl">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-8 relative z-10">Personal Information</h3>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Student"
                      className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-medium text-ink-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="User"
                      className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-medium text-ink-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Email Address</label>
                  <div className="flex gap-4">
                    <input 
                      type="email" 
                      defaultValue={user?.email || "student@example.com"}
                      disabled
                      className="w-full px-5 py-4 bg-ink-50 border border-ink-100 rounded-2xl text-ink-400 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Bio</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us a little about yourself..."
                    className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-medium text-ink-900 resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <button type="button" className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 text-white font-bold text-sm transition-all shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)] transform hover:-translate-y-0.5 uppercase tracking-wider">
                    <Save className="h-5 w-5" /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-3xl">
              <h2 className="font-display text-lg font-bold text-ink-900 mb-6 pb-4 border-b border-ink-100">Security Settings</h2>
              
              <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative p-8 mb-8">
                <h3 className="font-display text-base font-bold text-ink-900 mb-6">Change Password</h3>
                <form className="space-y-5">
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Confirm New</label>
                      <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button type="button" className="px-6 py-3 bg-ink-900 hover:bg-brand-blue text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shadow-md">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-[32px] border border-brand-blue/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-base font-bold text-ink-900 mb-2">Two-Factor Authentication (2FA)</h3>
                  <p className="text-ink-500 font-medium text-sm max-w-md">Add an extra layer of security to your account. We'll ask for a verification code when you log in.</p>
                </div>
                <button type="button" className="shrink-0 px-6 py-3 bg-brand-blue hover:bg-blue-800 text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shadow-md">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-3xl">
              <h2 className="font-display text-lg font-bold text-ink-900 mb-6 pb-4 border-b border-ink-100">Notification Preferences</h2>
              
              <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative overflow-hidden">
                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Course Announcements</h4>
                    <p className="font-body text-sm text-ink-500">Updates, new modules, and announcements from your instructors.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>

                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Community Mentions</h4>
                    <p className="font-body text-sm text-ink-500">Get notified when someone replies to your post or mentions you.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>

                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Marketing Emails</h4>
                    <p className="font-body text-sm text-ink-500">Receive offers, newsletters, and promotional content.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connected Devices Tab */}
        {activeTab === "devices" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-3xl">
              <h2 className="font-display text-lg font-bold text-ink-900 mb-6 pb-4 border-b border-ink-100">Connected Devices</h2>
              <p className="text-ink-500 font-medium mb-6">These devices are currently signed in to your account. Revoke access for any devices you don't recognize.</p>
              
              <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative overflow-hidden">
                
                {/* Current Device */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-100 bg-amber-50/30">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-heading font-bold text-ink-900">MacBook Pro</h4>
                        <span className="bg-amber-400 text-white text-xs font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">Current</span>
                      </div>
                      <p className="font-body text-sm text-ink-500">Chrome on macOS • IP: 192.168.1.1</p>
                      <p className="text-xs font-bold text-emerald-600 mt-1">Active right now</p>
                    </div>
                  </div>
                </div>

                {/* Other Device */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-ink-50 flex items-center justify-center text-ink-400 shrink-0">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-ink-900 mb-1">iPhone 13</h4>
                      <p className="font-body text-sm text-ink-500">Safari on iOS • IP: 10.0.0.45</p>
                      <p className="text-xs font-medium text-ink-400 mt-1">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-full bg-white hover:bg-red-50 text-red-600 font-bold text-sm transition-colors border border-ink-200 hover:border-red-200">
                    Revoke
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-4xl">
              <h2 className="font-display text-lg font-bold text-ink-900 mb-6 pb-4 border-b border-ink-100">Billing & Invoices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Active Plan Card */}
                <div className="bg-gradient-to-br from-ink-900 to-ink-950 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative z-10">
                    <span className="bg-amber-400/20 text-amber-400 border border-amber-400/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] rounded-full mb-4 inline-block">Active Plan</span>
                    <h3 className="text-3xl font-bold mb-1">Lifetime Access</h3>
                    <p className="text-ink-300 text-sm font-medium mb-8">You have permanent access to all enrolled courses.</p>
                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-[0.15em] rounded-full transition-colors border border-white/10 backdrop-blur-sm">
                      Browse New Courses
                    </button>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="bg-white rounded-[32px] border border-ink-100 p-8 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative flex flex-col">
                  <h3 className="font-display text-base font-bold text-ink-900 mb-6">Payment Method</h3>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-ink-200 bg-ink-50/50 mb-auto">
                    <div className="w-14 h-10 bg-brand-blue rounded-md flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold italic text-xs">VISA</span>
                    </div>
                    <div>
                      <p className="font-bold text-ink-900 leading-tight">Visa ending in 4242</p>
                      <p className="text-xs font-medium text-ink-500">Expires 12/26</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-3 bg-ink-900 hover:bg-brand-blue text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors">
                      Update
                    </button>
                    <button className="flex-1 py-3 bg-ink-50 hover:bg-ink-100 text-ink-600 font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors border border-ink-100">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <h3 className="text-lg font-bold text-ink-900 mb-4">Billing History</h3>
              <div className="bg-white rounded-3xl border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-ink-100 bg-ink-50/50">
                      <th className="py-4 px-6 font-heading text-xs font-semibold text-ink-500 uppercase tracking-[0.15em]">Date</th>
                      <th className="py-4 px-6 font-heading text-xs font-semibold text-ink-500 uppercase tracking-[0.15em]">Description</th>
                      <th className="py-4 px-6 font-heading text-xs font-semibold text-ink-500 uppercase tracking-[0.15em]">Amount</th>
                      <th className="py-4 px-6 text-xs font-bold text-ink-500 uppercase tracking-[0.15em] text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ink-50 hover:bg-ink-50/30 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-ink-600">Sep 01, 2026</td>
                      <td className="py-4 px-6 text-sm font-bold text-ink-900">AI Marketing Blueprint</td>
                      <td className="py-4 px-6 text-sm font-bold text-ink-900">₹4,999</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-brand-blue hover:text-blue-800 text-sm font-bold transition-colors">Download</button>
                      </td>
                    </tr>
                    <tr className="border-b border-ink-50 hover:bg-ink-50/30 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-ink-600">Aug 15, 2026</td>
                      <td className="py-4 px-6 text-sm font-bold text-ink-900">Digital Marketing Mastery</td>
                      <td className="py-4 px-6 text-sm font-bold text-ink-900">₹9,999</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-brand-blue hover:text-blue-800 text-sm font-bold transition-colors">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
