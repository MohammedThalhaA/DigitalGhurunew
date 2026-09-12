"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { User, Calendar, Bell, Mail, CreditCard, Shield, Smartphone, Save, Upload, Link as LinkIcon, Loader2, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { updateGeneralProfile, updatePassword, updateNotificationPreferences, uploadLocalImage, toggleTwoFactor, saveUpiId, removeUpiId } from "@/lib/profile-actions";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
  user: any;
  enrollments?: any[];
}

export default function ProfileClient({ user, enrollments = [] }: ProfileClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [isPending, startTransition] = useTransition();

  // General Profile State
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [bio, setBio] = useState(user?.bio || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  
  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Security State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Notification State
  const [notifCourse, setNotifCourse] = useState(user?.notification_course_announcements ?? true);
  const [notifCommunity, setNotifCommunity] = useState(user?.notification_community_mentions ?? true);
  const [notifMarketing, setNotifMarketing] = useState(user?.notification_marketing_emails ?? false);

  // Custom Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Billing State
  const [upiId, setUpiId] = useState(user?.upi_id || "");
  const [paymentMode, setPaymentMode] = useState<'default' | 'update' | 'add'>('default');
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [upiInput, setUpiInput] = useState("");

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveUpiId(upiInput);
      if (res.success) {
        setUpiId(upiInput);
        setPaymentMode('default');
        showToast("UPI ID saved successfully!", "success");
      } else {
        showToast("Failed to save UPI ID.", "error");
      }
    });
  };

  const handleRemoveUpi = () => {
    startTransition(async () => {
      const res = await removeUpiId();
      if (res.success) {
        setUpiId("");
        setShowRemoveConfirm(false);
        showToast("UPI ID removed.", "success");
      } else {
        showToast("Failed to remove UPI ID.", "error");
      }
    });
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const fullName = `${firstName} ${lastName}`.trim();
      const res = await updateGeneralProfile(fullName, bio, imageUrl);
      if (res.success) showToast("Profile updated successfully!", "success");
      else showToast("Failed to update profile.", "error");
    });
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) return showToast("New passwords do not match!", "error");
    if (!currentPass || !newPass) return showToast("Please fill all fields!", "error");
    
    startTransition(async () => {
      try {
        const res = await updatePassword(currentPass, newPass);
        if (res.success) {
          showToast("Password updated successfully!", "success");
          setCurrentPass(""); setNewPass(""); setConfirmPass("");
        } else {
          showToast(res.error || "Failed to update password.", "error");
        }
      } catch (err: any) {
        showToast(err.message || "Failed to update password.", "error");
      }
    });
  };

  const handleNotifSave = () => {
    startTransition(async () => {
      const res = await updateNotificationPreferences(notifCourse, notifCommunity, notifMarketing);
      if (res.success) showToast("Preferences saved successfully!", "success");
      else showToast("Failed to save preferences.", "error");
    });
  };

  const handle2FAToggle = () => {
    startTransition(async () => {
      const enable = !(user?.two_factor_enabled ?? false);
      const res = await toggleTwoFactor(enable);
      if (res.success) {
        showToast(`2FA is now ${enable ? 'enabled' : 'disabled'}!`, "success");
      } else {
        showToast("Failed to toggle 2FA.", "error");
      }
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) return showToast("File is larger than 5MB", "error");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadLocalImage(formData);
      if (res.success) {
        setImageUrl(res.url);
        // Automatically save the new avatar
        const fullName = `${firstName} ${lastName}`.trim();
        await updateGeneralProfile(fullName, bio, res.url);
        showToast("Avatar uploaded and saved successfully!", "success");
      } else {
        showToast("Failed to upload image.", "error");
      }
    } catch (err) {
      showToast("Failed to upload image.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlUpload = () => {
    const url = prompt("Enter the URL of your new avatar image:");
    if (url) {
      setImageUrl(url);
    }
  };

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
                  {imageUrl ? (
                    <Image src={imageUrl} alt={user?.name || "User"} fill className="object-cover" />
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-ink-900 mb-1">Avatar</h3>
                  <p className="text-sm font-medium text-ink-500 mb-4">Recommended size 400x400px. Max size of 5MB.</p>
                  <div className="flex flex-wrap gap-3">
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 disabled:opacity-70 text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Upload className="h-4 w-4" /> Upload
                    </button>
                    <button 
                      onClick={handleUrlUpload}
                      disabled={isUploading}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-ink-50 disabled:bg-ink-100 text-ink-900 text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shadow-sm border border-ink-200"
                    >
                      <LinkIcon className="h-4 w-4" /> Link URL
                    </button>
                    <button 
                      onClick={() => setImageUrl("")}
                      className="px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm uppercase tracking-[0.15em] transition-colors border border-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 p-8 relative overflow-hidden max-w-3xl">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-8 relative z-10">Personal Information</h3>
              
              <form onSubmit={handleGeneralSave} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-medium text-ink-900"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little about yourself..."
                    className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-medium text-ink-900 resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <button disabled={isPending} type="submit" className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 disabled:opacity-70 text-white font-bold text-sm transition-all shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)] transform hover:-translate-y-0.5 uppercase tracking-wider">
                    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save Changes
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
                <form onSubmit={handlePasswordSave} className="space-y-5">
                  <div className="space-y-2">
                    <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Current Password</label>
                    <input type="password" value={currentPass} onChange={(e)=>setCurrentPass(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">New Password</label>
                      <input type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-heading text-xs font-semibold text-ink-900 uppercase tracking-[0.15em] pl-1">Confirm New</label>
                      <input type="password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-4 bg-ink-50/50 border border-ink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-ink-900" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isPending} className="px-8 py-4 bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 disabled:opacity-70 text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
                      {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-[32px] border border-brand-blue/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-base font-bold text-ink-900 mb-2">Two-Factor Authentication (2FA)</h3>
                  <p className="text-ink-500 font-medium text-sm max-w-md">Add an extra layer of security to your account. We'll ask for a verification code when you log in.</p>
                </div>
                <button 
                  onClick={handle2FAToggle} 
                  disabled={isPending}
                  className={`shrink-0 px-6 py-3 text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shadow-md flex items-center gap-2 ${
                    user?.two_factor_enabled ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-blue hover:bg-blue-800'
                  }`}
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {user?.two_factor_enabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink-100">
                <h2 className="font-display text-lg font-bold text-ink-900">Notification Preferences</h2>
              </div>
              
              <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative overflow-hidden">
                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Course Announcements</h4>
                    <p className="font-body text-sm text-ink-500">Updates, new modules, and announcements from your instructors.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" checked={notifCourse} onChange={(e)=>setNotifCourse(e.target.checked)} />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>

                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Community Mentions</h4>
                    <p className="font-body text-sm text-ink-500">Get notified when someone replies to your post or mentions you.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" checked={notifCommunity} onChange={(e)=>setNotifCommunity(e.target.checked)} />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>

                <div className="p-6 sm:p-8 flex items-center justify-between hover:bg-ink-50/50 transition-colors">
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 mb-1">Marketing Emails</h4>
                    <p className="font-body text-sm text-ink-500">Receive offers, newsletters, and promotional content.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                    <input type="checkbox" className="sr-only peer" checked={notifMarketing} onChange={(e)=>setNotifMarketing(e.target.checked)} />
                    <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>
                
                <div className="p-6 sm:p-8 bg-ink-50/30 border-t border-ink-100 flex justify-start">
                  <button onClick={handleNotifSave} disabled={isPending} className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 disabled:opacity-70 text-white text-sm font-heading font-semibold tracking-[0.15em] uppercase shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 transition-all">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Preferences
                  </button>
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
                        <h4 className="font-heading font-bold text-ink-900">Current Browser</h4>
                        <span className="bg-amber-400 text-white text-xs font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">Current</span>
                      </div>
                      <p className="font-body text-sm text-ink-500">Active Session • Your IP</p>
                      <p className="text-xs font-bold text-emerald-600 mt-1">Active right now</p>
                    </div>
                  </div>
                </div>

                {/* Other Device Placeholder */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-50 grayscale">
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
                  <button disabled className="px-5 py-2.5 rounded-full bg-white text-red-400 font-bold text-sm transition-colors border border-ink-200">
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
                    <span className="bg-amber-400/80 text-amber-950 border border-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] rounded-full mb-4 inline-block shadow-sm">Active Plan</span>
                    <h3 className="text-3xl font-bold mb-1 text-white">Lifetime Access</h3>
                    <p className="text-ink-200 text-sm font-medium mb-8">You have permanent access to all enrolled courses.</p>
                    <button onClick={() => router.push('/student/browse')} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-[0.15em] rounded-full transition-colors border border-white/10 backdrop-blur-sm">
                      Browse New Courses
                    </button>
                  </div>
                </div>

                {/* Saved UPI ID Card */}
                <div className="bg-white rounded-[32px] border border-ink-100 p-8 shadow-card group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative flex flex-col overflow-hidden min-h-[300px]">
                  
                  {/* Remove Confirmation Overlay */}
                  <AnimatePresence>
                    {showRemoveConfirm && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center"
                      >
                        <h4 className="font-display font-bold text-ink-900 text-lg mb-2">Remove UPI ID?</h4>
                        <p className="text-ink-500 text-sm font-medium mb-6">Are you sure you want to remove this UPI ID? You will need to enter it again for future fast checkouts.</p>
                        <div className="flex gap-3 w-full">
                          <button onClick={() => setShowRemoveConfirm(false)} disabled={isPending} className="flex-1 py-3 bg-ink-50 hover:bg-ink-100 text-ink-900 font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors border border-ink-200 disabled:opacity-50">Cancel</button>
                          <button onClick={handleRemoveUpi} disabled={isPending} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2">
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Yes, Remove
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="font-display text-base font-bold text-ink-900 mb-6">Saved UPI ID</h3>
                  
                  <AnimatePresence mode="wait">
                    {paymentMode === 'default' && upiId && (
                      <motion.div key="default" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col flex-1">
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-ink-200 bg-ink-50/50 mb-auto">
                          <div className="w-14 h-10 bg-brand-blue rounded-md flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold italic text-xs">UPI</span>
                          </div>
                          <div>
                            <p className="font-bold text-ink-900 leading-tight">{upiId}</p>
                            <p className="text-xs font-medium text-ink-500">Fast checkout enabled</p>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <button onClick={() => { setUpiInput(upiId); setPaymentMode('update'); }} className="flex-1 py-3 bg-ink-900 hover:bg-brand-blue text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors shadow-sm">
                            Update
                          </button>
                          <button onClick={() => setShowRemoveConfirm(true)} className="flex-1 py-3 bg-ink-50 hover:bg-ink-100 text-red-500 font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors border border-red-100">
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {paymentMode === 'default' && !upiId && (
                      <motion.div key="no-upi" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col flex-1 items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-ink-50 flex items-center justify-center text-ink-300 mb-4">
                          <Smartphone className="h-6 w-6" />
                        </div>
                        <p className="text-ink-500 font-medium mb-6">No UPI ID saved for fast checkout.</p>
                        <button onClick={() => { setUpiInput(""); setPaymentMode('add'); }} className="w-full py-3 bg-gradient-to-r from-amber-400 to-brand-orange hover:from-amber-500 hover:to-orange-600 text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                          Add UPI ID
                        </button>
                      </motion.div>
                    )}

                    {(paymentMode === 'update' || paymentMode === 'add') && (
                      <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1">
                        <form onSubmit={handleSaveUpi} className="flex flex-col flex-1">
                          <div className="space-y-4 mb-auto">
                            <p className="text-sm text-ink-500 font-medium mb-2">Enter your UPI ID to use Razorpay 1-click checkout in the future.</p>
                            <input 
                              type="text" 
                              required
                              value={upiInput}
                              onChange={(e) => setUpiInput(e.target.value)}
                              placeholder="e.g. name@okhdfcbank" 
                              className="w-full px-4 py-3 bg-ink-50/50 border border-ink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-sm" 
                            />
                          </div>
                          <div className="mt-6 flex gap-3">
                            <button type="button" onClick={() => setPaymentMode('default')} disabled={isPending} className="flex-1 py-3 bg-ink-50 hover:bg-ink-100 text-ink-600 font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors border border-ink-100 disabled:opacity-50">
                              Cancel
                            </button>
                            <button type="submit" disabled={isPending} className="flex-1 py-3 bg-ink-900 hover:bg-brand-blue text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2">
                              {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save UPI ID
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                    {enrollments.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-ink-500 font-medium">No billing history found.</td>
                      </tr>
                    ) : (
                      enrollments.map((enr, i) => (
                        <tr key={i} className="border-b border-ink-50 hover:bg-ink-50/30 transition-colors">
                          <td className="py-4 px-6 text-sm font-medium text-ink-600">
                            {new Date(enr.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                          </td>
                          <td className="py-4 px-6 text-sm font-bold text-ink-900">{enr.title}</td>
                          <td className="py-4 px-6 text-sm font-bold text-ink-900">₹{parseFloat(enr.pricePaid).toLocaleString()}</td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-brand-blue hover:text-blue-800 text-sm font-bold transition-colors">Download</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Custom Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
                : 'bg-red-50 border-red-100 text-red-900'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-heading font-semibold text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
