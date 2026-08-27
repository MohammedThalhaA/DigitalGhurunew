"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-shadow duration-200 p-6 md:p-8 text-center"
    >
      {/* Photo */}
      <div className="mx-auto mb-5 h-28 w-28 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 overflow-hidden flex items-center justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Users className="h-12 w-12 text-brand-blue/40" />
        )}
      </div>

      {/* Name & Role */}
      <h4 className="font-display text-xl font-bold text-ink-900 mb-1">
        {name}
      </h4>
      <p className="font-heading text-sm font-semibold text-brand-orange mb-4">
        {role}
      </p>

      {/* Credentials */}
      {credentials && credentials.length > 0 && (
        <ul className="text-left space-y-2 mb-5">
          {credentials.map((cred, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-ink-600"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
              {cred}
            </li>
          ))}
        </ul>
      )}

      {/* Bio */}
      {bio && (
        <p className="text-sm text-ink-500 leading-relaxed mb-5">{bio}</p>
      )}

      {/* Social Stats */}
      {socialStats && socialStats.length > 0 && (
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-ink-100">
          {socialStats.map((stat) => (
            <div key={stat.platform} className="text-center">
              <p className="font-display text-lg font-bold text-brand-blue">
                {stat.count}
              </p>
              <p className="text-xs text-ink-400">{stat.platform}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
