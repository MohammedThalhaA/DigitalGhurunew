"use client";

import React, { useState, useEffect } from "react";
import { Mail, Globe, CreditCard, Save, RefreshCw, User, Upload, Share2, Facebook, Instagram, Linkedin, Twitter, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SettingsData {
  platform_name: string;
  support_email: string;
  smtp_host: string;
  smtp_port: string;
  smtp_user: string;
  smtp_password: string;
  razorpay_key_id: string;
  razorpay_key_secret: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
}

interface ProfileData {
  name: string;
  image: string;
}

export default function SettingsForm() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [settingsRes, profileRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/admin/profile")
      ]);
      
      if (settingsRes.ok) {
        const json = await settingsRes.json();
        setData({
          platform_name: json.platform_name || "",
          support_email: json.support_email || "",
          smtp_host: json.smtp_host || "",
          smtp_port: json.smtp_port || "",
          smtp_user: json.smtp_user || "",
          smtp_password: json.smtp_password || "",
          razorpay_key_id: json.razorpay_key_id || "",
          razorpay_key_secret: json.razorpay_key_secret || "",
          facebook_url: json.facebook_url ?? "https://www.facebook.com/digitalghuru",
          instagram_url: json.instagram_url ?? "https://www.instagram.com/digitalghuru",
          linkedin_url: json.linkedin_url ?? "https://linkedin.com/company/digitalghuru",
          twitter_url: json.twitter_url ?? "https://x.com/digital_ghuru?s=20",
        });
      }

      if (profileRes.ok) {
        const profileJson = await profileRes.json();
        setProfile({
          name: profileJson.name || "",
          image: profileJson.image || "",
        });
      }
    } catch (err) {
      console.error("Failed to load settings or profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "profile_name" || e.target.name === "profile_image") {
      setProfile(prev => ({ 
        ...(prev || { name: "", image: "" }), 
        [e.target.name.replace("profile_", "")]: e.target.value 
      }));
    } else {
      setData(prev => ({
        ...(prev || {} as SettingsData),
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      
      if (res.ok && json.url) {
        setProfile((prev) => ({ ...(prev || { name: "", image: "" }), image: json.url }));
      } else {
        setMessage({ type: "error", text: "Failed to upload image." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading image." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const settingsRes = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let profileRes = null;
      if (profile) {
        profileRes = await fetch("/api/admin/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });
      }
      
      if (settingsRes.ok && (!profile || profileRes?.ok)) {
        setMessage({ type: "success", text: "Settings and profile saved successfully!" });
        router.refresh();
        setTimeout(() => setMessage(null), 4000);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Error saving settings. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="h-8 w-8 text-brand-blue animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {message && (
        <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-10">
        {/* Admin Profile */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 mb-6 border-b border-ink-100 pb-3">
            <User className="h-5 w-5 text-brand-blue" />
            Admin Profile
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Display Name</label>
              <input 
                type="text" 
                name="profile_name"
                value={profile?.name || ""}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Profile Picture URL (or Upload)</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="text" 
                  name="profile_image"
                  value={profile?.image || ""}
                  onChange={handleChange}
                  className="flex-1 bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                  placeholder="https://example.com/avatar.jpg"
                />
                <label className="relative cursor-pointer bg-gradient-to-r from-[#FFB800] to-[#FF5C00] text-white shadow-md hover:shadow-lg hover:brightness-110 px-4 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shrink-0">
                  {uploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span>Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              {profile?.image && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-16 w-16 relative rounded-full overflow-hidden border border-ink-200">
                    <Image src={profile.image} alt="Profile" fill className="object-cover" />
                  </div>
                  <span className="text-base text-ink-500">Current avatar preview</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* General Settings */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 mb-6 border-b border-ink-100 pb-3">
            <Globe className="h-5 w-5 text-brand-blue" />
            General Platform Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Platform Name</label>
              <input 
                type="text" 
                name="platform_name"
                value={data.platform_name}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="e.g. Digital Ghuru"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Support Email</label>
              <input 
                type="email" 
                name="support_email"
                value={data.support_email}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="e.g. support@example.com"
              />
            </div>
          </div>
        </section>

        {/* Payment Gateway Settings */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 mb-6 border-b border-ink-100 pb-3">
            <CreditCard className="h-5 w-5 text-brand-blue" />
            Razorpay Integration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Key ID</label>
              <input 
                type="text" 
                name="razorpay_key_id"
                value={data.razorpay_key_id}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="rzp_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Key Secret</label>
              <input 
                type="password" 
                name="razorpay_key_secret"
                value={data.razorpay_key_secret}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="Secret Key"
              />
            </div>
          </div>
        </section>

        {/* Email SMTP Settings */}
        <section className="xl:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 mb-6 border-b border-ink-100 pb-3">
            <Mail className="h-5 w-5 text-brand-blue" />
            Email Configuration (SMTP)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">SMTP Host</label>
              <input 
                type="text" 
                name="smtp_host"
                value={data.smtp_host}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="e.g. smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">SMTP Port</label>
              <input 
                type="text" 
                name="smtp_port"
                value={data.smtp_port}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="e.g. 587"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">SMTP Username</label>
              <input 
                type="text" 
                name="smtp_user"
                value={data.smtp_user}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="Email address or username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">SMTP Password</label>
              <input 
                type="password" 
                name="smtp_password"
                value={data.smtp_password}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="App password or standard password"
              />
            </div>
          </div>
        </section>

        {/* Social Media Profiles */}
        <section className="xl:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 mb-2 border-b border-ink-100 pb-3">
            <Share2 className="h-5 w-5 text-brand-blue" />
            Social Media Profiles
          </h2>
          <p className="text-sm text-ink-500 mb-6">
            Configure official social media channels linked across the website (footer, schema metadata, and contact points).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-ink-700 flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                  Facebook Page URL
                </label>
                {data.facebook_url && (
                  <a 
                    href={data.facebook_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-medium"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <input 
                type="text" 
                name="facebook_url"
                value={data.facebook_url}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="https://www.facebook.com/digitalghuru"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-ink-700 flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-[#E4405F]" />
                  Instagram Profile URL
                </label>
                {data.instagram_url && (
                  <a 
                    href={data.instagram_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-medium"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <input 
                type="text" 
                name="instagram_url"
                value={data.instagram_url}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="https://www.instagram.com/digitalghuru"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-ink-700 flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                  LinkedIn Page URL
                </label>
                {data.linkedin_url && (
                  <a 
                    href={data.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-medium"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <input 
                type="text" 
                name="linkedin_url"
                value={data.linkedin_url}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="https://linkedin.com/company/digitalghuru"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-ink-700 flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-ink-900" />
                  X / Twitter Profile URL
                </label>
                {data.twitter_url && (
                  <a 
                    href={data.twitter_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-medium"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <input 
                type="text" 
                name="twitter_url"
                value={data.twitter_url}
                onChange={handleChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                placeholder="https://x.com/digital_ghuru?s=20"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="pt-6 border-t border-ink-100 flex justify-end">
        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Settings
            </>
          )}
        </Button>
      </div>

    </form>
  );
}
