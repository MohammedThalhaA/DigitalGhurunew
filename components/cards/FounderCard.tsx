"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Award, ExternalLink } from "lucide-react";

interface SocialStat {
  platform: string;
  count: string;
}

interface FounderCardProps {
  name: string;
  role: string;
  photoUrl?: string;
  bio?: string;
  credentials?: string[];
  socialStats?: SocialStat[];
}

export default function FounderCard({
  name,
  role,
  photoUrl,
  bio,
  credentials,
  socialStats,
}: FounderCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,111,255,0.2)] border-2 border-brand-blue/5 hover:border-brand-blue/20 transition-all duration-500 flex flex-col h-full"
    >
      {/* Structural Bold Header using Brand Colors */}
      <div className="relative h-36 bg-gradient-to-br from-brand-blue to-[#004bb3] overflow-hidden">
        {/* Abstract subtle brand geometry in the background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-[0.03] rounded-bl-[150px] transform group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-orange opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* Overlapping Isometric Avatar */}
      <div className="relative -mt-20 mx-auto w-40 h-40 z-10 shrink-0">
        <div className="absolute inset-0 bg-brand-orange rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20" />
        <div className="relative w-full h-full rounded-[1.8rem] bg-white p-2 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
          <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-brand-blue/5 flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <Users className="w-12 h-12 text-brand-blue/30" />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 flex-1 flex flex-col px-8 pb-10 pt-6 text-center bg-white">
        
        {/* Name */}
        <h4 className="font-display text-3xl font-black text-brand-blue mb-3 group-hover:text-brand-orange transition-colors duration-300">
          {name}
        </h4>
        
        {/* Role Pill */}
        <div className="mb-6">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-brand-orange to-[#ff7b33] text-white font-heading text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-orange/30 group-hover:shadow-brand-orange/50 transition-shadow">
            {role}
          </span>
        </div>

        {/* Brand Gold Divider */}
        <div className="w-16 h-1.5 bg-brand-gold mx-auto rounded-full mb-6 group-hover:w-24 transition-all duration-500" />

        {/* Bio */}
        {bio && (
          <p className="text-base text-brand-blue/80 font-medium leading-relaxed mb-8">
            {bio}
          </p>
        )}

        {/* Credentials */}
        {credentials && credentials.length > 0 && (
          <ul className="text-left space-y-4 mb-8 flex-1 bg-brand-blue/5 rounded-2xl p-6 border border-brand-blue/10">
            {credentials.map((cred, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 text-sm text-brand-blue group/item"
              >
                <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center group-hover/item:bg-brand-blue transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-brand-blue group-hover/item:bg-white transition-colors duration-300" />
                </div>
                <span className="leading-relaxed font-bold">{cred}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Social Stats */}
        {socialStats && socialStats.length > 0 && (
          <div className="flex items-center justify-center gap-8 pt-6 mt-auto border-t-2 border-brand-blue/10">
            {socialStats.map((stat) => (
              <div key={stat.platform} className="text-center group/stat">
                <p className="font-display text-2xl font-black text-brand-blue group-hover/stat:-translate-y-1 transition-transform duration-300">
                  {stat.count}
                </p>
                <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mt-1">
                  {stat.platform}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
