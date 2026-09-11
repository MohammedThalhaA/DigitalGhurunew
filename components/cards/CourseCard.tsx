"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface CourseCardProps {
  format?: string;
  duration?: string;
  title: string;
  blurb: string;
  image?: string;
  cardImage?: string;
  thumbnail?: string;
  originalPrice?: string;
  discountedPrice?: string;
  ctaText?: string;
  ctaHref?: string;
  onViewDetails?: (href: string) => void;
  onDownloadBrochure?: (title: string) => void;
}

export default function CourseCard({
  format,
  duration,
  title,
  blurb,
  image,
  cardImage,
  thumbnail,
  originalPrice,
  discountedPrice,
  ctaText = "View Details",
  ctaHref = "/contact",
  onViewDetails,
  onDownloadBrochure,
}: CourseCardProps) {
  const router = useRouter();
  const displayImage = cardImage || thumbnail || image;

  const formatPrice = (price?: string) => {
    if (!price || price === "—" || price.toLowerCase() === "contact us") return price;
    const numericValue = price.replace(/[₹,]/g, '').trim();
    if (isNaN(Number(numericValue)) || numericValue === "") return price;
    return `₹${Number(numericValue).toLocaleString('en-IN')}`;
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(ctaHref);
    } else {
      router.push(ctaHref);
    }
  };

  const handleDownloadBrochure = () => {
    if (onDownloadBrochure) {
      onDownloadBrochure(title);
    } else {
      // Trigger brochure download fallback
      const link = document.createElement("a");
      link.href = "/digitalghuru-brochure.txt";
      link.download = `${title.replace(/\s+/g, "_")}_Brochure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex flex-col bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full"
    >
      {/* ─── 1. Course Card Image / Placeholder Slot (16:9) ─── */}
      <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden border-b border-ink-100">
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          /* High-Tech Branded Image Placeholder */
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-brand-dark to-blue-950 flex flex-col items-center justify-center p-4 text-center select-none">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                backgroundSize: "16px 16px"
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shadow-lg group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white group-hover:border-white/40 transition-all duration-300 mb-2">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xs text-white/95 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
                Course Card Image Slot
              </span>
              <span className="text-[11px] text-white/60 font-medium mt-0.5">
                16:9 • Replace in Admin Portal
              </span>
            </div>
          </div>
        )}

        {/* Floating Badges over image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          {format && (
            <span className="text-[11px] font-heading font-bold text-white bg-brand-blue/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase border border-white/20">
              {format}
            </span>
          )}
          {duration && (
            <span className="text-[11px] font-heading font-semibold text-white/95 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/15">
              {duration}
            </span>
          )}
        </div>
      </div>

      {/* ─── 2. Content ─── */}
      <div className="flex flex-col flex-1 px-6 py-5">
        <h3 className="font-display text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {blurb}
        </p>

        {/* Price Row */}
        {(originalPrice || discountedPrice) && (
          <div className="flex items-center gap-3 mb-5 mt-2">
            {originalPrice && originalPrice !== "—" && (
              <span className="text-lg font-semibold text-ink-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discountedPrice && (
              <span className="text-3xl font-display font-bold text-brand-orange">
                {formatPrice(discountedPrice)}
              </span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-2.5 mt-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={handleViewDetails}
            className="w-full"
          >
            {ctaText}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadBrochure}
            className="w-full flex items-center justify-center gap-2 border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5"
          >
            <FileText className="h-4 w-4" />
            Download Brochure
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
