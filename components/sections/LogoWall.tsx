"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoItem {
  name: string;
  logoUrl: string;
  href?: string;
}

interface LogoWallProps {
  title?: string;
  eyebrow?: string;
  logos: LogoItem[];
}

const getLogoSvg = (name: string) => {
  switch (name.toLowerCase()) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#0064E0">
          <path d="M23.1 11.23c-.7-.88-1.78-1.5-2.98-1.77-1.2-.26-2.5-.1-3.66.45-.63.3-1.22.7-1.74 1.2-.22.2-.42.45-.6.7-.18-.25-.38-.5-.6-.7-.52-.5-1.1-.9-1.74-1.2-1.16-.55-2.45-.7-3.66-.45-1.2.27-2.28.89-2.98 1.77C4.4 12.1 4 13.34 4 14.6s.4 2.5 1.12 3.37c.7.88 1.78 1.5 2.98 1.77.34.07.68.1 1.02.1.88 0 1.74-.22 2.5-.6.63-.3 1.22-.7 1.74-1.2.22-.2.42-.45.6-.7.18.25.38.5.6.7.52.5 1.1.9 1.74 1.2.77.38 1.62.6 2.5.6.34 0 .68-.03 1.02-.1 1.2-.27 2.28-.89 2.98-1.77.72-.88 1.12-2.12 1.12-3.37s-.4-2.5-1.12-3.37zM8.32 17.77c-.77-.17-1.42-.55-1.85-1.1-.42-.52-.64-1.25-.64-2.07s.22-1.55.64-2.07c.43-.55 1.08-.93 1.85-1.1.76-.17 1.56-.07 2.27.28.43.2.82.5 1.16.85.25.26.47.56.66.88-.19.32-.4.62-.66.88-.34.35-.73.65-1.16.85-.7.35-1.5.45-2.27.28zm10.63-1.1c-.43.55-1.08.93-1.85 1.1-.76.17-1.56.07-2.27-.28-.43-.2-.82-.5-1.16-.85-.25-.26-.47-.56-.66-.88.19-.32.4-.62.66-.88.34-.35.73-.65 1.16-.85.7-.35 1.5-.45 2.27-.28.77.17 1.42.55 1.85 1.1.42.52.64 1.25.64 2.07s-.22 1.55-.64 2.07z"/>
        </svg>
      );
    case "hubspot":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#FF7A59">
          <path d="M21.4 10.4c-.6 0-1.2.2-1.6.6l-2.6-1.5c.1-.4.2-.8.2-1.2 0-2.2-1.8-4-4-4s-4 1.8-4 4c0 .4.1.8.2 1.2L7 11c-.5-.4-1.1-.6-1.8-.6-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.4-.1-.8-.2-1.2l2.6-1.5c.5.4 1.1.6 1.8.6.6 0 1.2-.2 1.6-.6l2.6 1.5c-.1.4-.2.8-.2 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.4-.1-.8-.2-1.2l2.6-1.5c.5.4 1.1.6 1.8.6 1.7 0 3-1.3 3-3s-1.3-3-3-3zM5.2 15.4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8.2-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm5.4 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm2.6-1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>
      );
    case "zoho":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <g transform="scale(0.6) translate(6, 6)">
            <rect x="0" y="0" width="12" height="12" rx="2" fill="#E21C26" />
            <rect x="14" y="0" width="12" height="12" rx="6" fill="#3D9B35" />
            <rect x="0" y="14" width="12" height="12" rx="2" fill="#F8B019" />
            <rect x="14" y="14" width="12" height="12" rx="6" fill="#1C75BC" />
          </g>
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#96BF48">
          <path d="M18.8 6.4l-1.6-4.4c-.1-.3-.4-.5-.7-.5h-9c-.3 0-.6.2-.7.5L5.2 6.4c-.1.3-.1.6 0 .9l6.3 14c.2.4.6.7 1 .7s.8-.3 1-.7l6.3-14c.1-.3.1-.6 0-.9zm-6.8 12.8L7.1 8.5h9.8l-4.9 10.7z"/>
        </svg>
      );
    case "freshworks":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <g transform="scale(0.65) translate(4, 4)">
            <path fill="#0052FF" d="M10 0L2 8v16l8-8V0z" />
            <path fill="#00A3FF" d="M18 4l-8 8v16l8-8V4z" />
            <path fill="#00C2FF" d="M26 8l-8 8v16l8-8V8z" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default function LogoWall({
  title,
  eyebrow,
  logos,
}: LogoWallProps) {
  // Triplicate the logo array to achieve a seamless, continuous marquee looping effect
  const triplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="w-full">
        {/* Header */}
        {(eyebrow || title) && (
          <div className="section-container text-center mb-12">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="heading-lg">{title}</h2>}
          </div>
        )}

        {/* Marquee Wrapper Container */}
        <div className="relative w-full overflow-hidden flex items-center py-5 bg-ink-50/20 border-y border-ink-100/50">
          {/* Side blur/fade gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Moving Ticker */}
          <motion.div
            className="flex gap-20 shrink-0 min-w-full items-center justify-around"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {triplicatedLogos.map((logo, idx) => {
              const svgLogo = getLogoSvg(logo.name);

              return (
                <div
                  key={`${logo.name}-${idx}`}
                  className="shrink-0 flex items-center justify-center group mx-2"
                >
                  <div className="flex items-center gap-3.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 select-none">
                    <div className="h-7 w-7 flex items-center justify-center shrink-0">
                      {svgLogo}
                    </div>
                    <span className="font-display text-base md:text-lg font-bold text-ink-900 tracking-wide">
                      {logo.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

